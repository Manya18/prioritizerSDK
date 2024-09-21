import React from 'react';
import './App.css';
import Survey from './components/Survey';
import { Answer, Feature } from './types/types';

type ResultsType = {
  [feature_id: number]: {
    [question_id: number]: Answer;
  }
}

function App() {
  const onSubmit = (results: ResultsType) => {
    console.log(results)
  }

  const features: Feature[] = [
    {
      id: 0,
      title: 'Строка поиска'
    },
    {
      id: 1,
      title: 'Тёмная тема'
    },
  ]

  return (
    <div className="App">
      <Survey features={features} onSubmit={onSubmit}/>
    </div>
  );
}

export default App;
