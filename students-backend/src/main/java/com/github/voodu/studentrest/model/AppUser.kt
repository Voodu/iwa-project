package com.github.voodu.studentrest.model

import com.fasterxml.jackson.annotation.JsonIgnoreProperties

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
@JsonIgnoreProperties("hibernateLazyInitializer", "handler")
class AppUser {
    @Id
    @GeneratedValue
    var id: Long = 0

    var username: String = ""
    var password: String = ""
    var accessLevel: Int = 3
}
