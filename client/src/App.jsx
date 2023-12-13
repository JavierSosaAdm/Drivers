import { Routes, Route } from 'react-router-dom';
import Home from './Views/Home/home';
import Landing from './Views/Landing/landing';
import Form from './Views/Form/form';
import Detail from './Views/Detail/detail';
import style from'./App.module.css';
import axios from 'axios';
axios.defaults.baseULR = 'http://localhost:3001';
function App() {

  return (

    <div className={style.div}> 

      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='home' element={<Home/>}/>
        <Route path='detail/:id' element={<Detail/>}/>
        <Route path='form' element={<Form/>}/>      
      </Routes>

    </div>
  );
}

export default App;