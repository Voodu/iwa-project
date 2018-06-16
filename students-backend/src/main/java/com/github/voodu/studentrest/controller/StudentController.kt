package com.github.voodu.studentrest.controller

import com.github.voodu.studentrest.model.Course
import com.github.voodu.studentrest.model.CourseGrade
import com.github.voodu.studentrest.model.CourseInfo
import com.github.voodu.studentrest.model.Student
import com.github.voodu.studentrest.service.CourseInfoService
import com.github.voodu.studentrest.service.StudentService
import com.github.voodu.studentrest.repository.CourseRepository
import com.github.voodu.studentrest.repository.StudentRepository
import com.github.voodu.studentrest.service.AppUserService
import com.github.voodu.studentrest.service.CourseService
import com.github.voodu.studentrest.utility.Lambda0
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import java.util.ArrayList
import java.util.HashSet
import java.util.function.Function

@RestController
@CrossOrigin(origins = arrayOf("*"), maxAge = 3600)
@RequestMapping("/public/students")
class StudentController @Autowired
constructor(private val appUserService: AppUserService, private val studentService: StudentService, private val courseInfoService: CourseInfoService) {

    @GetMapping
    fun findAllStudents(request: HttpServletRequest) = whenAuthorized(1, request) {
        ResponseEntity(studentService.findAll(), HttpStatus.OK)
    }

    @GetMapping(value = ["/{id}"])
    fun findStudent(@PathVariable id: Long, request: HttpServletRequest) = whenAuthorized(1, request) {
            val found = studentService.getOne(id) ?: return@whenAuthorized ResponseEntity<Student>(HttpStatus.NOT_FOUND)
            ResponseEntity(found, HttpStatus.OK)
    }

    @GetMapping(value = ["/me"])
    fun findMe(request: HttpServletRequest) = whenAuthorized<Student>(2, request) {
        val myUsername = appUserService.getMyUsername(request.getHeader("Token"))
                ?: return@whenAuthorized ResponseEntity(HttpStatus.UNAUTHORIZED)
        val myIndexNumber: Long
        try {
            myIndexNumber = java.lang.Long.parseLong(myUsername)
        } catch (e: NumberFormatException) {
            return@whenAuthorized ResponseEntity(HttpStatus.NOT_FOUND)
        }
        return@whenAuthorized studentService.getOne(myIndexNumber)?.let { me ->
            ResponseEntity(me, HttpStatus.OK)
        } ?: ResponseEntity(HttpStatus.NOT_FOUND)

    }


    @PostMapping
    fun addStudent(@RequestBody student: Student, request: HttpServletRequest) = whenAuthorized(0, request) {
        ResponseEntity(studentService.save(student), HttpStatus.OK)
    }

    @PutMapping
    fun putStudent(@RequestBody student: Student, request: HttpServletRequest) = whenAuthorized(0, request) {
        val saved = studentService.update(student)
        if (saved != null) {
            ResponseEntity(saved, HttpStatus.OK)
        } else {
            ResponseEntity(HttpStatus.NOT_FOUND)
        }
    }

    @DeleteMapping(value = ["/{id}"])
    fun deleteStudent(@PathVariable("id") id: Long, request: HttpServletRequest) = whenAuthorized(0, request) {
        if (studentService.deleteById(id)) {
            ResponseEntity(Student(), HttpStatus.OK)
        } else {
            ResponseEntity(HttpStatus.NOT_FOUND)
        }
    }

    private fun validateAccess(request: HttpServletRequest, requiredAccess: Int): Boolean {
        return appUserService.validateAccess(request.getHeader("Token"), requiredAccess)
    }

    private fun <T> whenAuthorized(requiredAccess: Int, request: HttpServletRequest, response: HttpServletResponse, lambda: () -> T): T? {
        return if (!validateAccess(request, requiredAccess)) {
            response.status = 401
            null
        } else {
            lambda()
        }
    }

    private fun <T> whenAuthorized(requiredAccess: Int, request: HttpServletRequest, lambda: () -> ResponseEntity<T>): ResponseEntity<T> {
        return if (validateAccess(request, requiredAccess)) {
            lambda()
        } else {
            ResponseEntity(HttpStatus.UNAUTHORIZED)
        }
    }
}
