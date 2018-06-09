package com.github.voodu.studentrest.repository;

import com.github.voodu.studentrest.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

@Transactional
public interface AppUserRepository extends JpaRepository<AppUser, String> {

    AppUser findByUsername(String username);

}
