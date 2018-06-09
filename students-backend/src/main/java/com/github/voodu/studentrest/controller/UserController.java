package com.github.voodu.studentrest.controller;

import com.github.voodu.studentrest.model.AppUser;
import com.github.voodu.studentrest.service.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/public/login")
public class UserController {

    @Autowired
    AppUserService appUserService;

    @RequestMapping(method = RequestMethod.POST)
    public AppUser login(@RequestBody AppUser appUser) throws Exception {
        return appUserService.authenticate(appUser.getUsername(), appUser.getPassword());
    }
}
