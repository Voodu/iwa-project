package com.github.voodu.studentrest.model

class SimpleStudent(val id: Long, val name: String, val surname: String, val faculty: String) {
    constructor(student: Student) : this(
            id = student.id,
            name = student.name,
            surname = student.surname,
            faculty = student.faculty
    )
}