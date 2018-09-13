-- Before calling this query, the user's input MUST be stripped of all duplicates and empty strings
-- Additionally, any new tags must already be added to the tag_ref table
-- $1 = str - tag
-- $2 = int - picture ID

INSERT INTO tag (pid,  tid)
  SELECT $2,tag_ref.tid
  FROM tag_ref
  WHERE $1 = tag_ref.tag_name;