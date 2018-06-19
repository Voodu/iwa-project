package com.github.voodu.studentrest.utility;

import org.apache.tomcat.util.codec.binary.Base64;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class PasswordHelper {

    public static String getHash(String password) throws IllegalArgumentException {
        if (password == null || password.length() == 0)
        {
            throw new IllegalArgumentException("Empty passwords are not supported.");
        }
        MessageDigest digest;
        try {
            digest = MessageDigest.getInstance("SHA-256");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("What a Terrible Failure");
        }
        byte[] hash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
        return Base64.encodeBase64String(hash);
    }
}
