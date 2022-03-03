-- SQLite
DELETE FROM userSubreddits WHERE userId = 3;

DELETE FROM commentUpvotes WHERE userId = 3;
DELETE FROM commentDownvotes WHERE userId = 3;

DELETE FROM postUpvotes WHERE userId = 3;
DELETE FROM postDownvotes WHERE userId = 3;

DELETE FROM posts WHERE userId = 3;
DELETE FROM logins WHERE userId = 3;
DELETE FROM comments WHERE userId = 3;
DELETE FROM users WHERE id = 3;