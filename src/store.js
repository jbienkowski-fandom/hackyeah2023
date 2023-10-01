import {create} from 'zustand'
import projects from "./projects.json";
import EloRank from "elo-rank";

const INITIAL_SCORE = 1500;
const rank = new EloRank(50);
const idRegex = new RegExp(/https:\/\/mapadotacji.gov.pl\/projekty\/([0-9]+)/);

export const useStore = create((set) => ({
    projects: projects.map((project) => ({
        ...project,
        id: parseInt(project.url.match(idRegex)?.[1], 10),
        score: INITIAL_SCORE,
    })),
    winningProject: null,
    visibleProjects: [],
    setVisibleProjects: (visibleProjects) => set({visibleProjects}),
    vote: (winningProject, losingProject, isRight) => set((state) => {
        const expectedWinningScore = rank.getExpected(winningProject.score, losingProject.score);
        const expectedLosingScore = rank.getExpected(losingProject.score, winningProject.score);
        const winningScore = rank.updateRating(expectedWinningScore, 1, winningProject.score);
        const losingScore = rank.updateRating(expectedLosingScore, 0, losingProject.score);
        const _projects = state.projects.map(project => {
            if (project.id === winningProject.id) {
                return {
                    ...winningProject,
                    score: winningScore
                };
            }
            if (project.id === losingProject.id) {
                return {
                    ...losingProject,
                    score: losingScore
                };
            }
            return project;
        });
        const _winningProject = {
            ..._projects.find(p => p.id === winningProject.id),
            isRight,
        };
        return {
            winningProject: _winningProject,
            projects: _projects,
        }
    })
}))
