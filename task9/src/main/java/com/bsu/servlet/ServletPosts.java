package com.bsu.servlet;

import com.bsu.service.classes.Posts;
import com.bsu.userpost.Post;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ServletPosts extends HttpServlet {
    private Posts posts = new Posts();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        int top, skip;
        if(request.getParameter("skip")!=null){
            skip = Integer.parseInt(request.getParameter("skip"));
        } else {
            skip = 0;
        }
        if(request.getParameter("top")!=null){
            top = Integer.parseInt(request.getParameter("skip"));
        } else {
            top = 0;
        }
        String author = request.getParameter("author");
        String creationDate = request.getParameter("creationDate");
        Map<String, String> filter = new HashMap<>();
        if(author != null) {
            filter.put("author", author);
        }
        if (creationDate != null) {
            filter.put("creationDate", creationDate);
        }
        List<Post> res = new ArrayList<>(posts.getPhotoPosts(skip, top, filter));
        if(res.size() == 0) {
            response.getOutputStream().println("Not found");
        }else {
            response.getOutputStream().println(posts.toJsonString(res));
        }
    }
}
