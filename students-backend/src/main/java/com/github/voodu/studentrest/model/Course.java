package com.github.voodu.studentrest.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Course {
    @Id
    @GeneratedValue
    private long id;

    private String name;
    @OneToMany(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<CourseGrade> courseGrades = new ArrayList<>();
    private double grade;
    private long weight;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<CourseGrade> getCourseGrades() {
        return courseGrades;
    }

    public void setCourseGrades(List<CourseGrade> courseGrades) {
        this.courseGrades = courseGrades;
    }

    public double getGrade() {
        return grade;
    }

    public void setGrade(double grade) {
        this.grade = grade;
    }

    public long getWeight() {
        return weight;
    }

    public void setWeight(long weight) {
        this.weight = weight;
    }
}

