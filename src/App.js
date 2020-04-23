import React, { useState } from 'react';
import List from './components/Lists';
import Nav from './components/Nav';
import Poupup from './components/Poupup';
import './App.css';
import axios from 'axios';
import Swal from 'sweetalert2';

function App() {
  const [list, setList] = useState([]);
  const [init, setInit] = useState([]);

  async function initialState() {
    try {
      const users = await axios.get(
        'https://api.github.com/users/gersonsalvador',
      );
      setInit([users.data]);
      setList([users.data]);
    } catch (e) {
      console.error(e);
      Swal.fire('Oops...', "Initial info couldn't be found", 'error');
    }
  }

  if (!init.length) initialState();

  const [info, setInfo] = useState([]);

  const poupup = (id) => {
    const filter = list.filter((item) => item.id === id);
    setInfo(filter[0]);
  };

  const closePoupup = () => {
    setInfo([]);
  };

  const removeItemList = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };

  const addNewProfile = (profile) => {
    if (!profile.name) {
      Swal.fire(
        'Oops...',
        `It seems ${profile.login} doesn't have public info`,
        'error',
      );
    } else {
      setList((prevState) => {
        const exists = prevState.filter((item) => item.id === profile.id);
        if (exists.length) {
          Swal.fire('Oops!', 'User already in your list', 'info');
          return prevState;
        }
        return [profile, ...prevState];
      });
    }
  };

  return (
    <div className="App">
      <Nav onSubmit={addNewProfile} />
      <List profile={list} poupup={poupup} remove={removeItemList} />
      <Poupup info={info} close={closePoupup} />
    </div>
  );
}

export default App;
