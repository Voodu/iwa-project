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
    public Long id;

    @ManyToOne
    @JoinColumn(name = "courseinfo_id", nullable = false)
    public CourseInfo courseInfo;

    public Course(){}

    @OneToMany(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    public List<CourseGrade> courseGrades = new ArrayList<>();
    public double grade;
}

