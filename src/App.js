import './App.css';
import Login from './components/Login';
import Registro from './components/Registro';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import { BrowserRouter, Routers, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';


const App = () => {

  return (
    <Provider store={store}>

     <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Login/>}/>
          <Route path="/registro" element={<Registro/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="*" element={<NotFound/>}/>

        </Routes>
     </BrowserRouter>

    </Provider>
  );
}

export default App;




















/*

import Contador from './components/Contador';
import Lista from './components/Lista';
import Posts from './components/Posts';

  //JSX -> js y xml
  //VDOM
  //class -> className - for -> htmlFor
  //Fragment <> </>

<div className="App">
      <Contador />
      <hr/>
      <Lista/>
      <hr/>
      <Posts />
    </div>
*/


/*

import Noticia from './components/Noticia';
import Novedad from './components/Novedad';
import Persona from './components/Persona';

  let personas = [
    { id: 1, nombre: "Mateo", edad: 24 },
    { id: 2, nombre: "Guillermo", edad: 29 },
    { id: 3, nombre: "Tania", edad: 22 }
  ]


 <h1>Hola!</h1>
      <Noticia nombre="Santiago" apellido="Fagnoni" />
      <Noticia nombre="Fernando" apellido="Perez" />
      <hr />
      {personas.map(objPersona => <Persona key={objPersona.id} {...objPersona} />)}
      {personas.map(objPersona => <Persona key={objPersona.id} nombre={objPersona.nombre} edad={objPersona.edad} />)}
      {personas.map((persona, pos) => <Persona key={pos} nombre={persona} />)}
      {personas.map((persona, pos) => <p key={pos}>{persona}</p>)}
      <hr />
      <Novedad />
      <Novedad />
*/



//  let personas = [<p>Mateo</p>, <p>Guillermo</p>, <p>Tania</p>];
//{personas}

/*
<p>{personas[0]}</p>
<p>{personas[1]}</p>
<p>{personas[2]}</p>
*/

