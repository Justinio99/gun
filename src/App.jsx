import { Routes, Route } from "react-router-dom"

import './App.css'
import Register from './containers/Register';
import Login from './containers/Login';
import Layout from "./components/layout/Layout";
import { GunProvider } from "./context/gun";
import HomePage from "./containers/Home";

function App() {

  return (
    <div className="App">
      <GunProvider>
        <Layout>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Layout>
      </GunProvider>
    </div>
  );
}

export default App
