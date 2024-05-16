/* eslint-disable  */
import './App.css'
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import SignIn from './pages/Signin';
import Loading from './pages/Loading';
import Home from './pages/Home';
import Signup from './pages/Signup';
// import Signup from './pages/Signup';


function App() {


  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
      <Analytics />
    </>
  );
}

export default App
