package com.github.voodu.studentrest.controller

import com.github.voodu.studentrest.model.*
import com.github.voodu.studentrest.service.CourseInfoService
import com.github.voodu.studentrest.service.StudentService
import com.github.voodu.studentrest.service.AppUserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

import javax.servlet.http.HttpServletRequest

@RestController
@CrossOrigin(origins = arrayOf("*"), maxAge = 3600)
@RequestMapping("/public/students")
class StudentController @Autowired
constructor(appUserService: AppUserService, private val studentService: StudentService, private val courseInfoService: CourseInfoService): AuthorizedController(appUserService) {

    @GetMapping
    fun findAllStudents(request: HttpServletRequest) = whenAuthorized(1, request) {
        ResponseEntity(studentService.findAll(), HttpStatus.OK)
    }.let { response ->
        if(response.statusCode == HttpStatus.OK) {
            response
        } else {
            val found = studentService.findAll().map(::SimpleStudent)
            ResponseEntity(found, HttpStatus.OK)
        }

    }

    @GetMapping(value = ["/{id}"])
    fun findStudent(@PathVariable id: Long, request: HttpServletRequest) = whenAuthorized(1, request) {
            val found = studentService.getOne(id) ?: return@whenAuthorized ResponseEntity<Student>(HttpStatus.NOT_FOUND)
            ResponseEntity(found, HttpStatus.OK)
    }

    @GetMapping(value = ["/me"])
    fun findMe(request: HttpServletRequest) = whenAuthorized<Student>(2, request) {
        val myUsername = appUserService.getMyUsername(request.getHeader("Token"))
                ?: return@whenAuthorized ResponseEntity(HttpStatus.UNAUTHORIZED) //TODO throw WTF there
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

}
