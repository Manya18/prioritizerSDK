import React, { useState } from 'react'; 
import './Survey.css';
import { Feature, Question, Answer, ResultsType } from '../types/types';

const Survey = ({ features, onSubmit }: { features: Feature[], onSubmit: (results: ResultsType) => void }) => {

  const [results, setResults] = useState<ResultsType>({});

  const questions: Question[] = [
    {
      id: 0,
      title: "Как вы отнесётесь к тому, что эта функция будет добавлена?",
      answers: [
        {
          id: 0,
          title: "Мне это понравится",
          priority: 4
        },
        {
          id: 1,
          title: "Это ожидаемо",
          priority: 2
        },
        {
          id: 2,
          title: "Мне все равно",
          priority: 0
        },
        {
          id: 3,
          title: "Мне это не нужно, но мешать не будет",
          priority: -1
        },
        {
          id: 4,
          title: "Мне это не нужно и будет мешать",
          priority: -2
        },
      ]
    },
    {
      id: 1,
      title: "Как вы отнесётесь к тому, что эта функция НЕ будет добавлена?",
      answers: [
        {
          id: 0,
          title: "Мне это понравится",
          priority: -2
        },
        {
          id: 1,
          title: "Это ожидаемо",
          priority: -1
        },
        {
          id: 2,
          title: "Мне все равно",
          priority: 0
        },
        {
          id: 3,
          title: "Мне это не нужно, но мешать не будет",
          priority: 2
        },
        {
          id: 4,
          title: "Мне это не нужно и будет мешать",
          priority: 4
        },
      ]
    }
  ]

  const onClick = () => {
    onSubmit(results);
  }

  const handleChange = (feature: Feature, question: Question, answer: Answer) => {
    setResults(prev => ({
      ...prev,
      [feature.id] : {
        ...prev[feature.id],
        [question.id]: answer
      }
    }))
  }

  return (
    <div className="Survey">
      <header className='Survey-header'>
        <h1 className='Survey-title'>Пройдите опрос</h1>
      </header>
      <main className='Survey-content'>
        {features.map((f: Feature) => (
          <div className='feature'>
            <h3 key={f.id} className='feature'>{f.title}</h3>
            {questions.map((q: Question) => (
              <div key={f.id + '_' + q.id} className='Survey-question'>
                <h2 className='Survey-question-title'>{q.title}</h2>
                <div className='Survey-answers'>
                  {q.answers.map((a: Answer) => (
                    <div className='Survey-answer' key={f.id + '_' + q.id + '_'+ a.id}>
                      <input
                        type="radio"
                        id={`answer-${f.id + '_' + q.id + '_'+ a.id}`}
                        name={f.id + '_' + q.id}
                        onChange={(e) => handleChange(f, q, a)}
                      />
                      <label htmlFor={`answer-${f.id + '_' + q.id + '_'+ a.id}`}>{a.title}</label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
        <button className='Survey-submitButton' type='submit' onClick={onClick}>Отправить</button>
      </main>
    </div>
  );
};

export default Survey;
