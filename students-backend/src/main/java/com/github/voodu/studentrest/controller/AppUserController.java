package com.github.voodu.studentrest.controller;

import com.github.voodu.studentrest.model.AppUser;
import com.github.voodu.studentrest.model.Login;
import com.github.voodu.studentrest.model.Token;
import com.github.voodu.studentrest.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/public/login")
public class AppUserController {

    private AppUserService appUserService;

    @Autowired
    public AppUserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Token> login(@RequestBody Login login) {
        try {
            return ResponseEntity.ok(appUserService.getToken(login));
        } catch (AppUserService.NoSuchUserException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (AppUserService.WrongPasswordException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.I_AM_A_TEAPOT);
        }
    }
}
