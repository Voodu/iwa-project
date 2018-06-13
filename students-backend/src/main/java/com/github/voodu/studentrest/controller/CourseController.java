package com.github.voodu.studentrest.controller;

import com.github.voodu.studentrest.model.Course;
import com.github.voodu.studentrest.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/public/courses")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @GetMapping
    public List<Course> findAllCourses() {
        return courseService.findAll();
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Course> findCourse(@PathVariable long id) {
        Course found =  courseService.getOne(id);
        if (found != null)
        {
            return new ResponseEntity<>(found, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public Course addCourse(@RequestBody Course course) {
        course.setId(null);
        return courseService.save(course);
    }

    @PutMapping
    public ResponseEntity<Course> putCourse(@RequestBody Course course) {
        Course saved = courseService.update(course);
        if (saved != null)
        {
            return new ResponseEntity<>(saved, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Course> deleteCourse(@PathVariable("id") long id) {
        if (courseService.deleteById(id)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
