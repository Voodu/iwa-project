package com.github.voodu.studentrest.repository;

import com.github.voodu.studentrest.model.Login;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

@Transactional
public interface LoginRepository extends JpaRepository<Login, String> {

    Login findByUsername(String username);

}
