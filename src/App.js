import React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar.js";
import Home from "./pages/Home.js"
import Register from "./pages/Register.js"
import Login from "./pages/Login.js"
import Profile from "./pages/Profile.js";
import AuthProvider from "./context/auth.js";
import PrivateRoute  from "./components/PrivateRoute.js";

const App = () => {
    return (
        <AuthProvider>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/register" element={<Register />}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            </Routes>
        </BrowserRouter>
        </AuthProvider>
    );
}
export default App