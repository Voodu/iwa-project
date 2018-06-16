package com.github.voodu.studentrest.controller

import com.github.voodu.studentrest.service.AppUserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import javax.servlet.http.HttpServletRequest

open class AuthorizedController(protected val appUserService: AppUserService) {

    private fun validateAccess(request: HttpServletRequest, requiredAccess: Int): Boolean {
        return appUserService.validateAccess(request.getHeader("Token"), requiredAccess)
    }

    protected fun <T> whenAuthorized(requiredAccess: Int, request: HttpServletRequest, lambda: () -> ResponseEntity<T>): ResponseEntity<T> {
        return if (validateAccess(request, requiredAccess)) {
            lambda()
        } else {
            ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
    }
}