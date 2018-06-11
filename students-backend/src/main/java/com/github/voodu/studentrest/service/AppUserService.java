package com.github.voodu.studentrest.service;

import com.github.voodu.studentrest.model.AppUser;
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
    public Integer authenticate(AppUser appUser) {
        AppUser dbAppUser = appUserRepository.findByUsername(appUser.getUsername());
        String hashed;
        try {
            hashed = PasswordHelper.getHash(appUser.getPassword());
            return dbAppUser != null && dbAppUser.getPassword().equals(hashed) ? dbAppUser.getAccessLevel() : null; //todo throw wrongpassword and wronglogin there
        } catch (Exception e) {
            return null;
        }
    }

    public Token getToken(AppUser appUser) throws WrongPasswordException {
        Integer accessLevel = authenticate(appUser);
        if (accessLevel != null) {
            return createAccessToken(appUser.getUsername(), accessLevel);
        } else {
            throw new WrongPasswordException();
        }
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