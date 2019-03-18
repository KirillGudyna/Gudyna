class PostsList{

    constructor(posts) {
        this.array = posts;
        this.filter = undefined;
    }

    sortByDate(o1, o2) {
        return Date.parse(o1.createdAt) - Date.parse(o2.createdAt);
    };
    getPage(skip = 0, top = 10, filter) {
        if(typeof skip !== "number" || typeof top !== "number") {
            return [];
        }
        let tmp = this.array;
        tmp.sort(this.sortByDate);
        if (filter) {
            if(filter.author && (typeof filter.author !== "string" || filter.author.length === 0) ||
                filter.createdAt && !filter.createdAt instanceof Date) {
                return [];
            }
            if(filter.author) {
                tmp = tmp.filter((item) => {
                    return item.author === filter.author;
                });
            }

            if(filter.createdAt) {
                tmp = tmp.filter((item) => {
                    return Date.parse(item.createdAt) === Date.parse(filter.createdAt);
                })
            }

            if(filter.hashtags){
                tmp = tmp.filter((item) => {
                    if(typeof item.hashtags === "undefined") {
                        return false;
                    }
                    return filter.hashtags.every((tag) =>{
                        return item.hashtags.includes(tag);
                    })
                })
            }


        }
        return tmp.slice(skip, skip + top);
    };
    get(id) {
        if(typeof id == "string" && id.valueOf() >= 0){
            return this.array.find((item) => item.id === id);
        }
        return -1;
    };
    add(post) {
        if(validatePost(post)) {
            array.push(post);
            array.sort(sortByDate);
            return true;
        }
        else {
            return false;
        }
    };
    edit(id, post) {
        let index = array.findIndex(item => item.id === id);
        if(typeof editPhotoPost === 'undefined') {
            return false;
        }

        if(post.description) {
            array[index].description = post.description;
        }
        if(post.photoLink) {
            array[index].photoLink = post.photoLink;
        }
        if(post.hashtags) {
            array[index].hashtags = post.hashtags;
        }
        return true;
    };
    remove(id) {
        if(typeof id == "string" && id.valueOf() >= 0) {
            this.array.splice(this.array.findIndex(item => item.id === id), 1);
            return true;
        }
        return false;
    };
    static validate(post) {
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
        if (post.rating === null || typeof post.rating !== "number")
            return false;
        return true;
    };
}

let pl = new PostsList(photoPosts);
console.log(pl.getPage());
