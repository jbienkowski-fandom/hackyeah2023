import React from 'react';
import projects from './projects.json';
import './App.css';

function App() {
    return (<div className="container">
            {projects.map((project, idx) => <div key={idx} className="half-container">
                <h1>{project.tytul}</h1>
            </div>)}
        </div>);
}

export default App;
