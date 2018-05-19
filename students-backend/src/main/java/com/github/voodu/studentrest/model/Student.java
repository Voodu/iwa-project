package com.github.voodu.studentrest.model;

import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.*;
import javax.persistence.*;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Student {
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String surname;
    private String faculty;
    @OneToMany(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Course> courses = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    @Override
    public String toString() {
        return super.toString();
    }
}
