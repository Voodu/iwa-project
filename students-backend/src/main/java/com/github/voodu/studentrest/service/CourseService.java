package com.github.voodu.studentrest.service;

import com.github.voodu.studentrest.model.Course;
import com.github.voodu.studentrest.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class CourseService {
    @Autowired
    CourseRepository courseRepository;

    public List<Course> findAll() {
        return courseRepository.findAll();
    }


    public Boolean deleteById(Long id) {
        if (exists(id)) {
            courseRepository.deleteById(id);
            return true;
        }

        return false;
    }

    public Course update(Course course) {
        if (exists(course)) {
            return courseRepository.save(course);
        }

        return null;
    }

    public Course save(Course course) {
        return courseRepository.save(course);
    }

    public Course getOne(Long id) {
        Course found = null;
        if (exists(id)) {
            found = courseRepository.getOne(id);
        }

        return found;
    }

    private Boolean exists(Course course)
    {
        return  course != null
                && course.id != null
                && courseRepository.existsById(course.id);
    }

    private Boolean exists(Long id)
    {
        return id != null && courseRepository.existsById(id);
    }
}