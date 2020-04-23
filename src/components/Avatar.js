import React from 'react';

export default function Avatar({url,login}){
  return (
    <div className="avatar">
      <img src={url} alt={login} />
    </div>
  )
}