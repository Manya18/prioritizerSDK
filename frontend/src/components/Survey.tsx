import React, { useState } from 'react';
import './Survey.css';
import { Feature, Question, Answer, ResultsType, Choice } from '../types/types';

type SurveyProps = {
  features: Feature[];
  onSubmit: (results: Choice[]) => void;
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
  const [results, setResults] = useState<Choice[]>([]);
  const [positive, setPositive] = useState(0);
  const [negative, setNegative] = useState(0);
  const survey_id = 1;

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

  const handleChange = (question_id: number, answer: Answer) => {
    if (question_id === 0) setPositive(answer.priority)
    else setNegative(answer.priority)
  };

  const nextFeature = () => {
    setResults([...results, { positive: positive, negative: negative, feature_id: features[currentFeatureIndex].id!, survey_id: survey_id }]);
    if (currentFeatureIndex < features.length - 1) {
      setCurrentFeatureIndex(prev => prev + 1);
    } else {
      onSubmit([...results, { positive: positive, negative: negative, feature_id: features[currentFeatureIndex].id!, survey_id: survey_id }]);
      setCurrentFeatureIndex(0);
      setResults([]);
      window.location.reload();
    }
  };

  const previousFeature = () => {
    if (currentFeatureIndex > 0) {
      setCurrentFeatureIndex(prev => prev - 1);
    }
  };

  return (
    <div className="prioritizerSDK-container" style={{ borderColor, backgroundColor, color: textColor }}>
      <header className='prioritizerSDK-header' style={{ border: borderHeaderColor }}>
        <h1 className='prioritizerSDK-title'>Пройдите опрос</h1>
      </header>
      <main className='prioritizerSDK-content'>
        {features.length > 0 && (
          <div className='feature'>
            <h3 className='prioritizerSDK-feature'>{features[currentFeatureIndex].title}</h3>
            {questions.map((q: Question) => (
              <div key={q.id} className='prioritizerSDK-question'>
                <h2 className='prioritizerSDK-question-title'>{q.title}</h2>
                <div className='prioritizerSDK-answers'>
                  {q.answers.map((a: Answer) => {
                    return (
                      <div className='prioritizerSDK-answer' key={a.id}>
                        <input
                          type="radio"
                          id={`answer-${features[currentFeatureIndex].id}_${q.id}_${a.id}`}
                          name={`question_${q.id}`}
                          onChange={() => handleChange(q.id, a)}
                        />
                        <label htmlFor={`answer-${features[currentFeatureIndex].id}_${q.id}_${a.id}`}>{a.title}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="prioritizerSDK-buttons">
              {/* <button
                disabled={currentFeatureIndex === 0}
                className="Survey-backNextButton"
                onClick={previousFeature}
                style={buttonBackNextStyle}>
                Назад
              </button> */}
              <button
                className={currentFeatureIndex < features.length - 1 ? "prioritizerSDK-backNextButton" : "prioritizerSDK-submitButton"}
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
