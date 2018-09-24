INSERT INTO tag_alias (old_name, new_name)
VALUES ($1, $2)
RETURNING *;