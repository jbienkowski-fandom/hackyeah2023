import React, {useEffect, useState} from "react";
import {useStore} from "./store";
import projects from "./projects.json";

function randomProject(_projects) {
    return _projects[Math.floor(Math.random() * projects.length)];
}

export function randomProjects(_projects, initialProject = null, isRight = false) {
    const p = initialProject === null ? [] : [initialProject];
    while (p.length < 2) {
        const project = randomProject(_projects);
        if (!p.find(p => p.tytul === project.tytul)) {
            p.push(project);
        }
    }
    return isRight ? p.reverse() : p;
}

function Projects() {
    const projects = useStore(state => state.projects);
    const vote = useStore(state => state.vote);

    const [_projects, setProjects] = useState([]);

    useEffect(() => {
        setProjects(randomProjects(projects));
    }, []);

    const onVote = (winningProject, isRight) => {
        const losingProject = _projects.find(project => project !== winningProject);
        vote(winningProject, losingProject);
        console.log('XXX', isRight);
        setProjects(randomProjects(projects, winningProject, isRight));
    };

    return (
        <div className="container">
            <div className="columns is-1 is-mobile">
                {_projects.map((project, idx) => <div key={idx} className="column is-half">
                    <div className="card" onClick={() => onVote(project, idx !== 0)}>
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
