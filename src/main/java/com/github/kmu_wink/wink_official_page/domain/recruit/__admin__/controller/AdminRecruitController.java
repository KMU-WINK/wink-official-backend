package com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.controller;

import com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.dto.request.CreateRecruitRequest;
import com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.dto.response.GetRecruitsResponse;
import com.github.kmu_wink.wink_official_page.domain.recruit.__admin__.service.AdminRecruitService;
import com.github.kmu_wink.wink_official_page.domain.recruit.dto.response.GetRecruitResponse;
import com.github.kmu_wink.wink_official_page.global.response.ApiResponse;
import com.github.kmu_wink.wink_official_page.global.security.guard.IsAdmin;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "[Recruit] Admin")
@IsAdmin
@RestController
@RequestMapping("/admin/recruit")
@RequiredArgsConstructor
public class AdminRecruitController {

    private final AdminRecruitService adminRecruitService;

    @GetMapping
    @Operation(summary = "모집 목록")
    public ApiResponse<GetRecruitsResponse> getRecruits() {

        return ApiResponse.ok(adminRecruitService.getRecruits());
    }

    @GetMapping("/{recruitId}")
    @Operation(summary = "모집 조회")
    public ApiResponse<GetRecruitResponse> getRecruit(@PathVariable String recruitId) {

        return ApiResponse.ok(adminRecruitService.getRecruit(recruitId));
    }

    @PostMapping
    @Operation(summary = "모집 생성")
    public ApiResponse<GetRecruitResponse> createRecruit(@RequestBody @Valid CreateRecruitRequest request) {

        return ApiResponse.ok(adminRecruitService.createRecruit(request));
    }

    @DeleteMapping("/{recruitId}")
    @Operation(summary = "모집 삭제")
    public ApiResponse<Void> deleteRecruit(@PathVariable String recruitId) {

        adminRecruitService.deleteRecruit(recruitId);

        return ApiResponse.ok();
    }
}
