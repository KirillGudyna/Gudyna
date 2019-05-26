package com.bsu.userpost;

import org.json.simple.JSONObject;

public class User {
    private String username;
    private String password;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUserName() {
        return username;
    }
    public void setUserName(String login) {
        this.username = login;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        JSONObject json = new JSONObject();
        json.put("username", username);
        json.put("password", password);
        return json.toString();
    }
}
