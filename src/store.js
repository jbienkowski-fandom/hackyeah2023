import { create } from 'zustand'
import projects from "./projects.json";
import EloRank from "elo-rank";

const rank = new EloRank(50);

export const useStore = create((set) => ({
    projects,
    vote: (winningProject, losingProject) => set((state) => {
        const expectedWinningScore = rank.getExpected(winningProject.score, losingProject.score);
        const expectedLosingScore = rank.getExpected(losingProject.score, winningProject.score);
        return {
            projects: state.projects.map(project => {
                if (project.tytul === winningProject.tytul) {
                    return {
                        ...winningProject,
                        score: rank.updateRating(expectedWinningScore, 1, winningProject.score)
                    };
                }
                if (project.tytul === losingProject.tytul) {
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
