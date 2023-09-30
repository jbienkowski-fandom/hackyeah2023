import React from "react";
import projects from "./projects.json";

function Ranking() {
    return (
        <div className="table-container">
            <table className="table">
                <thead>
                <tr>
                    <th>Miejsce</th>
                    <th>Projekt</th>
                    <th>Beneficjent</th>
                    <th>Wynik</th>
                </tr>
                </thead>
                <tbody>
                {projects.map((project, idx) => (
                    <tr key={idx}>
                        <th>{idx + 1}</th>
                        <td>{project.tytul}</td>
                        <td>{project.beneficjent}</td>
                        <td>{Math.round(Math.random() * 1500)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Ranking;
