import { ResultsType, Answer } from "../types/types";

export const convertChoicesToResults = (
    choices: Array<{
      id: number;
      priority: number;
      feature_id: number;
      is_positive: boolean;
    }>
  ): ResultsType => {
    return choices.reduce((acc: ResultsType, choice) => {
      const { feature_id, is_positive, id, priority } = choice;

      if (!acc[feature_id]) {
        acc[feature_id] = {};
      }

      const question_id = is_positive ? 1 : 0;

      const answer: Answer = {
        id,
        title: is_positive ? "Positive" : "Negative",
        priority,
      };

      acc[feature_id][question_id] = answer;

      return acc;
    }, {});
  };