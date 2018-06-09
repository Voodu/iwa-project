package com.github.voodu.studentrest.service;

import com.github.voodu.studentrest.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public class StudentService {

    @Autowired
    StudentRepository studentRepository;
}