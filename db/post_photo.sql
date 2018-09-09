INSERT INTO photo (url, uid)
VALUES ($1, $2)
RETURNING pid;
