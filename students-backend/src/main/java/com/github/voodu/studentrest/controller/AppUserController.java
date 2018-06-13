package com.github.voodu.studentrest.controller;

import com.github.voodu.studentrest.model.AppUser;
import com.github.voodu.studentrest.model.Login;
import com.github.voodu.studentrest.model.Token;
import com.github.voodu.studentrest.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/public/login")
public class AppUserController {

    @Autowired
    AppUserService appUserService;

    @RequestMapping(method = RequestMethod.POST)
    public Token login(@RequestBody Login login) throws Exception {
        try {
            return appUserService.getToken(login);
        } catch (AppUserService.WrongPasswordException e) {
            return new Token("Login failed: wrong password", "", 3, new Date());
        }
    }
}
