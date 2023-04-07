import logo from './logo.svg';
import './App.css';
import FlavorForm from './Components/FlavorForm';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Listings from './Components/Listings';
import ModifyForm from './Components/ModifyForm';
import { UserProvider } from './Components/UserContext';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Routes>
          <Route path="/hasta_listesi_web" element={<Home />} />
          <Route path="Form" element={<FlavorForm />} />
          <Route path="ModifyForm" element={<ModifyForm />} />
          <Route path="Listings" element={<Listings />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
