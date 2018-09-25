INSERT INTO tag_imp (predicate, implies)
VALUES ($1, $2)
RETURNING *;