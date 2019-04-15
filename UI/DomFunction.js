let DomModule = (function () {
    let user = 'Иванов Иван';
    setProfile();



    function showPhotoPost(userPost) {
       // debugger;
        let posts = document.getElementById('page-body');
        let post = document.createElement('div');
        post.className = 'post-row';

        let headPost = document.createElement('div');
        headPost.className = 'headPost';

        let inconUser = document.createElement("a");
        inconUser.setAttribute("href", "#");
        inconUser.innerHTML = "<img src=\"user%20.png\" alt=\"\"  class=\"userPhoto\">";

        let nickname = document.createElement('div');
        nickname.className = 'post-title';
        nickname.textContent = userPost.author;

        let data = document.createElement('div');
        data.className = 'post-date';
        data.textContent = formatDate(userPost.createdAt);

        headPost.appendChild(inconUser);
        headPost.appendChild(nickname);
        headPost.appendChild(data);

        let photoArea = document.createElement('div');
        photoArea.className = 'post-content';
        photoArea.innerHTML =`<img src="${userPost.photoLink}" class="post-img" alt="">
                              <p>${userPost.description}</p>
                               <div class="clr"></div>`;


        let elements = document.createElement('div');
        elements.className = 'elements';

        let like = document.createElement('a');
        like.setAttribute('href', '#');
        like.innerHTML = "<img src=\"heart-outline%20.png\"  class=\"like\">";
        let hashtegs = document.createElement('div');
        hashtegs.className = 'hashtags';
        let hashTags = '';
        hashTags = userPost.hashTag.join('');
        hashtegs.innerHTML = hashTags;
        if (user === userPost.author) {
            let edit = document.createElement('a');
            edit.setAttribute('href', '#');
            edit.innerHTML = "<img src=\"setting.png\" class=\"setting\">";
            let deletePost = document.createElement('a');
            deletePost.setAttribute('href', '#');
            deletePost.innerHTML = "<img src=\"waste-bin.png\" class=\"delete\">";
            elements.appendChild(deletePost);
            elements.appendChild(edit);
        }
        elements.appendChild(like);
        elements.appendChild(hashtegs);
        post.appendChild(headPost);
        post.appendChild(photoArea);
        post.appendChild(elements);
        posts.appendChild(post);
    }

    function setProfile() {
        if (user) {
            let nick = document.getElementById('nick');
            let nickname = document.getElementById('nickname');
            nickname.textContent = user;
            nick.appendChild(nickname);
            addFilterAuthor();
            addFilterHashtags();

        }
    }

    function formatDate(date) {

        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        let yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        return dd + '.' + mm + '.' + yy;
    }

    function addFilterAuthor() {
        //debugger;
        let Author = document.getElementById('Name');
        let nameAuthors = postModule.getAuthors();
        let formDatalist = '';
        nameAuthors.forEach(function (item) {
            formDatalist += '<option>' + item + '</option>';
        });
        Author.innerHTML = formDatalist;
    }

    function addFilterHashtags() {
        let Hashtags = document.getElementById('hashtags');
        let nameHashtags = postModule.getHashtags();
        let formDatalist = '';
        nameHashtags.forEach(function (item) {
            formDatalist += '<option>' + item + '</option>';
        });
        Hashtags.innerHTML = formDatalist;
    }

    function addPhotoPost(post) {
        postModule.addPhotoPost(post);
        showPosts(0, 10);
    }

    function removePhotoPost(id) {
        postModule.removePhotoPost(id);
        showPosts(0, 10);
    }

    function editPost(id, post) {
        postModule.editPhotoPost(id, post);
        showPosts(0, 10);
    }

    function showPosts(skip, top, filterConfig) {
        let posts = document.getElementById('page-body');
        posts.textContent = '';
        let photoPosts = postModule.getPhotoPosts(skip, top, filterConfig);
        for (let i = 0; i < photoPosts.length; i++) {
            if (!photoPosts[i].isDelete)
                showPhotoPost(photoPosts[i]);
        }
    }


    return {
        showPhotoPost,
        showPosts,
        editPost,
        removePhotoPost,
        addPhotoPost,
        addFilterHashtags,
        addFilterAuthor
    };

})();
DomModule.showPosts(0, 4);

DomModule.editPost('1', {description: 'Тачка на прокачку'});

DomModule.removePhotoPost('3');

DomModule.addPhotoPost({
    id: '10',
    description: 'Барселона - чемпион',
    createdAt: new Date('2018-04-23T15:00:00'),
    author: 'vlad',
    photoLink: 'barcelona-fc-wallpaper-18.jpg',
    hashTag: ['#Barca', '#Gold'],
    like: ['Vlad', 'Petya'],
    isDelete: false
});