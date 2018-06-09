package com.github.voodu.studentrest.service;

import com.github.voodu.studentrest.model.AppUser;
import com.github.voodu.studentrest.model.Token;
import com.github.voodu.studentrest.repository.AppUserRepository;
import com.github.voodu.studentrest.repository.TokenRepository;
import com.github.voodu.studentrest.utility.PasswordHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.Random;



@Repository
@Transactional
public class AppUserService {
    private static final int tokenLength = 20;

    @Autowired
    AppUserRepository appUserRepository;

    @Autowired
    TokenRepository tokenRepository;

    public boolean authenticate(String username, String password) {
        AppUser dbAppUser = appUserRepository.findByUsername(username);
        String hashed;
        try {
            hashed = PasswordHelper.getHash(password);
            return dbAppUser != null && dbAppUser.getPassword().equals(hashed);
        } catch (Exception e) {
            return false;
        }

    }

    public Token getToken(AppUser appUser) throws WrongPasswordException {
        if (authenticate(appUser.getUsername(), appUser.getPassword())) {
            return createAccessToken(appUser.getAccessLevel());
        } else {
            throw new WrongPasswordException();
        }
    }

    public class WrongPasswordException extends Throwable {
    }

    private Token createAccessToken(int accessLevel) {
        Random random = new Random();
        CharSequence characters = "abcdefghijklmnoprstuwxyz1234567890-_";
        StringBuilder tokenData = new StringBuilder();
        for (int i = 0; i < tokenLength; i++) {
            tokenData.append(characters.charAt(random.nextInt(characters.length())));
        }
        Date today = new Date();
        Token token = new Token(tokenData.toString(), accessLevel, new Date(today.getTime() + 1000 * 60 * 60));
        tokenRepository.save(token);
        return token;
    }
}