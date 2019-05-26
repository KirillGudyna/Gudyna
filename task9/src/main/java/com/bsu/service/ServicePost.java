package com.bsu.service;

import com.bsu.userpost.Post;

import java.util.List;
import java.util.Map;

public interface ServicePost {
    List<Post> getPhotoPosts(int skip, int top, Map<String, String> filter);
    Post getPhotoPost(int id);
    boolean validatePhotoPost(Post post);
    boolean addPhotoPost(Post post);
    boolean editPhotoPost(int id, Post post);
    boolean removePhotoPost(int id);
}