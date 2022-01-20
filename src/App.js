import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import Zoom from 'react-reveal/Zoom'
import './styles.css'
import api from "./services/api";

function App() {
 
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({})

 async  function HandleSearch() {
      if (input === '') {
        alert("Preencha algum CEP!")
        return;
      } 
      try{ 
        const response = await api.get(`${input}/json`);
        setCep(response.data)
        setInput('')
            
      } catch {
          alert("Ops, algum erro aconteceu!")
          setInput('')
      }
  }



  return (
    <div className="container">
      <h1 className="title">
      <Zoom left cascade>
          Buscador CEP
        </Zoom>


      </h1>
      <div className="containerInput">
        <input type="text" placeholder="Digite seu cep..." value={input} onChange={(event) => setInput(event.target.value)} />

        <button className="buttonSearch">
          <FiSearch size={20} color="#FFF" onClick={HandleSearch} />
        </button>
      </div>
      <main className="main">
          <h2>CEP: {cep.cep} </h2>
          <span>Rua: {cep.logradouro}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade}</span>
          <span>Estado: {cep.uf}</span>
          <span>DDD: {cep.ddd}</span>


      </main>

    </div>
  );
}

export default App;
