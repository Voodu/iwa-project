package com.github.voodu.studentrest.controller;

import com.github.voodu.studentrest.model.Student;
import com.github.voodu.studentrest.service.StudentService;
import com.github.voodu.studentrest.repository.CourseRepository;
import com.github.voodu.studentrest.repository.StudentRepository;
import com.github.voodu.studentrest.service.AppUserService;
import com.github.voodu.studentrest.service.CourseService;
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
    private StudentRepository studentRepository;
    private CourseRepository courseRepository;
    private AppUserService appUserService;

    @Autowired
    private StudentService studentService;
    public StudentController(StudentRepository studentRepository, CourseRepository courseRepository, AppUserService appUserService)
    {
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
        this.appUserService = appUserService;
    }

    @GetMapping
    public List<Student> findAllStudents() {
        return studentService.findAll();
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Student> findStudent(@PathVariable long id) {
        Student found =  studentService.getOne(id);
        if (found != null)
        {
            return new ResponseEntity<>(found, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        student.setId(null);
        return studentService.save(student);
    }

    @PutMapping
    public ResponseEntity<Student> putStudent(@RequestBody Student student) {
        Student saved = studentService.update(student);
        if (saved != null)
        {
            return new ResponseEntity<>(saved, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Student> deleteStudent(@PathVariable("id") long id) {
        if (studentService.deleteById(id)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    private boolean validateAccess(HttpServletRequest request, int requiredAccess) {
        return appUserService.validateAccess(request.getHeader("Token"), requiredAccess);
    }

    private <T> T whenAuthorized(int requiredAccess, HttpServletRequest request, HttpServletResponse response, Function<Void, T> block) {
        if (!validateAccess(request, requiredAccess)) {
            response.setStatus(401);
            return null;
        } else {
            return block.apply(null);
        }
    }
}
