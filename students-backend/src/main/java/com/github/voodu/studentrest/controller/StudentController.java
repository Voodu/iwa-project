package com.github.voodu.studentrest.controller;

import com.github.voodu.studentrest.model.Course;
import com.github.voodu.studentrest.model.Student;
import com.github.voodu.studentrest.repository.CourseRepository;
import com.github.voodu.studentrest.repository.StudentRepository;
import com.github.voodu.studentrest.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/public/students")
public class StudentController {
    private StudentRepository studentRepository;
    private CourseRepository courseRepository;

    @Autowired
    public StudentController(StudentRepository studentRepository, CourseRepository courseRepository)
    {
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Student> findAllStudents()
    {
        return studentRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    public Student findStudent(@PathVariable long id)
    {
//        return studentRepository.getOne(id);
        return new Student();
    }

    @RequestMapping(method = RequestMethod.POST)
    public void addStudent(@RequestBody Student student)
    {
        Course course = courseRepository.findAll().get(0);
        Set<Course> courses = new HashSet<>();
        courses.add(course);
        student.setCourses(courses);



        return;
//        Student student = new Student();
//        student.setName(addStudentRequest.getName());
//        student.setSurname(addStudentRequest.getSurname());
//        student.setFaculty(addStudentRequest.getFaculty());
//        student.setCourses(addStudentRequest.getCourses());
//        return studentRepository.save(student);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public void putStudent(@RequestBody Student student)
    {
//        Student student = new Student();
//        student.setId(putStudentRequest.getId());
//        student.setName(putStudentRequest.getName());
//        student.setSurname(putStudentRequest.getSurname());
//        student.setFaculty(putStudentRequest.getFaculty());
//        student.setCourses(putStudentRequest.getCourses());
//        return studentRepository.save(student);
    }

    @RequestMapping(value="/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Student> deleteStudent (@PathVariable("id") long id) {

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
