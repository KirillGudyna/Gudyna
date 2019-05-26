package com.bsu.userpost;

import org.json.simple.JSONObject;

import java.util.List;

public class Post {
    private int id;
    private String author;
    private String description;
    private String photoLink;
    private String creationDate;
    private List<String> likes;
    private List<String> hashtags;

    public Post(int id, String author, String description, String photoLink,
                     String creationDate, List<String> likes, List<String> hashtags) {
        this.id  = id;
        this.author = author;
        this.description = description;
        this.photoLink = photoLink;
        this.creationDate = creationDate;
        this.likes = likes;
        this.hashtags = hashtags;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }
    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public String getPhotoLink() {
        return photoLink;
    }
    public void setPhotoLink(String photoLink) {
        this.photoLink = photoLink;
    }

    public String getCreationDate() {
        return creationDate;
    }
    public void setCreationDate(String  creationDate) {
        this.creationDate = creationDate;
    }

    public List<String> getLikes() {
        return likes;
    }
    public void setLikes(List<String> likes) {
        this.likes = likes;
    }

    public List<String> getHashtags() {
        return hashtags;
    }
    public void setHashtags(List<String> hashtags) {
        this.hashtags = hashtags;
    }

    @Override
    public String toString() {
        JSONObject json = new JSONObject();
        json.put("id", id);
        json.put("author", author);
        json.put("description", description);
        json.put("photolink", photoLink);
        json.put("creationDate", creationDate);
        json.put("likes", likes.toString());
        json.put("hashtags", hashtags.toString());
        return json.toString();
    }
}
