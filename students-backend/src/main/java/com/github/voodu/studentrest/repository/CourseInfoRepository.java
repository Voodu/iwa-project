package com.github.voodu.studentrest.repository;

import com.github.voodu.studentrest.model.CourseInfo;
import com.github.voodu.studentrest.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface CourseInfoRepository extends JpaRepository<CourseInfo, Long> {

}