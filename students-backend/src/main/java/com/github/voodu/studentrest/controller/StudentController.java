package com.github.voodu.studentrest.controller;

import com.github.voodu.studentrest.model.Student;
import com.github.voodu.studentrest.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/public/students")
public class StudentController {
    @Autowired
    private StudentService studentService;

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
}
