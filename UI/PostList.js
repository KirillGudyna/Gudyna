let postModule = (function () {
    let photoPosts = [
        {
            id: '1',
            description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
            createdAt: new Date('2018-02-23'),
            author: 'Иванов Иван',
            photoLink: 'https://via.placeholder.com/200',
            hashTag: ['#god'],
            likes: ['god', 'my']
        },
        {
            id: '2',
            description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
            createdAt: new Date('2018-02-23'),
            author: 'Иванов Иван',
            photoLink: 'https://via.placeholder.com/200',
            hashTag: ['#god', 'lol'],
            likes: ['god', 'my']
        },
        {
            id: '3',
            description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
            createdAt: new Date('2018-02-23'),
            author: 'ivan',
            photoLink: 'https://via.placeholder.com/200',
            hashTag: ['#god'],
            likes: ['god', 'my']
        }
    ];
    let array = photoPosts;
    let sortByDate = (o1, o2) => {
        return Date.parse(o1.createdAt) - Date.parse(o2.createdAt);
    };

    function getAuthors() {
        let name = [];
        photoPosts.forEach(function (item) {
            if (!item.isDelete) {
                name.push(item.author);
            }
        });
        return unique(name);
    }

    function unique(arr) {
        const uniqeMarker = {};
        return arr.filter((item) => {
            if (!uniqeMarker[item]) {
                uniqeMarker[item] = true;
                return true;
            }
        });
    }

    function getHashtags() {
        let hashtags = [];
        photoPosts.forEach(function (itemPost) {
            if (!itemPost.isDelete) {
                itemPost.hashTag.forEach(function (itemHashtag) {
                        hashtags.push(itemHashtag)
                    }
                )
            }
        });
        return unique(hashtags);
    }

    function getPhotoPosts(skip, top, filter) {
        skip = skip || 0;
        top = top || 0;
        let min = top;
        if (min > photoPosts.length) {
            min = photoPosts.length;
        }
        if (!filter) {
            return photoPosts.sort(sortByDate).slice(skip, min);
        }
        if (filter) {
            let result = photoPosts;
            if (filter.author) {
                result = result.filter(function (post) {
                    return post.author === filter.author;
                })
            }
            if (filter.createdAt) {
                result = result.filter(function (post) {
                    return post.createdAt === filter.createdAt;
                })
            }
            if (filter.hashTag) {
                result = result.filter(function (post) {
                    for (let hashTag of post.hashTag) {
                        for (let hashTagSearch of [].concat(filter.hashTag)) {
                            if (hashTag === hashTagSearch) {
                                return true;
                            }
                        }
                    }
                });
            }
            return result.sort(sortByDate).slice(skip, min);


        }

    }

    function getPhotoPost(id) {
        if (typeof id == "string" && id.valueOf() >= 0) {
            return array.find((item) => item.id == id
            )
                ;
        }
        return -1;
    }

    function validatePost(post) {
        if (!post) {
            return false;
        }
        if (post.id === "" || typeof post.id !== "string") {
            return false;
        }
        if (post.description === "" || typeof post.description !== "string")
            return false;
        if (!(post.createdAt instanceof Date))
            return false;
        if (post.author === "" || typeof post.author !== "string")
            return false;
        if (post.photoLink === "" || typeof post.photoLink !== "string")
            return false;
        /*if (post.rating === null || typeof post.rating !== "number")
            return false;*/
        return true;
    }

    function addPhotoPost(post) {
        if (validatePost(post)) {
            array.push(post);
            array.sort(sortByDate);
            return true;
        } else {
            return false;
        }
    }

    function editPhotoPost(id, post) {
        let index = array.findIndex(item => item.id === id
            )
        ;
        if (typeof editPhotoPost === 'undefined') {
            return false;
        }

        if (post.description) {
            array[index].description = post.description;
        }
        if (post.photoLink) {
            array[index].photoLink = post.photoLink;
        }
        if (post.hashtags) {
            array[index].hashtags = post.hashtags;
        }
        return true;
    }

    function removePhotoPost(id) {
        if (typeof id == "string" && id.valueOf() >= 0) {
            array.splice(array.findIndex(item => item.id === id), 1
            )
            ;
            return true;
        }
        return false;
    }

    return {
        getAuthors,
        getHashtags,
        getPhotoPost,
        getPhotoPosts,
        validatePost,
        addPhotoPost,
        editPhotoPost,
        removePhotoPost
    }

}());
