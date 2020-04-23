import React from 'react';
import Info from './Info';
import Avatar from './Avatar';

export default function Poupup(props) {
  const getDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  };

  return props.info.name ? (
    <div id="poupup">
      <div className="close" onClick={props.close}>
        X
      </div>
      <Avatar url={props.info.avatar_url} alt={props.info.login}/>
      <div>
        <h3>{props.info.name}</h3>
        <Info label="Company" info={props.info.company}/>
        <Info label="Location" info={props.info.location}/>
        <Info label="User since" info={props.info.created_at}/>
        <Info label="Followers" info={props.info.followers}/>
        <Info label="Following" info={props.info.following}/>
        <Info label="Public Repos" info={props.info.public_repos}/>
        <Info label="Public Gists" info={props.info.public_gists}/>
        <Info label="Bio" info={props.info.bio} area={true}/>
      </div>
    </div>
  ) : (
    <></>
  );
}