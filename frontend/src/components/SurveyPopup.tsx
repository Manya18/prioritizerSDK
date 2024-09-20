import React, { useState } from 'react';
import './SurveyPopup.css';

type Survey = {
  id: number,
  title: string,
  questions: Question[],
}

type Question = {
  id: number
  title: string,
  type: string
  answers: Answer[]
}
type Answer = {
  id: number,
  title: string,
}
// TODO: вынести варианты ответа и в зависимости от типа отрисовывать
const SurveyPopup = ({ survey, onSubmit }: { survey : Survey, onSubmit: ()=> void }) => {

  const [answers, setAnswers] = useState<{[key: number] : string}>({});
  const handleChange = (question_id: number, value: string) => {
    setAnswers((prevAnswers) => ({...prevAnswers, [question_id] : value}))
  }

  return (
    <div className="SurveyPopup">
      <header className='SurveyPopup-header'>
        <h1 className='SurveyPopup-title'>Это первый опрос в моей жизни</h1>
      </header>
      <main className='SurveyPopup-content'>
        {survey.questions.map((q: Question)=>(
          <div key={q.id} className='SurveyPopup-question'>
            <h2 className='SurveyPopup-question-title'>{ q.title }</h2>
            <div className='SurveyPopup-answers'>
              {q.answers.map((a: Answer)=>(
                <div className='SurveyPopup-answer' key={a.id}>
                  <input 
                    type={q.type} 
                    name={q.title} 
                    value={a.id}
                    onChange={(e) => handleChange(q.id, e.target.value)}
                  ></input>
                  <label htmlFor={q.title}>{a.title}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button className='SurveyPopup-submitButton' type='submit' onClick={onSubmit}>Отправить</button>
      </main>
    </div>
  );
}

export default SurveyPopup;
