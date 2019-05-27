select user.name as name from mydb.photo_post join mydb.user

on photo_post.user_iduser = user.iduser

where photo_post.createdAt = date_format(current_timestamp, '%Y-%m-%d')

group by user.name
having count(user.name) > 3;