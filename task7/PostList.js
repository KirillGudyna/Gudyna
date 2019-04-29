class postModule {

    constructor(photoPosts) {
        this._photoPosts = photoPosts;
    }

    static sortByDate = (o1, o2) => {
        return Date.parse(o2.createdAt) - Date.parse(o1.createdAt);
    };


    static unique(arr) {
        const uniqeMarker = {};
        return arr.filter((item) => {
            if (!uniqeMarker[item]) {
                uniqeMarker[item] = true;
                return true;
            }
        });
    }

    getAuthors() {
        let name = [];
        this._photoPosts.forEach(function (item) {
            if (!item.isDelete) {
                name.push(item.author);
            }
        });
        return postModule.unique(name);
    }

    getHashtags() {
        let hashtags = [];
        this._photoPosts.forEach(function (itemPost) {
            if (!itemPost.isDelete) {
                itemPost.hashTag.forEach(function (itemHashtag) {
                        hashtags.push(itemHashtag)
                    }
                )
            }
        });
        return postModule.unique(hashtags);
    }

    getPhotoPosts(skip, top, filter) {
        debugger;
        let min = top;
        let tmp = this._photoPosts.slice();
        if (!filter) {
            return tmp.sort(postModule.sortByDate).slice(skip, skip+min);
        }
        if (filter) {
            let result = this._photoPosts.slice();
            if (filter.author) {
                result = result.filter(function (post) {
                    return post.author === filter.author;
                })
            }
            if (filter.dateUpLim instanceof Date && filter.dateUpLim != 'Invalid Date') {
                result = result.filter(function (a) {
                    return a.createdAt <= filter.dateUpLim;
                });
            }
            if (filter.dateDownLim instanceof Date && filter.dateDownLim != 'Invalid Date') {
                result = result.filter(function (a) {
                    return a.createdAt >= filter.dateDownLim;
                });
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
            return result.sort(postModule.sortByDate).slice(skip, skip+min);


        }

    }

    getPhotoPost(id) {
        if (typeof id == "string" && id.valueOf() >= 0) {
            return this._photoPosts.find((item) => item.id == id
            )
                ;
        }
        return -1;
    }

    static validatePost(post) {
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

    addPhotoPost(post) {
        let id = 0;
        for (let item of this._photoPosts) {
            if (parseInt(item.id) > id) {
                id = parseInt(item.id);
            }
        }
        post.id = id + 1;
        post.id += "";
        post.createdAt = new Date();
        if (postModule.validatePost(post)) {
            this._photoPosts.push(post);
            this._photoPosts.sort(postModule.sortByDate);
            return true;
        }
        return false;
    }

    editPhotoPost(id, post) {
        debugger;
        let index = this._photoPosts.findIndex(item => item.id === id);

        if (post.description) {
            this._photoPosts[index].description = post.description;
        }
        if (post.photoLink) {
            this._photoPosts[index].photoLink = post.photoLink;
        }
        if (post.hashTag) {
            this._photoPosts[index].hashTag = post.hashTag;
        }
        return true;
    }

    removePhotoPost(id) {
        debugger;
        let tmp = this._photoPosts.slice();
        if (typeof id == "string" && id.valueOf() >= 0) {
            tmp.splice(tmp.findIndex(item => item.id === id), 1);
            this._photoPosts=tmp.slice();
            return true;
        }

        return false;
    }
}

