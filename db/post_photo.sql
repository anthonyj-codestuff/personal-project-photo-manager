--Takes the info for a new picture and returns the information necessary to display it in a new picture staging component
INSERT INTO photo (url, uid)
VALUES ($1, $2)
RETURNING pid, url, title;
