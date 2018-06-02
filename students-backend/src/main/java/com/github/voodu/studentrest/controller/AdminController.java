package com.github.voodu.studentrest.controller;

import com.github.voodu.studentrest.model.Student;
import com.github.voodu.studentrest.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/private/admin")
public class AdminController {
    private StudentRepository studentRepository;

    @Autowired
    public AdminController(StudentRepository studentRepository)
    {
        this.studentRepository = studentRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public String findAllStudents()
    {
        return "Admin controller!";
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    public Student findStudent(@PathVariable long id)
    {
        return studentRepository.getOne(id);
    }
}
