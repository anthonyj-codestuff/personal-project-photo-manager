-- Returns n results. Be sure to check for infinite loops in case the user does a dumb
-- (where x implies y implies x. Don't let that happen)
SELECT implies FROM tag_imp
WHERE predicate = $1;