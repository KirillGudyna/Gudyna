class DomFunction {
    static createPost(userPost, user) {
        // debugger;
        let post = document.createElement('div');
        post.className = 'post-row';
        post.setAttribute('id', userPost.id);

        let headPost = document.createElement('div');
        headPost.className = 'headPost';

        let inconUser = document.createElement("a");
        inconUser.setAttribute("href", "#");
        inconUser.innerHTML = "<img src=\"../resources/images/user%20.png\" alt=\"\"  class=\"userPhoto\">";

        let nickname = document.createElement('div');
        nickname.className = 'post-title';
        nickname.textContent = userPost.author;

        let data = document.createElement('div');
        data.className = 'post-date';
        data.textContent = DomFunction.formatDate(userPost.createdAt);

        headPost.appendChild(inconUser);
        headPost.appendChild(nickname);
        headPost.appendChild(data);

        let photoArea = document.createElement('div');
        photoArea.className = 'post-content';
        photoArea.innerHTML = `<img src="${userPost.photoLink}" class="post-img" alt="">
                              <p>${userPost.description}</p>
                               <div class="clr"></div>`;

        let elements = document.createElement('div');
        elements.className = 'elements';
        if (user !== "") {
            let like = document.createElement('a');
            if(userPost.likes.indexOf(user)!==-1){
                like.setAttribute('href', '#');
                like.innerHTML = "<img src=\"../resources/images/red-heart.png\"  class=\"like\">";
                like.onclick = function(){
                    main.unlikePhotoPost(userPost);
                };
            } else {
            like.setAttribute('href', '#');
            like.innerHTML = "<img src=\"../resources/images/heart-outline%20.png\"  class=\"like\">";
            like.onclick = function(){
                main.likePhotoPost(userPost);
            };
            }
            elements.appendChild(like);
        }
        let hashtegs = document.createElement('div');

        for (let item of userPost.hashTag) {
            hashtegs.innerHTML += "#" + item;
        }
        if (user === userPost.author) {
            let edit = document.createElement('a');
            edit.setAttribute('href', '#');
            edit.innerHTML = "<a><img src=\"../resources/images/setting.png\" class=\"setting\"></a>";
            edit.onclick = function () {
                DomFunction.showEditWindow(userPost.id);
            };
            let deletePost = document.createElement('a');
            deletePost.setAttribute('href', '#');
            deletePost.innerHTML =`<img src="../resources/images/waste-bin.png" class="delete">`;
            deletePost.onclick = function () {
                DomFunction.showDeleteWindow(userPost.id);
            };
            elements.appendChild(deletePost);
            elements.appendChild(edit);
        }
        elements.appendChild(hashtegs);
        post.appendChild(headPost);
        post.appendChild(photoArea);
        post.appendChild(elements);
        return post;
    }

    static setProfile(user, PostModule) {
        let nick = document.getElementById('nick');
        let nickname = document.getElementById('nickname');
        nickname.textContent = user;
        nick.appendChild(nickname);
        DomFunction.addFilterAuthor(PostModule);
        DomFunction.addFilterHashtags(PostModule);
    }

    static formatDate(date) {

        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        let yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        return dd + '.' + mm + '.' + yy;
    }

    static addFilterAuthor(PostModule) {
        //debugger;
        let Author = document.getElementById('Name');
        let nameAuthors = PostModule.getAuthors();
        let formDatalist = '';
        nameAuthors.forEach(function (item) {
            formDatalist += '<option>' + item + '</option>';
        });
        Author.innerHTML = formDatalist;
    }

    static addFilterHashtags(PostModule) {
        let Hashtags = document.getElementById('hashtags');
        let nameHashtags = PostModule.getHashtags();
        let formDatalist = '';
        nameHashtags.forEach(function (item) {
            formDatalist += '<option>' + item + '</option>';
        });
        Hashtags.innerHTML = formDatalist;
    }

    static addPhotoPost(post, PostModule) {
        PostModule.addPhotoPost(post);
        DomFunction.showPosts(0, 10);
    }

    static removePhotoPost(id) {
        debugger;
        let node = document.getElementById(id);
        let main = document.getElementsByClassName('page-body')[0];
        if (node !== null) {
            main.removeChild(node);
        }
    }

    static clear() {
        debugger;
        let mains = document.getElementsByClassName('page-body')[0];
        while (mains.firstChild) {
            mains.removeChild(mains.firstChild);
        }
    }

    static getFilters() {
        debugger;
        let searchForm = document.getElementsByClassName('search-line')[0];

        let author = searchForm.elements.SearchbyName.value;
        let dateDownLim = searchForm.elements.from.value;
        let dateUpLim = searchForm.elements.to.value;
        let tags = searchForm.elements.SearchbyTag.value;
        return {
            author: author,
            dateDownLim: new Date(dateDownLim),
            dateUpLim: new Date(dateUpLim),
            hashTag: tags,
        };
    }

    static showPosts(skip, top, user, PostModule, filterConfig) {
        let posts = document.getElementsByClassName('page-body')[0];
        posts.textContent = '';
        let photoPosts = PostModule.getPhotoPosts(skip, top, filterConfig);
        for (let i = 0; i < photoPosts.length; i++) {
            if (!photoPosts[i].isDelete)
                DomFunction.showPost(photoPosts[i], user);
        }
    }

    static showPost(photoPost, userName) {
        document.getElementsByClassName('page-body')[0].appendChild(DomFunction.createPost(photoPost, userName));
    }

    static replacePost(photoPost, userName) {
        debugger;
        let main = document.getElementsByClassName('page-body')[0];
        let node = document.getElementById(photoPost.id);
        if (node !== null) {
            main.replaceChild(DomFunction.createPost(photoPost, userName), node);
        }
    }

    static getLogin() {
        return document.getElementsByClassName('login-window-form')[0].elements.login.value;
    }

    static showLogInWindow() {
        document.getElementsByClassName('login-window')[0].setAttribute('style', 'display: block');
    }

    static closeLogInWindow() {
        document.getElementsByClassName('login-window')[0].setAttribute('style', 'display: none');
    }

    static showEditWindow(id) {
        document.getElementsByClassName('edit-window')[0].setAttribute('style', 'display: block');
        DomFunction._setEditForm(id);
        document.getElementsByClassName('apply-edit-window-button')[0].addEventListener('click', function () {
            main.editPhotoPost(id, DomFunction._getEditForm());
        });
        document.getElementsByClassName('close-edit-window-button')[0].addEventListener('click', DomFunction.closeEditWindow);
    }

    static closeEditWindow() {
        document.getElementsByClassName('edit-window')[0].setAttribute('style', 'display: none');
    }

    static _setEditForm(id) {
        debugger;
        let photoPost = main.getPhotoPost(id);
        document.getElementsByClassName("post-author")[0].textContent = photoPost.author;
        let editForm = document.getElementsByClassName('edit-window-form')[0];
        editForm.elements.description.value = photoPost.description;
        editForm.elements.photoLink.value = photoPost.photoLink;
        editForm.elements.tags.value = "#" + photoPost.hashTag.join('#');
    }

    static _getEditForm() {
        let photoPost = {};
        let editForm = document.getElementsByClassName('edit-window-form')[0];
        photoPost.description = editForm.elements.description.value;
        photoPost.photoLink = editForm.elements.photoLink.value;
        photoPost.hashTag = editForm.elements.tags.value;
        let tagsArr = photoPost.hashTag.split('#');
        tagsArr.splice(0, 1);
        photoPost.hashTag = tagsArr;
        return photoPost;
    }

    static getAddPost() {
        let photoPost = {};
        let AddForm = document.getElementsByClassName('add-window-form')[0];
        photoPost.description = AddForm.elements.description.value;
        photoPost.photoLink = AddForm.elements.photoLink.value;
        photoPost.hashTag = AddForm.elements.tags.value;
        let tagsArr = photoPost.hashTag.split('#');
        tagsArr.splice(0, 1);
        photoPost.hashTag = tagsArr;
        AddForm.elements.description.value = "";
        AddForm.elements.photoLink.value = "";
        AddForm.elements.tags.value = "";
        return photoPost;
    }

    static showAddWindow() {
        document.getElementsByClassName('add-window')[0].setAttribute('style', 'display: block');
        document.getElementsByClassName('apply-add-window-button')[0].addEventListener('click', main.addPhotoPost);
        document.getElementsByClassName('close-add-window-button')[0].addEventListener('click', DomFunction.closeAddWindow);
    }

    static closeAddWindow() {
        document.getElementsByClassName('add-window')[0].setAttribute('style', 'display: none');
    }

    static showDeleteWindow(id) {
        document.getElementsByClassName('delete-window')[0].setAttribute('style', 'display: block');
        document.getElementsByClassName('yes-delete-button')[0].addEventListener('click', function () {
            main.removePhotoPost(id);
            DomFunction.closeDeleteWindow();
        });
        document.getElementsByClassName("no-delete-button")[0].addEventListener('click', DomFunction.closeDeleteWindow);
    }

    static closeDeleteWindow() {
        document.getElementsByClassName('delete-window')[0].setAttribute('style', 'display: none');
    }

    static showLoadMoreButton() {
        document.getElementsByClassName('add-btn')[0].setAttribute("style", 'display:block');
        document.getElementsByClassName('add-btn')[0].addEventListener('click', main.loadMore);
    }
}