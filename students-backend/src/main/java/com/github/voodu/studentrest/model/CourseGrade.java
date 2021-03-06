package com.github.voodu.studentrest.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class CourseGrade {
    @Id
    @GeneratedValue
    public long id;

    public double grade;
    public double weight;

    public double getGrade() { return grade; }
    public void setGrade(double value) { this.grade = value; }

    public double getWeight() { return weight; }
    public void setWeight(double value) { this.weight = value; }

    public long getId() { return id; }
    public void setId(long id) { this.id = id; }
}

