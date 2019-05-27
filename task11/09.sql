select user.name as name, photo_post.createdAt as date, photo_post.description as description
from mydb.photo_post
left join mydb.user on photo_post.user_iduser = user.iduser where length(photo_post.description) > 30
order by createdAt asc;