export type Survey = {
  id?: number;
  title: string
};

export type Feature = {
  id?: number;
  title: string;
  description: string;
  survey_id: number
};

export type Question = {
  id: number;
  title: string;
  answers: Answer[]
};

export type Answer = {
  id: number;
  title: string;
  priority: number;
};

export type ResultsType = {
  [feature_id: number]: {
    [question_id: number]: Answer;
  }
}

export type Choice = {
  id?: number;
  positive: number;
  negative: number;
  feature_id: number;
  survey_id: number
};