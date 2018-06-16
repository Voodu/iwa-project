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



@Repository
@Transactional
public class AppUserService {
    private static final int tokenLength = 20;

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

    @Nullable
    public Integer authenticate(Login login) {
        AppUser dbAppUser = appUserRepository.findByUsername(login.getUsername());
        String hashed;
        try {
            hashed = PasswordHelper.getHash(login.getPassword());
            return dbAppUser != null && dbAppUser.getPassword().equals(hashed) ? dbAppUser.getAccessLevel() : null; //todo throw wrongpassword and wronglogin there
        } catch (Exception e) {
            return null;
        }
    }

    public Token getToken(Login login) throws WrongPasswordException {
        Integer accessLevel = authenticate(login);
        if (accessLevel != null) {
            return createAccessToken(login.getUsername(), accessLevel);
        } else {
            throw new WrongPasswordException();
        }
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

    public class WrongPasswordException extends Throwable {
    }

    private Token createAccessToken(String username, int accessLevel) {
        Random random = new Random();
        CharSequence characters = "abcdefghijklmnoprstuwxyz1234567890-_";
        StringBuilder tokenData = new StringBuilder();
        for (int i = 0; i < tokenLength; i++) {
            tokenData.append(characters.charAt(random.nextInt(characters.length())));
        }
        Date today = new Date();
        Token token = new Token(username, tokenData.toString(), accessLevel, new Date(today.getTime() + 1000 * 60 * 60));
        tokenRepository.save(token);
        return token;
    }
}