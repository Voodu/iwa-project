package com.github.voodu.studentrest.utility;

import org.apache.tomcat.util.codec.binary.Base64;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

public class PasswordHelper {

    public static String getHash(String password) throws Exception {
        if (password == null || password.length() == 0)
        {
            throw new IllegalArgumentException("Empty passwords are not supported.");
        }
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
        return Base64.encodeBase64String(hash);
    }
}
