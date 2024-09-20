import React from 'react';
import './App.css';
import SurveyPopup from './components/SurveyPopup';

type survey = {
  id: number,
  title: string,
  questions: question[],
}

type question = {
  id: number
  title: string,
  type: string
  answers: answer[]
}
type answer = {
  id: number,
  title: string,
}

function App() {
  const onSubmit = () => {
    console.log('aaaaa')
  }
  const survey: survey = {
    id: 0,
    title: 'Это первый опрос в моей жизни',
    questions: [{
      id: 0,
      title: 'Как вам наши новые функции?',
      type: 'radio',
      answers: [
        {
          id: 0,
          title: 'ok'
        },
        {
          id: 1,
          title: 'normal'
        },
        {
          id: 2,
          title: 'trouble'
        },
        {
          id: 3,
          title: 'trash'
        }
      ]
    }]
  }

  return (
    <div className="App">
      <SurveyPopup survey={survey} onSubmit={onSubmit}/>
    </div>
  );
}

export default App;
