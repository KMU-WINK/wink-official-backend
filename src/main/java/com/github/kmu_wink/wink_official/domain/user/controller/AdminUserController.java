package com.github.kmu_wink.wink_official.domain.user.controller;

import com.github.kmu_wink.wink_official.common.api.dto.response.ApiResponse;
import com.github.kmu_wink.wink_official.domain.user.dto.request.InviteRequest;
import com.github.kmu_wink.wink_official.domain.user.dto.request.RemovePreUserRequest;
import com.github.kmu_wink.wink_official.domain.user.dto.request.UpdateRequest;
import com.github.kmu_wink.wink_official.domain.user.dto.response.AdminPreUsersResponse;
import com.github.kmu_wink.wink_official.domain.user.dto.response.AdminUsersResponse;
import com.github.kmu_wink.wink_official.domain.user.service.AdminUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/user")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@Tag(name = "[Admin] User")
public class AdminUserController {

    private final AdminUserService adminUserService;

    @GetMapping
    @Operation(summary = "유저 목록")
    public ApiResponse<AdminUsersResponse> getUsers(
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "") String query) {

        return ApiResponse.ok(adminUserService.getUsers(page, query));
    }

    @GetMapping("/pre-user")
    @Operation(summary = "임시 유저 목록")
    public ApiResponse<AdminPreUsersResponse> getPreUsers(
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "") String query) {

        return ApiResponse.ok(adminUserService.getPreUsers(page, query));
    }

    @PostMapping
    @Operation(summary = "유저 초대")
    public ApiResponse<Void> invite(@RequestBody @Valid InviteRequest request) {

        adminUserService.invite(request);

        return ApiResponse.ok();
    }

    @DeleteMapping("/pre-user")
    @Operation(summary = "임시 유저 삭제")
    public ApiResponse<Void> removePreUser(@RequestBody @Valid RemovePreUserRequest request) {

        adminUserService.removePreUser(request);

        return ApiResponse.ok();
    }

    @PutMapping
    @Operation(summary = "유저 수정")
    public ApiResponse<Void> update(@RequestBody @Valid UpdateRequest request) {

        adminUserService.update(request);

        return ApiResponse.ok();
    }
}