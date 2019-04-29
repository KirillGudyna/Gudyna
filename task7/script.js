let main = (function () {
    let user="";
    let PostModule;
    let lastFilter;
    let pageNum;
    return {
        restore() {
            let pPL = JSON.parse(localStorage.getItem('pPL'));
            if (pPL === null) {
                PostModule = new postModule([
                    {
                        id: '1',
                        description: 'выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
                        createdAt: new Date('2018-02-23'),
                        author: 'Иванов Иван',
                        photoLink: 'barcelona-fc-wallpaper-18.jpg',
                        hashTag: ['god'],
                        likes: ['god', 'my']
                    },
                    {
                        id: '2',
                        description: 'Реал Мадрид выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
                        createdAt: new Date('2018-02-23'),
                        author: 'Иванов Иван',
                        photoLink: 'https://via.placeholder.com/200',
                        hashTag: ['god', 'lol'],
                        likes: ['god', 'my']
                    },
                    {
                        id: '3',
                        description: 'сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
                        createdAt: new Date('2018-02-23'),
                        author: 'ivan',
                        photoLink: 'https://via.placeholder.com/200',
                        hashTag: ['god'],
                        likes: ['god', 'my']
                    }
                ]);
            } else {
                pPL.forEach(item => item.createdAt = new Date(item.createdAt));
                PostModule = new postModule(pPL);
            }
            debugger;
            user = localStorage.getItem('user');
            main.save();
        },
        save() {
            localStorage.removeItem('pPL');
            localStorage.setItem('pPL', JSON.stringify(PostModule._photoPosts));
            localStorage.setItem('user', user);
        },
        showGuest(){
            main.showPosts();
            main.showLogin();
        },
        showUser(){
            debugger;
            DomFunction.setProfile(user,PostModule);
            main.showPosts();
            document.getElementsByClassName('add-post')[0].setAttribute('style', 'display: block');
            document.getElementsByClassName('postAdd-author')[0].textContent=user;
            document.getElementsByClassName('add-post')[0].addEventListener('click', DomFunction.showAddWindow);
            document.getElementsByClassName('auth-btn')[0].setAttribute("style", "display:none");
            document.getElementsByClassName('out-btn')[0].setAttribute("style", "display:block");
            document.getElementsByClassName('out-btn')[0].addEventListener('click', main.logOut);
        },
        showLogin() {
            user = '';
            document.getElementsByClassName('auth-btn')[0].addEventListener('click', DomFunction.showLogInWindow);
            document.getElementsByClassName('close-login-window-button')[0].addEventListener('click', DomFunction.closeLogInWindow);
            document.getElementsByClassName('login-button')[0].addEventListener('click', main.logIn);
        },
        logIn(login) {
            login = DomFunction.getLogin();
            if (login !== '') {
                user = login;
                DomFunction.closeLogInWindow();
                DomFunction.setProfile(user, PostModule);
                document.getElementsByClassName('add-post')[0].setAttribute('style', 'display: block');
                document.getElementsByClassName('add-post')[0].addEventListener('click', DomFunction.showAddWindow);
                document.getElementsByClassName('postAdd-author')[0].textContent=user;
                main.showPosts();
                document.getElementsByClassName('auth-btn')[0].setAttribute("style", "display:none");
                document.getElementsByClassName('out-btn')[0].setAttribute("style", "display:block");
                document.getElementsByClassName('out-btn')[0].addEventListener('click', main.logOut);
            }
            main.save();
        },
        logOut() {
            user = "";
            document.getElementsByClassName('add-post')[0].setAttribute('style', 'display: none');
            DomFunction.setProfile("", PostModule);
            main.showPosts();
            document.getElementsByClassName('auth-btn')[0].setAttribute("style","display:block");

            document.getElementsByClassName('out-btn')[0].setAttribute("style","display:none");
            main.showLogin();
            main.save();
        },
        getPhotoPost(id){
            return PostModule.getPhotoPost(id);
        },
        start() {
            main.restore();
            main.search();
            if (user===""){
                main.showGuest();
            } else {
                main.showUser();
            }
        },
        editPhotoPost(id, photoPost) {
            if (user !== '' && PostModule.getPhotoPost(id).author === user) {
                if (PostModule.editPhotoPost(id, photoPost)) {
                    DomFunction.replacePost(PostModule.getPhotoPost(id),user);
                    DomFunction.closeEditWindow();
                }
            }
            main.save();
        },
        addPhotoPost(){
            let photoPost = DomFunction.getAddPost();
            if(user!==""){
                photoPost.author = user;
                photoPost.likes = [];
                if (PostModule.addPhotoPost(photoPost)) {
                   main.showPosts();
                    DomFunction.closeAddWindow();
                    main.save();
                }
            }

        },
        removePhotoPost(id){
            if(PostModule.removePhotoPost(id)) {
                DomFunction.removePhotoPost(id);
                main.showPosts();
                main.save();
            }
        },
        showPosts(){
            debugger;
            DomFunction.clear();
            pageNum=1;
            let filterConfig = DomFunction.getFilters();
            let photoPosts = PostModule.getPhotoPosts(0, 10, filterConfig);
            if (photoPosts.length === 0) {
                DomFunction.clear();
            } else {
                lastFilter = filterConfig;
                photoPosts.forEach(item => DomFunction.showPost(item, user));
                if (photoPosts.length === 10 && PostModule.getPhotoPosts(10, 1, filterConfig).length === 1) {
                    DomFunction.showLoadMoreButton();
                }
            }
        },
        loadMore() {
            document.getElementsByClassName('add-btn')[0].setAttribute("style",'display:none');
            let photoPosts = PostModule.getPhotoPosts(pageNum * 10, 10, lastFilter);
            photoPosts.forEach(item => DomFunction.showPost(item, user));
            if (photoPosts.length === 10 && PostModule.getPhotoPost(++pageNum * 10, 1, lastFilter).length === 1) {
                DomFunction.showLoadMoreButton();
            }
        },
        search(){
            debugger;
            document.getElementsByClassName('search')[0].addEventListener('click',main.showPosts);
        },
        likePhotoPost(photoPost) {
            debugger;
            if (user !== '') {
                let index = photoPost.likes.indexOf(user);
                if (index === -1) {
                    photoPost.likes.push(user);
                } else {
                    photoPost.likes.splice(index, 1);
                }
                DomFunction.replacePost(photoPost, user);
                main.save();
            }
        },
        unlikePhotoPost(photoPost){
            if(user!==''){
                let index = photoPost.likes.indexOf(user);
                photoPost.likes.splice(index, 1);
                DomFunction.replacePost(photoPost,user);
                main.save();
            }
        }


    }

}());
main.start();

//localStorage.setItem('user',"");
