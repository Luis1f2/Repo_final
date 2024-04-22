import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeContext, themes } from "./api/Theme";
import musicDB from "./db/music";
import { useDispatch, useSelector } from "react-redux";
import { setPlaylist } from "./actions/actions";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Login2 from "./Pages/Login2/Login2";

const App = () => {
    const language = useSelector(state => state.musicReducer.language);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!language || language.includes("Español")) {
            dispatch(setPlaylist(musicDB));
        } else if (language.includes('Ingles')) {
            alert("No hay pistas en ingles disponibles");
        } else {
            const filteredMusic = musicDB.filter(item => item.lang && language.includes(item.lang.toLowerCase()));
            dispatch(setPlaylist(filteredMusic));
        }
    }, [language, dispatch]);

    const isAuthenticated = Boolean(localStorage.getItem("userData"));

    return (
        <ThemeContext.Provider value={themes.light}>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login2" replace />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login2" element={<Login2 />} />
                </Routes>
            </Router>
        </ThemeContext.Provider>
    );
};

export default App;