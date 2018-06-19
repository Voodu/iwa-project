package com.github.voodu.studentrest.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.*;
import java.util.Set;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class CourseInfo {
    @Id
    @GeneratedValue
    public Long id;
    public String name;
    public Double ECTS;

    @JsonIgnore
    @OneToMany(mappedBy = "courseInfo")
    public Set<Course> courses;
}
