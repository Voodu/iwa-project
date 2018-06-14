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
    public Long id;

    public String name;
    public String surname;
    public String faculty;
    @OneToMany(
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    public List<Course> courses = new ArrayList<>();
}
