package com.bsu.ArraysUserPosts;

import com.bsu.userpost.User;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ArrayUsers {
    private List<User> users;
    private ArrayUsers(){
        this.users = new ArrayList<User>(Arrays.asList(
                new User("kirill","123"),
                new User("Иванов Иван","234"),
                new User("ivan","321")
        ));
    }
    public List<User> getUsers(){
        return this.users;
    }
    public static class UsersHolder {
        public static final ArrayUsers HOLDER_INSTANCE = new ArrayUsers();
    }

    public static ArrayUsers getInstance() {
        return ArrayUsers.UsersHolder.HOLDER_INSTANCE;
    }
}
