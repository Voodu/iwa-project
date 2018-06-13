package com.github.voodu.studentrest.controller;

import com.github.voodu.studentrest.model.Student;
import com.github.voodu.studentrest.service.StudentService;
import com.github.voodu.studentrest.repository.CourseRepository;
import com.github.voodu.studentrest.repository.StudentRepository;
import com.github.voodu.studentrest.service.AppUserService;
import com.github.voodu.studentrest.service.CourseService;
import com.github.voodu.studentrest.utility.Lambda0;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.function.Function;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/public/students")
public class StudentController {

    private AppUserService appUserService;
    private StudentService studentService;

    @Autowired
    public StudentController(AppUserService appUserService, StudentService studentService) {
        this.appUserService = appUserService;
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> findAllStudents(HttpServletRequest request, HttpServletResponse response) {
        return whenAuthorized(2, request, response, () -> studentService.findAll());
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Student> findStudent(@PathVariable long id, HttpServletRequest request, HttpServletResponse response) {
        return whenAuthorized(2, request, response, () -> {
            Student found = studentService.getOne(id);
            if (found != null) {
                return new ResponseEntity<>(found, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        });
    }

    @PostMapping
    public Student addStudent(@RequestBody Student student, HttpServletRequest request, HttpServletResponse response) {
        return whenAuthorized(1, request, response, () -> {
            student.setId(null);
            return studentService.save(student);
        });
    }

    @PutMapping
    public ResponseEntity<Student> putStudent(@RequestBody Student student, HttpServletRequest request, HttpServletResponse response) {
        return whenAuthorized(0, request, response, () -> { // todo not sure what will happen now... returning null as responseEntity...
            Student saved = studentService.update(student);
            if (saved != null) {
                return new ResponseEntity<>(saved, HttpStatus.OK);
            }

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        });
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Student> deleteStudent(@PathVariable("id") long id, HttpServletRequest request, HttpServletResponse response) {
        return whenAuthorized(0, request, response, () -> {
            if (studentService.deleteById(id)) {
                return new ResponseEntity<>(HttpStatus.OK);
            }

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        });
    }

    private boolean validateAccess(HttpServletRequest request, int requiredAccess) {
        return appUserService.validateAccess(request.getHeader("Token"), requiredAccess);
    }

    private <T> T whenAuthorized(int requiredAccess, HttpServletRequest request, HttpServletResponse response, Lambda0<T> lambda) {
        if (!validateAccess(request, requiredAccess)) {
            response.setStatus(401);
            return null;
        } else {
            return lambda.action();
        }
    }
}
