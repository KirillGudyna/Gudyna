package com.bsu.servlet;


import com.bsu.service.classes.Users;
import com.bsu.userpost.User;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ServletUser extends HttpServlet {
    private Users users =new Users();
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String login=request.getParameter("login");
        String password =request.getParameter("password");
        User user =users.loginUser(login,password);
        if (user!=null){
            response.getOutputStream().println(user.toString());
        } else {
            response.getOutputStream().println("check data");
        }
    }
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{
        String login = request.getParameter("login");
        String password =request.getParameter("password");
        User user =users.loginUser(login,password);
        if (users.registerUser(user)){
            response.getOutputStream().println("Success");
        } else {
            response.getOutputStream().println("User exist");
        }
    }
}
