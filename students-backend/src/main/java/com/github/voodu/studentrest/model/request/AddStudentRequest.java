package com.github.voodu.studentrest.model.request;

import com.github.voodu.studentrest.model.Course;

import java.util.ArrayList;
import java.util.List;

public class AddStudentRequest {
    private Long id;
    private String name;
    private String surname;
    private String faculty;
    private List<Course> courses = new ArrayList<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getFaculty() {
        return faculty;
    }

    public void setFaculty(String faculty) {
        this.faculty = faculty;
    }

    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
