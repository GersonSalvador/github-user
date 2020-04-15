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
  function handleClick(id){
    props.poupup(id)
  }
  return (
    <div id="list">
      <ul>
        {
          props.profile.map((item,i) => {
            return(
              <li key={i} onClick={()=>{handleClick(item.id)}}>
                <div className="close" onClick={() => props.remove(item.id)}>X</div>
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
        <p><strong>Bio:</strong></p>
        <div className="bio">{props.info.bio}</div>
      </div>
    </div>
  )
  : (<></>);
}

function App() {

  const [list,setList] = useState([])
  const [init, setInit] = useState([])

  async function initialState(){
    try{
      const users = await axios.get('https://api.github.com/users/gersonsalvador')
      setInit([users.data])
      setList([users.data])
    } catch(e) {
      console.error(e)
      Swal.fire('Oops...', 'Initial info couldn\'t be found', 'error') 
    }
  }

  if(!init.length)
    initialState()

  const [info, setInfo] = useState([])
  
  const poupup = (id) => {
    let filter = list.filter(item => item.id === id)
    setInfo(filter[0])
  }

  const closePoupup = () => {
    setInfo([])
  }

  const removeItemList = (id) => {
    const newList =  list.filter(item => item.id !== id)
    setList(newList)
  }

  const addNewProfile = (profile) => {
    if(!profile.name){
      Swal.fire('Oops...', 'It seems '+profile.login+' doesn\'t have public info', 'error')
    }else{
      setList(prevState => {
        const exists = prevState.filter(item => item.id === profile.id)
        if(exists.length){
          Swal.fire('Oops!','User already in your list','info')
          return  prevState 
        }
        return [profile,...prevState]
      })
    }
  }

  return (
    <div className="App">
      <Nav onSubmit={addNewProfile}/>
      <List profile={list} poupup={poupup} remove={removeItemList}/>
      <Poupup info={info} close={closePoupup} />
    </div>
  );
}

export default App;
