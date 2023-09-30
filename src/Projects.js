import React from "react";
import projects from "./projects.json";

function Projects() {
    return (
        <div className="container">
            <div className="columns is-1 is-mobile">
                {projects.map((project, idx) => <div key={idx} className="column is-half">
                    <div className="card" onClick={() => console.log('XXX', 'clicked', project.tytul)}>
                        <div className="card-image">
                            <figure className="image is-1by1">
                                <img src={project.fotos[0]} alt="foto"/>
                            </figure>
                        </div>
                        <div className="card-content">
                            <div className="media">
                                <div className="media-content">
                                    <p className="title is-4">{project.tytul}</p>
                                    <p className="subtitle is-6">{project.beneficjent}</p>
                                </div>
                            </div>
                            <div className="content">
                                <p>Wartość: {project.wartosc} PLN | Dofinansowanie: {project.dofinansowanie} PLN</p>
                                <p>{project.program}</p>
                            </div>
                        </div>
                        <div className="card-content is-overlay">
                            <a className="tag is-light is-pulled-right is-rounded" href={project.url}
                               target="_blank"
                               rel="noreferrer"><span className="icon"><i
                                className="fa-solid fa-up-right-from-square"></i></span></a>
                        </div>
                    </div>
                </div>)}
            </div>
        </div>
    );
}

export default Projects;
