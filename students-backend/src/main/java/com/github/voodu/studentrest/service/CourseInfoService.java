package com.github.voodu.studentrest.service;

import com.github.voodu.studentrest.model.CourseInfo;
import com.github.voodu.studentrest.repository.CourseInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class CourseInfoService {

    private CourseInfoRepository courseInfoRepository;

    @Autowired
    public CourseInfoService(CourseInfoRepository courseInfoRepository) {
        this.courseInfoRepository = courseInfoRepository;
    }

    public List<CourseInfo> findAll() {
        return courseInfoRepository.findAll();
    }

    public Boolean deleteById(Long id) {
        if (exists(id)) {
            courseInfoRepository.deleteById(id);
            return true;
        }

        return false;
    }

    public CourseInfo update(CourseInfo student) {
        if (exists(student)) {
            return courseInfoRepository.save(student);
        }

        return null;
    }

    public CourseInfo save(CourseInfo student) {
        return courseInfoRepository.save(student);
    }

    public CourseInfo getOne(Long id) {
        CourseInfo found = null;
        if (exists(id)) {
            found = courseInfoRepository.getOne(id);
        }

        return found;
    }

    private Boolean exists(CourseInfo student)
    {
        return  student != null
                && student.id != null
                && courseInfoRepository.existsById(student.id);
    }

    private Boolean exists(Long id)
    {
        return id != null && courseInfoRepository.existsById(id);
    }
}