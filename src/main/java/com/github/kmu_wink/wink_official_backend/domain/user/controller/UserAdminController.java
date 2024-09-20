package com.github.kmu_wink.wink_official_backend.domain.user.controller;

import com.github.kmu_wink.wink_official_backend.common.api.dto.response.ApiResponse;
import com.github.kmu_wink.wink_official_backend.domain.user.dto.request.AdminChangeInfoRequest;
import com.github.kmu_wink.wink_official_backend.domain.user.dto.response.UserListResponse;
import com.github.kmu_wink.wink_official_backend.domain.user.service.UserAdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class UserAdminController {

    private final UserAdminService userAdminService;

    @GetMapping("/waiting")
    public ApiResponse<UserListResponse> getWaitingUserList() {

        return ApiResponse.ok(userAdminService.getWaitingUserList());
    }

    @PostMapping("/waiting/approve/{userId}")
    public ApiResponse<Void> approveWaitingUser(@PathVariable String userId) {

        userAdminService.approveUser(userId);

        return ApiResponse.ok();
    }

    @PutMapping("/waiting/reject/{userId}")
    public ApiResponse<Void> rejectWaitingUser(@PathVariable String userId) {

        userAdminService.rejectUser(userId);

        return ApiResponse.ok();
    }

    @PutMapping("/info/{userId}")
    public ApiResponse<Void> changeInfo(@PathVariable String userId, @RequestBody AdminChangeInfoRequest request) {

        userAdminService.changeInfo(userId, request);

        return ApiResponse.ok();
    }

    @DeleteMapping("/avatar/{userId}")
    public ApiResponse<Void> deleteAvatar(@PathVariable String userId) {

        userAdminService.deleteUserAvatar(userId);

        return ApiResponse.ok();
    }

    @DeleteMapping("/{userId}")
    public ApiResponse<Void> deleteUser(@PathVariable String userId) {

        userAdminService.deleteUser(userId);

        return ApiResponse.ok();
    }
}

