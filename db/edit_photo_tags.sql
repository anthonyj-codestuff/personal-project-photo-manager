-- THIS WORKS DON'T DELETE IT
-- Checks to see if the tag name exists in the table before adding it
-- If the name exists, the the insertion is skipped with no error

-- DO 
-- $do$
-- BEGIN
-- IF NOT EXISTS (SELECT * FROM test_table WHERE tag_name = $2) THEN
--   INSERT INTO test_table (tag_name) VALUES ($2);
-- END IF;
-- END
-- $do$

-- obtained from stackoverflow. Doesn't throw an error, but doesn't work either
-- INSERT INTO test_table (tag_name)
-- SELECT tag_name FROM (SELECT unnest($2) AS tag_name) AS arr -- unnest the array and use like a table
-- WHERE NOT EXISTS (SELECT * FROM test_table WHERE tag_name = arr.tag_name) -- ensure t is in the test

INSERT INTO test_table (tag_name)
SELECT tag_name FROM (SELECT unnest($2) AS tag_name) AS arr
WHERE NOT EXISTS (SELECT * FROM test_table WHERE tag_name = arr.tag_name)