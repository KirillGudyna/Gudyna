select datediff(date_format(current_timestamp, '%Y-%m-%d'), createdAt) as days_ago from mydb.photo_post
where createdAt = (select min(createdAt) from mydb.photo_post);