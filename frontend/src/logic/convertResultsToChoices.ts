import { ResultsType, Answer, Choice } from "../types/types";

export const convertResultsToChoicesArray = (results: ResultsType): Choice[] => {
    const array: Choice[] = [];
    for (const featureId in results) {
        const questions = results[featureId];

        for (const questionId in questions) {
            const answer = questions[questionId];

            if (answer) {
                array.push({
                    priority: answer.priority,
                    feature_id: Number(featureId),
                    is_positive: questionId === '1'
                });
            }
        }
    }
    return array;
};