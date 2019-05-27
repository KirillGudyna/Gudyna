select user.name as name, photo_post.createdAt as date, photo_post.description as description FROM mydb.photo_post
left join mydb.user on photo_post.user_iduser = user.iduser where user.name = 'Chernyakov'
order by createdAt asc;