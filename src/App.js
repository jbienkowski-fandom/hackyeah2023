import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import './App.css';

import Start from "./Start";
import Vote from "./Vote";
import ProjectEmbed from "./ProjectEmbed";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/vote"><Vote/></Route>
                <Route path="/project-embed"><ProjectEmbed/></Route>
                <Route path="/"><Start/></Route>
            </Switch>
        </Router>
    );
}

export default App;
