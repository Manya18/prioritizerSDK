export type Feature = {
  id: number;
  title: string;
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
  priority: number;
  feature_id: number;
  is_positive: boolean;
};