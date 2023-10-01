import React from "react";
import {useStore} from "./store";

function Option(props) {
    const {project, onVote, isRight} = props;
    if (!project.fotos?.length) {
        console.error('XXX', project);
        return null;
    }
    const randomFoto = Math.floor(Math.random() * project.fotos.length);

    return (
        <div className="column is-half">
            <div className="card is-hoverable" onClick={() => onVote(project, isRight)}>
                <div className="card-image">
                    <figure className="image is-1by1">
                        <img src={project.fotos[randomFoto]} alt="project foto"/>
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
                        <div className="small">{project.program}</div>
                        <div className="margin-top">wartość projektów</div>
                        <div className="small">{project.wartosc} zł</div>
                        <div className="margin-top">dofinansowanie z Unii Europejskiej</div>
                        <div className="orange small bold">{project.dofinansowanie} zł</div>
                    </div>
                </div>
                <div className="card-content is-overlay">
                    <a className="tag is-light is-pulled-right is-rounded" href={project.url}
                       target="_blank"
                       rel="noreferrer"><span className="icon"><i
                        className="fa-solid fa-up-right-from-square"></i></span></a>
                </div>
            </div>
        </div>
    );
}

function Projects() {
    const projects = useStore(state => state.projects);
    const winningProject = useStore(state => state.winningProject);
    const vote = useStore(state => state.vote);
    const shuffledProjects = projects.sort(() => Math.random() - 0.5);
    const randomProjects = winningProject !== null ?
                           winningProject.isRight ? [...shuffledProjects.slice(0, 1), winningProject]
                                                  : [winningProject, ...shuffledProjects.slice(0, 1)]
                                                   : shuffledProjects.slice(0, 2);

    const onVote = (winningProject, isRight) => {
        const losingProject = randomProjects.find(project => project !== winningProject);
        console.log('=====', winningProject.id, winningProject.score, losingProject.id, losingProject.score);
        vote(winningProject, losingProject, isRight);
    };

    return (
        <div className="container">
            <div className="columns is-1 is-mobile">
                {randomProjects.map(
                    (project, idx) => <Option project={project} key={idx} onVote={onVote} isRight={idx === 1}/>)}
            </div>
        </div>
    );
}

export default Projects;
