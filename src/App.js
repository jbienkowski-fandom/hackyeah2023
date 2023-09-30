import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import './App.css';
import Projects from "./Projects";
import Start from "./Start";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/vote"><Projects/></Route>
                <Route path="/"><Start /></Route>
            </Switch>
        </Router>
    );
}

export default App;
