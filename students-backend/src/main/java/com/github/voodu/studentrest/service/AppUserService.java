package com.github.voodu.studentrest.service;

import com.github.voodu.studentrest.model.AppUser;
import com.github.voodu.studentrest.model.Login;
import com.github.voodu.studentrest.model.Token;
import com.github.voodu.studentrest.repository.AppUserRepository;
import com.github.voodu.studentrest.repository.TokenRepository;
import com.github.voodu.studentrest.utility.PasswordHelper;
import org.jetbrains.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.Random;
import java.util.UUID;


@Repository
@Transactional
public class AppUserService {
    private AppUserRepository appUserRepository;
    private TokenRepository tokenRepository;

    @Autowired
    public void setAppUserRepository(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    @Autowired
    public void setTokenRepository(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    public Integer authenticate(Login login) throws NoSuchUserException, WrongPasswordException, IllegalArgumentException {
        if (login.getUsername().isEmpty() || login.getPassword().isEmpty()) throw new IllegalArgumentException();
        AppUser dbAppUser = appUserRepository.findByUsername(login.getUsername());
        if (dbAppUser == null) throw new NoSuchUserException();
        String hashed = PasswordHelper.getHash(login.getPassword());
        if (dbAppUser.getPassword().equals(hashed)) throw new WrongPasswordException();
        return dbAppUser.getAccessLevel();
    }

    public Token getToken(Login login) throws WrongPasswordException, NoSuchUserException, IllegalArgumentException {
        Integer accessLevel = authenticate(login);
        return createAccessToken(login.getUsername(), accessLevel);

    }

    public boolean validateAccess(String token, int requiredAccess) {
        Integer accessLevel = validateToken(token);
        return accessLevel != null && accessLevel <= requiredAccess;
    }

    @Nullable
    private Integer validateToken(String token) {
        Token dbToken = tokenRepository.findByToken(token);
        return dbToken == null ? null : dbToken.getAccessLevel();
    }

    @Nullable
    public String getMyUsername(String token) {
        Token dbToken = tokenRepository.findByToken(token);
        if (token != null) {
            AppUser dbAppUser = appUserRepository.findByUsername(dbToken.getUsername());
            return dbAppUser == null ? null : dbAppUser.getUsername();
        }
        return null;
    }

    public static class WrongPasswordException extends Throwable {
    }

    public static class NoSuchUserException extends Throwable {
    }

    private Token createAccessToken(String username, int accessLevel) {
        UUID tokenData = UUID.randomUUID();
        Date today = new Date();
        Token token = new Token(username, tokenData.toString(), accessLevel, new Date(today.getTime() + 1000 * 60 * 60));
        tokenRepository.save(token);
        return token;
    }
}