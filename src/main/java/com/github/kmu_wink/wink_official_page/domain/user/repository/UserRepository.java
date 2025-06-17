package com.github.kmu_wink.wink_official_page.domain.user.repository;

import com.github.kmu_wink.wink_official_page.domain.user.schema.User;
import org.bson.Document;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    List<String> roleOrderList = Arrays.stream(User.Role.values()).map(Enum::name).toList();

    default List<User> findAllWithMask(MongoTemplate mongoTemplate) {

        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.match(Criteria.where("role").ne("ADMIN")),
                Aggregation.addFields()
                        .addField("roleOrder")
                        .withValue(new Document("$indexOfArray", Arrays.asList(roleOrderList, "$role")))
                        .build(),
                Aggregation.sort(Sort.by(Sort.Order.desc("roleOrder"), Sort.Order.asc("name"))),
                Aggregation.project().andExclude("fee", "roleOrder")
        );

        return mongoTemplate.aggregate(aggregation, User.class, User.class).getMappedResults();
    }

    default Page<User> findAllSearch(String query, Pageable pageable, MongoTemplate mongoTemplate) {

        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.match(Criteria.where("role").ne("ADMIN")),
                Aggregation.match(new Criteria().orOperator(
                        Criteria.where("name").regex(query, "i"),
                        Criteria.where("studentId").regex(query, "i"),
                        Criteria.where("email").regex(query, "i"),
                        Criteria.where("phoneNumber").regex(query, "i")
                )),
                Aggregation.addFields()
                        .addField("roleOrder")
                        .withValue(new Document("$indexOfArray", Arrays.asList(roleOrderList, "$role")))
                        .build(),
                Aggregation.sort(Sort.by(Sort.Order.desc("roleOrder"), Sort.Order.asc("name"))),
                Aggregation.project().andExclude("roleOrder"),
                Aggregation.skip(pageable.getOffset()),
                Aggregation.limit(pageable.getPageSize())
        );

        AggregationResults<User> results = mongoTemplate.aggregate(aggregation, User.class, User.class);

        long total = mongoTemplate.count(
                Query.query(new Criteria().orOperator(
                        Criteria.where("name").regex(query, "i"),
                        Criteria.where("studentId").regex(query, "i"),
                        Criteria.where("email").regex(query, "i"),
                        Criteria.where("phoneNumber").regex(query, "i")
                )), User.class
        );

        return new PageImpl<>(results.getMappedResults(), pageable, total);
    }

    Optional<User> findByStudentId(String studentId);
    Optional<User> findByEmail(String email);
    Optional<User> findByPhoneNumber(String phoneNumber);
}
