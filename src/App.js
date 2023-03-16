import logo from './logo.svg';
import './App.css';
import FlavorForm from './Components/FlavorForm';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Listings from './Components/Listings';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/hasta_listesi_web" element={<Home />} />
        <Route path="Form" element={<FlavorForm />} />
        <Route path="Listings" element={<Listings />} />
      </Routes>
    </div>
  );
}

export default App;
