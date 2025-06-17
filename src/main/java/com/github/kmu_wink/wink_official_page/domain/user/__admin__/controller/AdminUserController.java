package com.github.kmu_wink.wink_official_page.domain.user.__admin__.controller;

import com.github.kmu_wink.wink_official_page.domain.user.__admin__.dto.request.InviteRequest;
import com.github.kmu_wink.wink_official_page.domain.user.__admin__.dto.request.UpdateRequest;
import com.github.kmu_wink.wink_official_page.domain.user.__admin__.dto.response.AdminPreUserResponse;
import com.github.kmu_wink.wink_official_page.domain.user.__admin__.dto.response.AdminPreUsersResponse;
import com.github.kmu_wink.wink_official_page.domain.user.__admin__.dto.response.AdminUsersResponse;
import com.github.kmu_wink.wink_official_page.domain.user.__admin__.service.AdminUserService;
import com.github.kmu_wink.wink_official_page.domain.user.dto.response.UserResponse;
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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "[User] Admin")
@IsAdmin
@RestController
@RequestMapping("/admin/user")
@RequiredArgsConstructor
public class AdminUserController {

    private final AdminUserService adminUserService;

    @GetMapping
    @Operation(summary = "유저 목록")
    public ApiResponse<AdminUsersResponse> getUsers(
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "") String query
    ) {

        return ApiResponse.ok(adminUserService.getUsers(page, query));
    }

    @GetMapping("/pre-user")
    @Operation(summary = "임시 유저 목록")
    public ApiResponse<AdminPreUsersResponse> getPreUsers(
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "") String query
    ) {

        return ApiResponse.ok(adminUserService.getPreUsers(page, query));
    }

    @PostMapping
    @Operation(summary = "유저 초대")
    public ApiResponse<AdminPreUserResponse> invite(@RequestBody @Valid InviteRequest request) {

        return ApiResponse.ok(adminUserService.invite(request));
    }

    @DeleteMapping("/pre-user/{id}")
    @Operation(summary = "임시 유저 삭제")
    public ApiResponse<Void> removePreUser(@PathVariable String id) {

        adminUserService.removePreUser(id);

        return ApiResponse.ok();
    }

    @PutMapping("/{id}")
    @Operation(summary = "유저 수정")
    public ApiResponse<UserResponse> update(@PathVariable String id, @RequestBody @Valid UpdateRequest request) {

        return ApiResponse.ok(adminUserService.update(id, request));
    }
}