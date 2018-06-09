package com.github.voodu.studentrest.model

import java.util.*
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
class Token(
        val username: String = "",
        @Id
        val token: String = "",
        val accessLevel: Int = 3, // todo delete this field and create LoginResult class which has it. LoginResult should be sealed class which can contain info about login failure
        val expireDate: Date = Date()
)