import { Routes, Route } from 'react-router-dom';
import Home from './Views/Home/home';
import Landing from './Views/Landing/landing';
import Form from './Views/Form/form';
import Detail from './Views/Detail/detail';
import './App.css';

function App() {

  return (

    <div className="App"> 

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