package com.github.voodu.studentrest.repository;

import com.github.voodu.studentrest.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

@Transactional
public interface TokenRepository extends JpaRepository<Token, String> {
    Token findByToken(String token);
}
