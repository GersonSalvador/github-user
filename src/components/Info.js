import React from 'react';

export default function Info({label,info, area}){

  const txtArea = area ? <div className="bio">{info}</div> : null
  info = area ? info : null
  return (
    <>
      <p>
        <strong>{label}: </strong>
        {info}
      </p>
      {txtArea}
    </>
  );

}