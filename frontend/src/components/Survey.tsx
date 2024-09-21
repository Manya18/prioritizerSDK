import React, { useState } from 'react';
import './Survey.css';
import { Feature, Question, Answer, ResultsType } from '../types/types';

type SurveyProps = {
  features: Feature[];
  onSubmit: (results: ResultsType) => void;
  borderColor?: string;
  borderHeaderColor?: string;
  buttonBackNextStyle?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  backgroundColor?: string;
  textColor?: string;
};

const Survey: React.FC<SurveyProps> = ({
  features,
  onSubmit,
  borderColor,
  borderHeaderColor,
  buttonBackNextStyle,
  buttonStyle,
  backgroundColor = '#fff',
  textColor = '#000',
}) => {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [results, setResults] = useState<ResultsType>({});

  const questions: Question[] = [
    {
      id: 0,
      title: "Как вы отнесётесь к тому, что эта функция будет добавлена?",
      answers: [
        { id: 0, title: "Мне это понравится", priority: 4 },
        { id: 1, title: "Это ожидаемо", priority: 2 },
        { id: 2, title: "Мне все равно", priority: 0 },
        { id: 3, title: "Мне это не нужно, но мешать не будет", priority: -1 },
        { id: 4, title: "Мне это не нужно и будет мешать", priority: -2 },
      ],
    },
    {
      id: 1,
      title: "Как вы отнесётесь к тому, что эта функция НЕ будет добавлена?",
      answers: [
        { id: 0, title: "Мне это понравится", priority: -2 },
        { id: 1, title: "Это ожидаемо", priority: -1 },
        { id: 2, title: "Мне все равно", priority: 0 },
        { id: 3, title: "Мне это не нужно, но мешать не будет", priority: 2 },
        { id: 4, title: "Мне это не нужно и будет мешать", priority: 4 },
      ],
    },
  ];

  const handleChange = (feature: Feature, question: Question, answer: Answer) => {
    setResults(prev => ({
      ...prev,
      [feature.id]: {
        ...prev[feature.id],
        [question.id]: answer,
      },
    }));
  };

  const nextFeature = () => {
    if (currentFeatureIndex < features.length - 1) {
      setCurrentFeatureIndex(prev => prev + 1);
    } else {
      onSubmit(results); 
    }
  };

  const previousFeature = () => {
    if (currentFeatureIndex > 0) {
      setCurrentFeatureIndex(prev => prev - 1);
    }
  };

  return (
    <div className="Survey" style={{ borderColor, backgroundColor, color: textColor }}>
      <header className='Survey-header' style={{ border: borderHeaderColor }}>
        <h1 className='Survey-title'>Пройдите опрос</h1>
      </header>
      <main className='Survey-content'>
        {features.length > 0 && (
          <div className='feature'>
            <h3 className='Survey-feature'>{features[currentFeatureIndex].title}</h3>
            {questions.map((q: Question) => (
              <div key={q.id} className='Survey-question'>
                <h2 className='Survey-question-title'>{q.title}</h2>
                <div className='Survey-answers'>
                  {q.answers.map((a: Answer) => {
                    const checked = results[features[currentFeatureIndex].id]?.[q.id]?.id === a.id;
                    return (
                      <div className='Survey-answer' key={a.id}>
                        <input
                          type="radio"
                          id={`answer-${features[currentFeatureIndex].id}_${q.id}_${a.id}`}
                          name={`question_${q.id}`}
                          onChange={() => handleChange(features[currentFeatureIndex], q, a)}
                          checked={checked}
                        />
                        <label htmlFor={`answer-${features[currentFeatureIndex].id}_${q.id}_${a.id}`}>{a.title}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="Survey-buttons">
              <button
                disabled={currentFeatureIndex === 0}
                className="Survey-backNextButton"
                onClick={previousFeature}
                style={buttonBackNextStyle}>
                Назад
              </button>
              <button
                className={currentFeatureIndex < features.length - 1 ? "Survey-backNextButton" : "Survey-submitButton"}
                onClick={nextFeature} style={buttonStyle}>
                {currentFeatureIndex < features.length - 1 ? 'Далее' : 'Отправить'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Survey;
