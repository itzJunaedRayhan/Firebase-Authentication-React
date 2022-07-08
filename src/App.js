import React from 'react';
import SignUp from './Components/Sign_Up/SignUp';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from './Components/Dashboard/Dashboard';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import SignIn from './Components/Sign_In/SignIn';
import UpdateProfile from './Components/Update_Profile/UpdateProfile';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignUp/>}></Route>
        <Route path='/login' element={<SignIn/>}></Route>
        <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
        <Route path="/update" element={<UpdateProfile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
