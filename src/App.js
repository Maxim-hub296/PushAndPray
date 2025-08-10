import React from 'react';
import About from "./pages/About";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CommitMessage from "./pages/CommitMessage";
import Excuse from "./pages/Execuse";
import ErrorMessage from "./pages/ErrorMessage";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";


function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/about'} element={<About/>}/>
                <Route path={'/commit_message'} element={<CommitMessage/>}/>
                <Route path={'/excuse'} element={<Excuse/>}/>
                <Route path={'/error_message'} element={<ErrorMessage/>}/>
            </Routes>
            <Footer/>
        </Router>
    )
}

export default App;
