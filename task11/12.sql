select user.name as name, count(user.name) as amount from mydb.photo_post join mydb.user
on photo_post.user_iduser = user.iduser
where photo_post.createdAt like '2019-05-09%'
group by user.name;