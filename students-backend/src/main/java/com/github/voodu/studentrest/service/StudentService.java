package com.github.voodu.studentrest.service;

import com.github.voodu.studentrest.model.Student;
import com.github.voodu.studentrest.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class StudentService {
    @Autowired
    StudentRepository studentRepository;

    public List<Student> findAll() {
        return studentRepository.findAll();
    }


    public Boolean deleteById(Long id) {
        if (exists(id)) {
            studentRepository.deleteById(id);
            return true;
        }

        return false;
    }

    public Student update(Student student) {
        if (exists(student)) {
            return studentRepository.save(student);
        }

        return null;
    }

    public Student save(Student student) {
        return studentRepository.save(student);
    }

    public Student getOne(Long id) {
        Student found = null;
        if (exists(id)) {
            found = studentRepository.getOne(id);
        }

        return found;
    }

    private Boolean exists(Student student)
    {
        return  student != null
                && student.id != null
                && studentRepository.existsById(student.id);
    }

    private Boolean exists(Long id)
    {
        return id != null && studentRepository.existsById(id);
    }

    public Student getByUsername(String name) {
        return studentRepository.findByName(name);
    }
}