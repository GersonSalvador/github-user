import React, {useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Nav(props) {
  const [value, setValue] = useState('');

  async function handlerSubmit(event) {
    event.preventDefault();
    try {
      const users = await axios.get(`https://api.github.com/users/${value}`);
      props.onSubmit(users.data);
      setValue('');
    } catch (e) {
      Swal.fire('Oops...', 'User not found', 'error');
    }
  }

  return (
    <nav>
      <div>
        <form onSubmit={handlerSubmit}>
          <input
            type="text"
            required
            placeholder="Nomde de usuário GitHub"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <button type="submit">Adicionar</button>
        </form>
      </div>
    </nav>
  );
}