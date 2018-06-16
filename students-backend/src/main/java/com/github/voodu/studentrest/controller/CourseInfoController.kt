package com.github.voodu.studentrest.controller

import com.github.voodu.studentrest.model.CourseInfo
import com.github.voodu.studentrest.service.AppUserService
import com.github.voodu.studentrest.service.CourseInfoService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.RequestEntity
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletRequest

@RestController
@CrossOrigin(origins = arrayOf("*"), maxAge = 3600)
@RequestMapping("/public/courses")

class CourseInfoController @Autowired constructor(appUserService: AppUserService, private val courseInfoService: CourseInfoService): AuthorizedController(appUserService) {

    @GetMapping //public
    fun findAllCoursesInfo(request: HttpServletRequest) = whenAuthorized(3, request) {
        ResponseEntity.ok(courseInfoService.findAll())
    }

    @GetMapping(value = ["/{id}"]) //public
    fun findCourseInfo(@PathVariable id: Long, request: HttpServletRequest) = whenAuthorized(3, request){
        val found = courseInfoService.getOne(id)
        if (found != null) {
            ResponseEntity.ok(found)
        } else {
            ResponseEntity(HttpStatus.NOT_FOUND)
        }
    }

    @PostMapping //only admin
    fun addCourseInfo(@RequestBody courseInfo: CourseInfo, request: HttpServletRequest) = whenAuthorized(0, request) {
        ResponseEntity.ok(courseInfoService.save(courseInfo))
    }

    @PutMapping //only admin
    fun putCourseInfo(@RequestBody courseInfo: CourseInfo, request: HttpServletRequest) = whenAuthorized(0, request) {
        val saved = courseInfoService.update(courseInfo)
        if (saved != null) {
            ResponseEntity.ok(saved)
        } else {
            ResponseEntity(HttpStatus.NOT_FOUND)
        }

    }

    @DeleteMapping(value = ["/{id}"]) //only admin
    fun deleteCourseInfo(@PathVariable("id") id: Long, request: HttpServletRequest) = whenAuthorized(0, request) {
        val deleted = courseInfoService.deleteById(id)
        if (deleted != null) {
            ResponseEntity.ok(deleted)
        } else {
            ResponseEntity(HttpStatus.NOT_FOUND)
        }
    }


}
