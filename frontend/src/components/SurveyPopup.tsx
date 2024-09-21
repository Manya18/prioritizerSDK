import React, { useState } from 'react'; 
import './SurveyPopup.css';

type Survey = {
  id: number,
  title: string,
  questions: Question[],
}

type Question = {
  id: number,
  title: string,
  type: string,
  answers: Answer[],
}

type Answer = {
  id: number,
  title: string,
}

type AnswerWithImportance = {
  answerId: number,
  importance: number
}

// TODO: вынести варианты ответа и в зависимости от типа отрисовывать
const SurveyPopup = ({ survey, onSubmit }: { survey: Survey, onSubmit: () => void }) => {

  const [answers, setAnswers] = useState<{ [questionId: number]: AnswerWithImportance[] }>({});

  const handleChange = (questionId: number, answerId: number, checked: boolean) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers[questionId] || [];

      if (checked) {
        return {
          ...prevAnswers,
          [questionId]: [...updatedAnswers, { answerId, importance: 1 }]
        };
      } else {
        return {
          ...prevAnswers,
          [questionId]: updatedAnswers.filter((a) => a.answerId !== answerId)
        };
      }
    });
  };

  const handleImportanceChange = (questionId: number, answerId: number, importance: number) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers[questionId].map((a) =>
        a.answerId === answerId ? { ...a, importance } : a
      );
      return { ...prevAnswers, [questionId]: updatedAnswers };
    });
  };

  return (
    <div className="SurveyPopup">
      <header className='SurveyPopup-header'>
        <h1 className='SurveyPopup-title'>Это первый опрос в моей жизни</h1>
      </header>
      <main className='SurveyPopup-content'>
        {survey.questions.map((q: Question) => (
          <div key={q.id} className='SurveyPopup-question'>
            <h2 className='SurveyPopup-question-title'>{q.title}</h2>
            <div className='SurveyPopup-answers'>
              {q.answers.map((a: Answer) => (
                <div className='SurveyPopup-answer' key={a.id}>
                  <input
                    type="checkbox"
                    id={`answer-${a.id}`}
                    onChange={(e) => handleChange(q.id, a.id, e.target.checked)}
                  />
                  <label htmlFor={`answer-${a.id}`}>{a.title}</label>

                  {answers[q.id]?.some((ans) => ans.answerId === a.id) && (
                    <div className="SurveyPopup-importance">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <label key={level}>
                          <input
                            type="radio"
                            name={`importance-${a.id}`}
                            value={level}
                            checked={answers[q.id]?.find((ans) => ans.answerId === a.id)?.importance === level}
                            onChange={() => handleImportanceChange(q.id, a.id, level)}
                          />
                          {level}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        <button className='SurveyPopup-submitButton' type='submit' onClick={onSubmit}>Отправить</button>
      </main>
    </div>
  );
};

export default SurveyPopup;
