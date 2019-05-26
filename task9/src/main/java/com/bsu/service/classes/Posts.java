package com.bsu.service.classes;

import com.bsu.ArraysUserPosts.ArraysPost;
import com.bsu.service.ServicePost;
import com.bsu.userpost.Post;
import com.google.gson.Gson;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

public class Posts implements ServicePost {
    private List<Post> collection;

    public Posts(){
        this.collection = ArraysPost.getInstance().getCollection();
    }

    public List<Post> getPhotoPosts(int skip, int top, Map<String, String> filter) {
        List<Post> filterPosts = new ArrayList<Post>();
        for(Map.Entry pair : filter.entrySet()) {
            if (pair.getKey().equals("author")) {
                collection.stream()
                        .filter(post -> post.getAuthor().equals(pair.getValue()))
                        .forEach(filterPosts::add);
            }
            else if (pair.getKey().equals("creationDate")) {
                collection.stream()
                        .filter(post -> post.getCreationDate().equals(pair.getValue()))
                        .forEach(filterPosts::add);
            }
        }
        if(filter.size() == 0) {
            filterPosts = new ArrayList<Post>(collection);
        }
        if(top > filterPosts.size()) {
            top = filterPosts.size();
        } else if(top > 10) {
            top = 10;
        }
        if (skip >= filterPosts.size()) {
            skip = 0;
        }
        if (skip + top > filterPosts.size()) {
            return filterPosts.subList(skip, filterPosts.size());
        } else {
            return filterPosts.subList(skip, skip + top);
        }

    }

    public Post getPhotoPost(int id) {
        for (Post post: collection) {
            if (post.getId() == id) {
                return post;
            }
        }
        return null;
    }

    public boolean validatePhotoPost(Post post) {
        for(Post photoPost : collection) {
            if (photoPost.getId() == post.getId()) {
                return false;
            }
        }
        if(post.getAuthor() == null)
            return false;
        if(post.getDescription() == null || post.getDescription().length() > 200)
            return false;
        if(post.getPhotoLink() == null)
            return false;
        if(post.getCreationDate() == null || !isCorrectDate(post.getCreationDate()))
            return false;
        if(post.getLikes() == null || post.getHashtags() == null)
            return false;

        return true;
    }

    public boolean addPhotoPost(Post post) {
        if(validatePhotoPost(post)) {
            collection.add(post);
            return true;
        }
        else
            return false;
    }

    public boolean editPhotoPost(int id, Post postFilter) {
        Post post = getPhotoPost(id);
        if(post == null) {
            return false;
        }
        if (postFilter.getDescription() != null && postFilter.getDescription().length() <= 200) {
            post.setDescription(postFilter.getDescription());
        }
        if (postFilter.getHashtags() != null) {
            post.setHashtags(postFilter.getHashtags());
        }
        return true;
    }

    public boolean removePhotoPost(int id) {
        Post post = getPhotoPost(id);
        if(post != null) {
            collection.remove(post);
            return true;
        }else {
            return false;
        }
    }
    private boolean isCorrectDate(String date){
        String[] tempDate;
        final String DATE_FORMAT = "dd-MM-yyyy";
        if(date.contains("-")) {
            tempDate = date.split("-");
        } else
            return false;
        if(tempDate.length != 3) {
            return false;
        }
        try {
            DateFormat df = new SimpleDateFormat(DATE_FORMAT);
            df.setLenient(false);
            df.parse(date);
            return true;
        } catch (ParseException e) {
            return false;
        }
    }
    public void addLike(int id, String user) {
        Post post = this.getPhotoPost(id);
        post.getLikes().add(user);
    }

    public void removeLike(int id, String user) {
        Post post = this.getPhotoPost(id);
        int index = post.getLikes().indexOf(user);
        if (index != -1) post.getLikes().remove(user);
    }

    public boolean isHasUserLike(int id, String user) {
        Post post = this.getPhotoPost(id);
        return post.getLikes().contains(user);
    }

    public static StringBuilder buildCurrentDate(){
        Calendar calendar = GregorianCalendar.getInstance();
        StringBuilder date = new StringBuilder();
        date.append(calendar.get(Calendar.DATE))
                .append("-").append(calendar.get(Calendar.MONTH) + 1)
                .append("-").append(calendar.get(Calendar.YEAR));
        return date;
    }

    public String toJsonString(List<Post> list)
    {
        if(list.size() > 0) {
            Gson gson = new Gson();
            StringBuilder sb = new StringBuilder();
            sb.append("[");
            for (Post post : list) {
                sb.append(gson.toJson(post)).append(",");
            }
            sb.append("]");
            return sb.toString().replace(",]", "]");
        }
        return "";
    }
}

