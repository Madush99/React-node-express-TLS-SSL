import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeScreen from './screens/homeScreen';
import LoginScreen from './screens/LoginScreen/loginScreen';
import SignupScreen from './screens/SignupScreen/signupScreen';
import AdminScreen from './screens/adminScreen';
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';

import FileUpload from './screens/FileUpload/fileUpload';
import MessageScreen from './screens/MessageScreen/messageScreen';
import ManagerScreen from './screens/MangerScreen/managerScreen';
import UserScreen from './screens/UserScreen/userScreen';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      {/* <main className='py-3'> */}
      {/* <Container> */}
      <Routes>


        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<HomeScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/admin" element={<AdminScreen />} />
        <Route path="/message" element={<MessageScreen />} />
        <Route path="/fileupload" element={<FileUpload />} />
        <Route path="/manager" element={<ManagerScreen />} />
        <Route path="/user" element={<UserScreen />} />

      </Routes>
      {/* </Container> */}
      {/* </main> */}
    </BrowserRouter>
  );
}

export default App;
