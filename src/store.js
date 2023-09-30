import {create} from 'zustand'
import projects from "./projects.json";
import EloRank from "elo-rank";

const INITIAL_SCORE = 1500;
const rank = new EloRank(50);

export const useStore = create((set) => ({
    projects: projects.map((project, idx) => ({
        ...project,
        id: idx + 1,
        score: INITIAL_SCORE,
    })),
    visibleProjects: [],
    setVisibleProjects: (visibleProjects) => set({visibleProjects}),
    vote: (winningProject, losingProject) => set((state) => {
        const expectedWinningScore = rank.getExpected(winningProject.score, losingProject.score);
        const expectedLosingScore = rank.getExpected(losingProject.score, winningProject.score);
        return {
            projects: state.projects.map(project => {
                if (project.id === winningProject.id) {
                    return {
                        ...winningProject,
                        score: rank.updateRating(expectedWinningScore, 1, winningProject.score)
                    };
                }
                if (project.id === losingProject.id) {
                    return {
                        ...losingProject,
                        score: rank.updateRating(expectedLosingScore, 0, losingProject.score)
                    };
                }
                return project;
            })
        }
    })
}))
