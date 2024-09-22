import React, { useEffect, useState } from 'react';
import './Survey.css';
import { Feature, Question, Answer, ResultsType, Choice } from '../types/types';

type SurveyProps = {
  survey_id: string,
};

const Survey: React.FC<SurveyProps> = ({
  survey_id,
}) => {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [results, setResults] = useState<Choice[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: { positive?: number; negative?: number } }>({});
  const [isOpen, setIsOpen] = useState(false);
  const [features, setFeatures] = useState([]);
  const [unansweredQuestions, setUnansweredQuestions] = useState<boolean[]>([]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/feature/${survey_id}`);
        if (!response.ok) {
          throw new Error("Trouble");
        }
        const data = await response.json();
        setFeatures(data);
      } catch (error) {
        throw new Error("Trouble");
      }
    };
    fetchFeatures();
  }, [survey_id]);

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
    const newAnswers = { ...selectedAnswers };
    if (!newAnswers[currentFeatureIndex]) newAnswers[currentFeatureIndex] = {};

    if (question_id === 0) newAnswers[currentFeatureIndex].positive = answer.priority;
    else newAnswers[currentFeatureIndex].negative = answer.priority;

    setSelectedAnswers(newAnswers);
  };

  const createChoices = (choicesArray: Choice[]) => {
    choicesArray.map(async (f: Choice) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/choice`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(f),
        });
        if (!response.ok) throw new Error("Not ok");
      } catch (error) {
        console.error(error);
      }
    });
  };

  const nextFeature = () => {
    const currentSelected = selectedAnswers[currentFeatureIndex] || {};

    const isAnswered = questions.every((q) => {
      if (q.id === 0) return currentSelected.positive !== undefined;
      if (q.id === 1) return currentSelected.negative !== undefined;
      return false;
    });

    if (!isAnswered) {
      setUnansweredQuestions((prev) => {
        const newUnanswered = [...prev];
        newUnanswered[currentFeatureIndex] = true;
        return newUnanswered;
      });
      return;
    }

    setUnansweredQuestions((prev) => {
      const newUnanswered = [...prev];
      newUnanswered[currentFeatureIndex] = false;
      return newUnanswered;
    });

    setResults([...results, {
      positive: currentSelected.positive || 0,
      negative: currentSelected.negative || 0,
      feature_id: (features[currentFeatureIndex] as any).id!,
      survey_id: Number(survey_id),
    }]);

    if (currentFeatureIndex < features.length - 1) {
      setCurrentFeatureIndex((prev) => prev + 1);
    } else {
      createChoices([...results, {
        positive: currentSelected.positive || 0,
        negative: currentSelected.negative || 0,
        feature_id: (features[currentFeatureIndex] as any).id,
        survey_id: Number(survey_id)
      }]);
      setCurrentFeatureIndex(0);
      setResults([]);
      setSelectedAnswers({});
      setUnansweredQuestions([]);
      window.location.reload();
    }
  };

  const previousFeature = () => {
    if (currentFeatureIndex > 0) {
      setCurrentFeatureIndex(prev => prev - 1);
    }
  };

  return (
    <div className="prioritizerSDK-container">
      <header className='prioritizerSDK-header'>
        <h1 className='prioritizerSDK-title'>Пройдите опрос</h1>
      </header>
      <main className='prioritizerSDK-content'>
        {features.length > 0 && (
          <div className='feature'>
            <h3 className='prioritizerSDK-feature' onClick={() => setIsOpen(!isOpen)}>
              {(features[currentFeatureIndex] as any).title} {isOpen ? '↑' : '↓'}
            </h3>

            <div className={`prioritizerSDK-decription ${isOpen ? 'open' : ''}`}>
              <p>{(features[currentFeatureIndex] as any).description}</p>
            </div>

            {questions.map((q: Question) => {
              const currentSelected = selectedAnswers[currentFeatureIndex] || {};
              const hasAnswer = (q.id === 0 && currentSelected.positive !== undefined) ||
                (q.id === 1 && currentSelected.negative !== undefined);
              const isUnanswered = unansweredQuestions[currentFeatureIndex] || false;

              return (
                <div key={q.id} className={`prioritizerSDK-question ${isUnanswered && !hasAnswer ? 'unanswered' : ''}`}>
                  <h2 className='prioritizerSDK-question-title'>{q.title}</h2>
                  <div className='prioritizerSDK-answers'>
                    {q.answers.map((a: Answer) => {
                      const isChecked = (q.id === 0 && currentSelected.positive === a.priority) ||
                        (q.id === 1 && currentSelected.negative === a.priority);
                      return (
                        <div className='prioritizerSDK-answer' key={a.id}>
                          <input
                            type="radio"
                            id={`answer-${(features[currentFeatureIndex] as any).id}_${q.id}_${a.id}`}
                            name={`question_${q.id}`}
                            checked={isChecked}
                            onChange={() => handleChange(q.id, a)}
                          />
                          <label htmlFor={`answer-${(features[currentFeatureIndex] as any).id}_${q.id}_${a.id}`}>{a.title}</label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <div className="prioritizerSDK-buttons">
              <button
                disabled={currentFeatureIndex === 0}
                className="prioritizerSDK-backNextButton"
                onClick={previousFeature}>
                Назад
              </button>
              <button
                className={currentFeatureIndex < features.length - 1 ? "prioritizerSDK-backNextButton" : "prioritizerSDK-submitButton"}
                onClick={nextFeature}>
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
