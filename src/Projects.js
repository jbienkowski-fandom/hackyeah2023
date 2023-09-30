import React from "react";
import projects from "./projects.json";

function Projects() {
    return (<div className="container">
        <div className="columns">
            {projects.map((project, idx) => <div key={idx} className="column is-half">
                <div className="box">
                    <figure className="image is-1by1">
                        <img src={project.fotos[0]} alt="foto" />
                    </figure>
                    <h1 className="subtitle">{project.tytul}</h1>
                </div>
            </div>)}
        </div>
    </div>);
}

export default Projects;
