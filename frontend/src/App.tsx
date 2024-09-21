import React from 'react';
import './App.css';
import Survey from './components/Survey';
import KanoTable from './components/KanoTable';
import KanoBarChart from './components/KanoBarChart';
import { Answer, Feature } from './types/types';

type ResultsType = {
  [feature_id: number]: {
    [question_id: number]: Answer;
  }
}

function App() {
  const [surveyResults, setSurveyResults] = React.useState<ResultsType>({});

  const onSubmit = (results: ResultsType) => {
    setSurveyResults(results);
  }

  const features: Feature[] = [
    {
      id: 0,
      title: 'Функция: Строка поиска'
    },
    {
      id: 1,
      title: 'Функция: Тёмная тема'
    },
  ];

  return (
    <div className="App">
      <Survey
        features={features}
        onSubmit={onSubmit}
        buttonBackNextStyle={{ backgroundColor: 'lightgray', color: 'black' }}
        buttonStyle={{ backgroundColor: 'blue', color: 'white' }}
      />

      <KanoTable results={surveyResults} features={features} />
      <KanoBarChart results={surveyResults} features={features} />
    </div>
  );
}

export default App;
