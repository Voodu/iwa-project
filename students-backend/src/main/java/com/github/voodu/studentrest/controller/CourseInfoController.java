package com.github.voodu.studentrest.controller;

import com.github.voodu.studentrest.model.CourseInfo;
import com.github.voodu.studentrest.service.CourseInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/public/courses")
public class CourseInfoController {
    @Autowired
    private CourseInfoService courseInfoService;

    @GetMapping //public
    public List<CourseInfo> findAllCourseInfos() {
        return courseInfoService.findAll();
    }

    @GetMapping(value = "/{id}") //public
    public ResponseEntity<CourseInfo> findCourseInfo(@PathVariable long id) {
        CourseInfo found =  courseInfoService.getOne(id);
        if (found != null)
        {
            return new ResponseEntity<>(found, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping //only admin
    public CourseInfo addCourseInfo(@RequestBody CourseInfo courseInfo) {
        courseInfo.id = null;
        return courseInfoService.save(courseInfo);
    }

    @PutMapping //only admin
    public ResponseEntity<CourseInfo> putCourseInfo(@RequestBody CourseInfo courseInfo) {
        CourseInfo saved = courseInfoService.update(courseInfo);
        if (saved != null)
        {
            return new ResponseEntity<>(saved, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping(value = "/{id}") //only admin
    public ResponseEntity<CourseInfo> deleteCourseInfo(@PathVariable("id") long id) {
        if (courseInfoService.deleteById(id)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
