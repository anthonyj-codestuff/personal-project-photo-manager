import React from 'react';

//pass in a Postgres datetime value. All it does is format the date for people to see.
const DateTime = (props) => {
  let {datetime} = props;
  const date = datetime.match(/\d+-\d+-\d+/g)
  const time = datetime.match(/\d+:\d+/g)
  return (
    <p>{`Uploaded on ${date} at ${time}`}</p>
  );
};

export default DateTime;