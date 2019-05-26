package com.bsu.ArraysUserPosts;

import com.bsu.userpost.Post;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ArraysPost {
    public List<Post> postList;

    public ArraysPost() {
        this.postList = new ArrayList<Post>(Arrays.asList(
                new Post(1, "kirill", "ahaha :)",
                        "https://i.ytimg.com/vi/_JDnTsb1GfE/maxresdefault.jpg",
                        "20-05-2016", new ArrayList<String>(Arrays.asList("Natasha", "Dima")), new ArrayList<String>(Arrays.asList("#space", "#Elon"))),
                new Post(2, "ivan", "Space",
                        "https://i.ytimg.com/vi/_JDnTsb1GfE/maxresdefault.jpg",
                        "20-05-2016", new ArrayList<String>(Arrays.asList("Natasha", "Dima")), new ArrayList<String>(Arrays.asList("#space", "#Elon"))),
                new Post(3, "kirill", "SpaceXhudflkgr",
                        "https://media.gq.com/photos/57eac35d9228bbed3f6f4ee5/master/pass/elon-musk-is-a-rocket.jpg",
                        "09-05-2017", new ArrayList<String>(Arrays.asList("Natasha", "Dima")), new ArrayList<String>(Arrays.asList("#space", "#Elon"))),
                new Post(4, "Иванов Иван", "SpaceXhudflkgr",
                        "https://media.gq.com/photos/57eac35d9228bbed3f6f4ee5/master/pass/elon-musk-is-a-rocket.jpg",
                        "22-04-2019", new ArrayList<String>(Arrays.asList("Natasha", "Dima")), new ArrayList<String>(Arrays.asList("#space", "#Elon"))),
                new Post(5, "kirill", "SpaceXkikykikykikykiky",
                        "https://media.gq.com/photos/57eac35d9228bbed3f6f4ee5/master/pass/elon-musk-is-a-rocket.jpg",
                        "12-03-2019", new ArrayList<String>(Arrays.asList("Natasha", "Dima")), new ArrayList<String>(Arrays.asList("#space", "#Elon"))),
                new Post(6, "ivan", "SpaceXkikykiky",
                        "https://media.gq.com/photos/57eac35d9228bbed3f6f4ee5/master/pass/elon-musk-is-a-rocket.jpg",
                        "22-10-2019", new ArrayList<String>(Arrays.asList("Natasha", "Dima")), new ArrayList<String>(Arrays.asList("#space", "#Elon"))),
                new Post(7, "Иванов Иван", "SpaceXkiky",
                        "https://media.gq.com/photos/57eac35d9228bbed3f6f4ee5/master/pass/elon-musk-is-a-rocket.jpg",
                        "22-01-2018", new ArrayList<String>(Arrays.asList("Natasha", "Dima")), new ArrayList<String>(Arrays.asList("#space", "#Elon"))),
                new Post(8, "Иванов Иван", "SpaceXlolplolplolp",
                        "https://media.gq.com/photos/57eac35d9228bbed3f6f4ee5/master/pass/elon-musk-is-a-rocket.jpg",
                        "25-04-2019", new ArrayList<String>(Arrays.asList("Natasha", "Dima")), new ArrayList<String>(Arrays.asList("#space", "#Elon"))),
                new Post(9, "kirill", "SpaceXlolplolp",
                        "https://media.gq.com/photos/57eac35d9228bbed3f6f4ee5/master/pass/elon-musk-is-a-rocket.jpg",
                        "22-04-2019", new ArrayList<String>(Arrays.asList("Natasha", "Dima")), new ArrayList<String>(Arrays.asList("#space", "#Elon"))),
                new Post(10, "ivan", "SpaceXlolp",
                        "https://media.gq.com/photos/57eac35d9228bbed3f6f4ee5/master/pass/elon-musk-is-a-rocket.jpg",
                        "22-04-2019", new ArrayList<String>(Arrays.asList("Natasha", "Dima")), new ArrayList<String>(Arrays.asList("#space", "#Elon")))));
    }
    public List<Post> getCollection(){
        return this.postList;
    }
    public static class PostCollectionHolder {
        public static final ArraysPost HOLDER_INSTANCE = new ArraysPost();
    }

    public static ArraysPost getInstance() {
        return PostCollectionHolder.HOLDER_INSTANCE;
    }
}
