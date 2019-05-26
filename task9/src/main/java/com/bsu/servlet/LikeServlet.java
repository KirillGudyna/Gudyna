package com.bsu.servlet;

import com.bsu.service.classes.Posts;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LikeServlet extends HttpServlet {
    private Posts posts = new Posts();
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response){
        int id=Integer.parseInt(request.getParameter("id"));
        String user=request.getParameter("user");
        if (posts.isHasUserLike(id, user)) {
            posts.removeLike(id, user);
        } else {
            posts.addLike(id, user);
        }
    }
}
