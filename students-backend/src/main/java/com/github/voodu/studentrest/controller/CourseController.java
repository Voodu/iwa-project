package com.github.voodu.studentrest.controller;

import com.github.voodu.studentrest.model.Course;
import com.github.voodu.studentrest.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/public/courses")
public class CourseController {
    private CourseRepository courseRepository;

    @Autowired
    public CourseController(CourseRepository courseRepository)
    {
        this.courseRepository = courseRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Course> findAllCourses()
    {
        return courseRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    public Course findCourse(@PathVariable long id)
    {
//        return courseRepository.getOne(id);
        return new Course();
    }

    @RequestMapping(method = RequestMethod.POST)
    public void addCourse(@RequestBody Course course)
    {
//        Course course = new Course();
//        course.setName(course.getName());
//        course.setSurname(course.getSurname());
//        course.setFaculty(addCourse();
//        course.setId(putCourseRequest.getId());
//        course.setName(putCourseRequest.getName());
//        course.setSurname(putCourseRequest.getSurname());
//        course.setFaculty(putCourseRequest.getFaculty());
//        course.setCourses(putCourseRequest.getCourses());
//        return courseRepository.save(course);
    }

    @RequestMapping(value="/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Course> deleteCourse (@PathVariable("id") long id) {

        try
        {
            courseRepository.deleteById(id);
        }
        catch (Exception ex)
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
