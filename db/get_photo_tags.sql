SELECT tag_name 
  FROM tag_ref
  JOIN tag ON tag.tid = tag_ref.tid
  JOIN photo ON photo.pid = tag.pid
  WHERE photo.pid = $1;