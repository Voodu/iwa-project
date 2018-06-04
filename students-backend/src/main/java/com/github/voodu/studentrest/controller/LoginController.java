package com.github.voodu.studentrest.controller;

import com.github.voodu.studentrest.model.Login;
import com.github.voodu.studentrest.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/public/login")
public class LoginController {

    @Autowired
    LoginService loginService;

    @RequestMapping(method = RequestMethod.POST)
    public Boolean login(@RequestBody Login login) {
        try {
            if(loginService.authenticate(login.getUsername(), login.getPassword())) {
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }
}
