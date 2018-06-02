package com.github.voodu.studentrest.controller;

import com.github.voodu.studentrest.model.Student;
import com.github.voodu.studentrest.model.request.AddStudentRequest;
import com.github.voodu.studentrest.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/public/students")
public class StudentController {
    private StudentRepository studentRepository;

    @Autowired
    public StudentController(StudentRepository studentRepository)
    {
        this.studentRepository = studentRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Student> findAllStudents()
    {
        return studentRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    public Student findStudent(@PathVariable long id)
    {
        return studentRepository.getOne(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public Student addStudent(@RequestBody AddStudentRequest addStudentRequest)
    {
        Student student = new Student();
        student.setName(addStudentRequest.getName());
        student.setSurname(addStudentRequest.getSurname());
        student.setFaculty(addStudentRequest.getFaculty());
        student.setCourses(addStudentRequest.getCourses());
        return studentRepository.save(student);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public Student putStudent(@RequestBody AddStudentRequest putStudentRequest)
    {
        Student student = new Student();
        student.setId(putStudentRequest.getId());
        student.setName(putStudentRequest.getName());
        student.setSurname(putStudentRequest.getSurname());
        student.setFaculty(putStudentRequest.getFaculty());
        student.setCourses(putStudentRequest.getCourses());
        return studentRepository.save(student);
    }

    @RequestMapping(value="/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Student> deleteContact (@PathVariable("id") long id) {

        try
        {
            studentRepository.deleteById(id);
        }
        catch (Exception ex)
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
