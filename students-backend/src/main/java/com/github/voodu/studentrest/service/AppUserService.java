package com.github.voodu.studentrest.service;

import com.github.voodu.studentrest.model.AppUser;
import com.github.voodu.studentrest.repository.AppUserRepository;
import com.github.voodu.studentrest.utility.PasswordHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public class AppUserService {

    @Autowired
    AppUserRepository appUserRepository;

    public AppUser authenticate(String username, String password) throws Exception {
        AppUser dbAppUser = appUserRepository.findByUsername(username);
        String hashed = PasswordHelper.getHash(password);
        if (dbAppUser != null && dbAppUser.getPassword().equals(hashed))
        {
            return dbAppUser;
        }

        return null;
    }
}