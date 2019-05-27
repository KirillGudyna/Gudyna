select user.name as name from mydb.photo_post left join mydb.user on photo_post.user_iduser = user.iduser
group by user.iduser
having count(photo_post.user_iduser) >= 3;