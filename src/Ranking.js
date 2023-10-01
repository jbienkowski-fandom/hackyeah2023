import React from "react";
import {useStore} from "./store";

function Ranking() {
    const projects = useStore(state => state.projects);
    const sortedProjects = projects.sort(
        (a, b) => b.score === a.score ? a.tytul.localeCompare(b.tytul) : b.score - a.score);

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                <tr>
                    <th>Miejsce</th>
                    <th>Projekt</th>
                    <th>Beneficjent</th>
                    <th>Wynik</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {sortedProjects.map((project, idx) => (
                    <tr key={idx}>
                        <th>{idx + 1}</th>
                        <td>{project.tytul}</td>
                        <td>{project.beneficjent}</td>
                        <td>{project.score}</td>
                        <td><a className="tag is-light is-pulled-right is-rounded" href={project.url}
                               target="_blank"
                               rel="noreferrer"><span className="icon"><i
                            className="fa-solid fa-up-right-from-square"></i></span></a></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Ranking;
