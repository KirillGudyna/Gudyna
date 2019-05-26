package com.bsu.service.classes;

import com.bsu.ArraysUserPosts.ArrayUsers;
import com.bsu.service.ServiceUser;
import com.bsu.userpost.User;

import java.util.List;

public class Users implements ServiceUser {
    private List<User> users;
    public Users(){
        this.users= ArrayUsers.getInstance().getUsers();
    }
    @Override
    public User loginUser(String login, String password){
        for(User user:users){
            if(user.getUserName().equals(login) && user.getPassword().equals(password)) {
                return user;
            }
        }
        return null;
    }
    @Override
    public boolean registerUser(User user) {
        for(User u : users) {
            if (u.getUserName().equals(user.getUserName())) {
                return false;
            }
        }
        return true;
    }


}
