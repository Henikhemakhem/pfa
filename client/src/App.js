import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import UpdateUser from './crud/UpdateUser';
import User from './crud/User';
import CreateUser from './crud/CreateUser';
import Dashboard from './pages/login';
import Test from './pages/test';

import Home from './pages/home';
import Login from './pages/login';
import Header from './components/header';
import Footer from './components/footer';
import Signup from './pages/signup';


function App() {
  return (
    <div className="App">
    <Header></Header>
      <BrowserRouter>

        <Routes>
        <Route path='/Home' exact element={<Home />}/>
   
          <Route path='/' exact element={<Login/>}/>
          <Route path='/sign' exact element={<Signup/>}/>
          <Route path='/profile/update/:id'  exact element={<UpdateUser />} />
          <Route path='/profile/:id' exact element={<User/>} />
          <Route path='/createUser' exact element={<CreateUser/>} />
          <Route path='/Dashboard' exact element={<Dashboard/>}/>
          <Route path='/Test' exact element={<Test />}/>
          <Route path='/User' exact element={<User/>}/>

          
         
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default App;
