import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeScreen from './screens/homeScreen';
import LoginScreen from './screens/loginScreen';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/" element={<HomeScreen />} />
          {/* <Route path="/personScreen" element={<PersonDetail/>}/>
  <Route path="/details" element={<AuthDetails/>}/> */}
        </Routes>
      </BrowserRouter>
  );
}

export default App;
