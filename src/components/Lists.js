import React from 'react';
import Info from './Info';
import Avatar from './Avatar';

export default function List(props) {

  function handleClick(id) {
    props.poupup(id);
  }
  return (
    <div id="list">
      <ul>
        {props.profile.map((item, i) => (
          <li key={i}>
            <div className="close" onClick={() => props.remove(item.id)}>
              X
            </div>
            <div 
              className="container"
              onClick={() => {
                handleClick(item.id);
              }}
            >
              <Avatar url={item.avatar_url} alt={item.login}/>
              <div>
                <Info label="Name" info={item.name}/>
                <Info label="Location" info={item.location}/>
                <Info label="Company" info={item.company}/>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}