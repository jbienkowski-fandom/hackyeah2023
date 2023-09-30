import { React } from "react";
import projects from "./projects.json";

const retriveProjectId = () => {
    return new URLSearchParams(document.location.search).get('projectId');
};

function ProjectEmbed() {
    const projectId = retriveProjectId();
    const project = projectId ? projects[projectId] : false;

    return (project && 
        <div className="card embed">
            <div className="card-image">
                <figure className="image is-128x128">
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
                    <p>Wartość: {project.wartosc} PLN | Dofinansowanie: <b>{project.dofinansowanie} PLN</b></p>
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
    ) || (<div>Unknown project.</div>);
}

export default ProjectEmbed;
