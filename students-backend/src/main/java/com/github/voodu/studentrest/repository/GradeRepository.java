package com.github.voodu.studentrest.repository;

import com.github.voodu.studentrest.model.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin(origins = "*", maxAge = 3600)
public interface GradeRepository extends JpaRepository<Grade, Long> {
}