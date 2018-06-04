package com.github.voodu.studentrest.service;

import com.github.voodu.studentrest.model.Login;
import com.github.voodu.studentrest.repository.LoginRepository;
import com.github.voodu.studentrest.utility.PasswordHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public class LoginService {

    @Autowired
    LoginRepository loginRepository;

    public Boolean authenticate(String username, String password) throws Exception {
        Login dbUser = loginRepository.findByUsername(username);
        String hashed = PasswordHelper.getHash(password);
        if (dbUser != null && dbUser.getPassword().equals(hashed))
        {
            return true;
        }

        return false;
    }
}