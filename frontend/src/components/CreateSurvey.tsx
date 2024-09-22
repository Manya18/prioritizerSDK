import React, { useEffect, useState } from "react";
import { Feature } from "../types/types";
import './CreateSurvey.css';

const CreateSurvey = () => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [featureName, setFeatureName] = useState<string>("");
  const [featureDesc, setFeatureDesc] = useState<string>("");
  const [surveyTitle, setSurveyTitle] = useState<string>("");

  const onSubmit = async (surveyTitle: string, featuresArray: Feature[]) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/survey`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: surveyTitle }),
    });
    const data = await response.json();
    featuresArray.forEach(async (f: Feature) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/feature`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...f, survey_id: data.id }),
        });
        if (!response.ok) throw new Error("Not ok");
      } catch (error) {
        console.error(error);
      }
    });
  };

  const addFeature = () => {
    if (featureName && featureDesc) {
      setFeatures([...features, { title: featureName, description: featureDesc }]);
      setFeatureName('');
      setFeatureDesc('');
    }
  };

  const createSurvey = () => {
    if (featureName && featureDesc) {
      onSubmit(surveyTitle ? surveyTitle : 'Заголовок опроса', [...features, { title: featureName, description: featureDesc }]);
    } else {
      onSubmit(surveyTitle ? surveyTitle : 'Заголовок опроса', features);
    }
    setFeatures([]);
  };

  return (
    <div className="prioritizerSDK-container">
      <header className="prioritizerSDK-header">
        <h1 className="prioritizerSDK-title">Создать опрос</h1>
      </header>
      <main className="prioritizerSDK-content">
        <div className="input">
          <label className="input-label">Название опроса</label>
          <input
            type="text"
            className="input-field"
            value={surveyTitle}
            onChange={(e) => setSurveyTitle(e.target.value)}
          />
        </div>
        <div className="feature-create">
          <div className="feature-input-group">
            <label className="feature-label">Название функции</label>
            <input
              type="text"
              className="feature-input"
              value={featureName}
              onChange={(e) => setFeatureName(e.target.value)}
            />
            <label className="feature-label">Описание функции</label>
            <input
              type="text"
              className="feature-input"
              value={featureDesc}
              onChange={(e) => setFeatureDesc(e.target.value)}
            />
          </div>
          <button className="prioritizerSDK-button small" onClick={addFeature}>
            Добавить функцию
          </button>
        </div>
        {features.length > 0 && (
          <ul className="feature-list">
            {features.map((f, index) => (
              <li key={index} className="feature-item">{f.title}</li>
            ))}
          </ul>
        )}
        <button className="prioritizerSDK-button centred" onClick={createSurvey}>
          Создать
        </button>
      </main>
    </div>
  );
};

export default CreateSurvey;