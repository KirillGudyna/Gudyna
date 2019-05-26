package com.bsu.service;

import com.bsu.userpost.User;

public interface ServiceUser {
    User loginUser(String login, String password);
    boolean registerUser(User user);
}