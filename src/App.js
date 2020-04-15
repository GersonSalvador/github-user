import React, {useState} from 'react';
import './App.css';
import axios from 'axios';
import Swal from 'sweetalert2';

function Nav(props){
  const [value,setValue] = useState('');

  async function handlerSubmit(event){
    event.preventDefault();
    try{
      const users = await axios.get(`https://api.github.com/users/${value}`)
      props.onSubmit(users.data)
      setValue('')
    } catch(e) {
      Swal.fire('Oops...', 'User not found', 'error') 
    }
  }

  return (
    <nav>
      <div>
        <form onSubmit={handlerSubmit}>
          <input type="text" required placeholder="Nomde de usuário GitHub" onChange={e => setValue(e.target.value)} value={value} />
          <button type="submit">Adicionar</button>
        </form>
      </div>
    </nav>
  )
}

function List(props){
  function handleClick(item){
    props.poupup(item)
  }
  return (
    <div id="list">
      <ul>
        {
          props.profile.map((item,i) => {
            return(
              <li key={i} onClick={()=>{handleClick(item)}}>
                <div className="avatar">
                  <img src={item.avatar_url} alt={item.login}/>
                </div>
                <div>
                  <p><strong>Name:</strong> {item.name}</p>
                  <p><strong>Location:</strong> {item.location}</p>
                  <p><strong>Company:</strong> {item.company}</p>
                </div>
              </li>
            ) 
          })
        }
      </ul>
    </div>
  )
}

function Poupup(props){
  console.log('props',props)

  const getDate = (date) => {
    const d = new Date(date)
    return d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate()
  }
  
  return props.info.name
  ? (
    <div id="poupup">
      <div className="close" onClick={props.close}>X</div>
      <div className="avatar">
        <img src={props.info.avatar_url} alt={props.info.login} />
      </div>
      <div>
        <h3>{props.info.name}</h3>
        <p><strong>Company:</strong> {props.info.company}</p>
        <p><strong>Location:</strong> {props.info.location}</p>
        <p><strong>User since:</strong> {getDate(props.info.created_at)}</p>
        <p><strong>Followers:</strong> {props.info.followers}</p>
        <p><strong>Following:</strong> {props.info.following}</p>
        <p><strong>Public Repos:</strong> {props.info.public_repos}</p>
        <p><strong>Public Gists:</strong> {props.info.public_gists}</p>
        <div className="bio">{props.info.bio}</div>
      </div>
    </div>
  )
  : (<></>);
}

function App() {

  const [list,setList] = useState([{
    login: "GersonSalvador",
    id: 13970277,
    node_id: "MDQ6VXNlcjEzOTcwMjc3",
    avatar_url: "https://avatars0.githubusercontent.com/u/13970277?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/GersonSalvador",
    html_url: "https://github.com/GersonSalvador",
    followers_url: "https://api.github.com/users/GersonSalvador/followers",
    following_url: "https://api.github.com/users/GersonSalvador/following{/other_user}",
    gists_url: "https://api.github.com/users/GersonSalvador/gists{/gist_id}",
    starred_url: "https://api.github.com/users/GersonSalvador/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/GersonSalvador/subscriptions",
    organizations_url: "https://api.github.com/users/GersonSalvador/orgs",
    repos_url: "https://api.github.com/users/GersonSalvador/repos",
    events_url: "https://api.github.com/users/GersonSalvador/events{/privacy}",
    received_events_url: "https://api.github.com/users/GersonSalvador/received_events",
    type: "User",
    site_admin: false,
    name: "Gerson Salvador",
    company: "EasySystem",
    blog: "",
    location: "Brazil, SC",
    email: null,
    hireable: null,
    bio: null,
    public_repos: 14,
    public_gists: 1,
    followers: 2,
    following: 5,
    created_at: "2015-08-25T20:43:54Z",
    updated_at: "2020-03-27T01:49:53Z",
  }])

  const [info, setInfo] = useState([])
  const poupup = (item) => {
    setInfo(item)
    console.log(item)
  }
  const closePoupup = () => {
    setInfo([])
  }
  const addNewProfile = (profile) => {
      if(!profile.name){
        Swal.fire('Oops...', 'It seems '+profile.login+' doesn\'t have public info', 'error')
      }else{
        setList(prevState => [profile,...prevState])
      }
  }

  return (
    <div className="App">
      <Nav onSubmit={addNewProfile}/>
      <List profile={list} poupup={poupup}/>
      <Poupup info={info} close={closePoupup} />
    </div>
  );
}

export default App;
