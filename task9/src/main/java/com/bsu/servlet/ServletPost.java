package com.bsu.servlet;

import com.bsu.service.classes.Posts;
import com.bsu.userpost.Post;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

public class ServletPost extends HttpServlet {
    private Posts posts = new Posts();
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException{
        int id = Integer.parseInt(request.getParameter("id"));
        Post post = posts.getPhotoPost(id);
        if (post != null) {
            response.getOutputStream().println(post.toString());
        } else {
            response.getOutputStream().println("Not found\n");
        }

    }
    @Override
    protected void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException{
        int id = Integer.parseInt(request.getParameter("id"));
        String author = request.getParameter("author");
        String description = request.getParameter("description");
        String photoLink = request.getParameter("photoLink");
        String creationDate = Posts.buildCurrentDate().toString();

        Post post = new Post(id, author, description, photoLink, creationDate, new ArrayList<>(), new ArrayList<>());

        if (posts.addPhotoPost(post)) {
            response.getOutputStream().println("Success\n");
        } else {
            response.getOutputStream().println("Invalid\n");
        }
    }
    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int id = Integer.parseInt(request.getParameter("id"));
        if (posts.removePhotoPost(id)) {
            response.getOutputStream().println("Post has been successfully deleted\n");
        } else {
            response.getOutputStream().println("Not found\n");
        }
    }
}
