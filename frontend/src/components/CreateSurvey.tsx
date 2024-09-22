import React, { useEffect, useState } from "react";
import { Feature } from "../types/types";
// import "./App.css";

const CreateSurvey = ({ onSubmit } : {onSubmit: (features: Feature[])=>void}) => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [featureName, setFeatureName] = useState<string>("");
  const [featureDesc, setFeatureDesc] = useState<string>("");
  const survey_id = 1;

  const addFeature = () => {
    if (featureName && featureDesc) {
      setFeatures([
        ...features,
        { title: featureName, description: featureDesc, survey_id: survey_id },
      ]);
    }
  };


  return (
    <div className="CreateSurvey">
      <header className="Survey-header">
        <h1 className="Survey-title">Создать опрос</h1>
      </header>
      <main>
        {}
        <div className="feature">
          <label className="">Название фичи</label>
          <input
            type="text"
            className=""
            value={featureName}
            onChange={(e) => setFeatureName(e.target.value)}
          ></input>
        </div>
        <div className="feature">
          <label className="">Описание фичи</label>
          <input
            type="text"
            className=""
            value={featureDesc}
            onChange={(e) => setFeatureDesc(e.target.value)}
          ></input>
        </div>
        <button className="createSurvey-button" onClick={addFeature}>
          Добавить
        </button>
        <button className="createSurvey-button" onClick={() => onSubmit(features)}>
          Создать
        </button>
      </main>
    </div>
  );
};

export default CreateSurvey;
