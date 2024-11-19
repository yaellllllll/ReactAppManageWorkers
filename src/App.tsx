import React from 'react';
import logo from './logo.svg';
import './App.css';
import userModel from './Model/userModel'; 
import UserList from './components/UserList/UserList'
import My_Model from './components/My_Modal/My_Modal';
import FullDetails from './components/Full_details/Full_details'

function App() {

  function a(){
      alert("hi it works!")
  }
  return <div>
    <UserList></UserList>
    {/* <FullDetails></FullDetails> */}
{/* <My_Model modalTitle='hi libi!'onApproveClick={a} ><p>have a nice day!</p> </My_Model> */}
  </div>
}

export default App;
