import React, { useEffect, useState } from "react";
import { Feature } from "../types/types";

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
    featuresArray.map(async (f: Feature) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/feature`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...f, ...{ survey_id: data.id } }),
        });
        if (!response.ok) throw new Error("Not ok");
      } catch (error) {
        console.error(error);
      }
    });
  }


  const addFeature = () => {
    if (featureName && featureDesc) {
      setFeatures([...features, { title: featureName, description: featureDesc}]);
      setFeatureName('');
      setFeatureDesc('');
    }
  };

  const createSurvey = () => {
    if(featureName && featureDesc){
        onSubmit(surveyTitle ? surveyTitle : 'Заголовок опроса', [...features, { title: featureName, description: featureDesc}])
    }
    onSubmit(surveyTitle ? surveyTitle : 'Заголовок опроса', features)
    setFeatures([]);
  }

  return (
    <div className="prioritizerSDK-container">
      <header className="prioritizerSDK-header">
        <h1 className="prioritizerSDK-title">Создать опрос</h1>
      </header>
      <main className="prioritizerSDK-content">
      <div className="input">
          <label className="">Название опроса</label>
          <input
            type="text"
            className=""
            value={surveyTitle}
            onChange={(e) => setSurveyTitle(e.target.value)}
          ></input>
        </div>
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
        { features.length > 0 && <ul>
            {features.map(f => (
                <li className="">{f.title}</li>
            ))}
        </ul>}
        <button className="prioritizerSDK-button" onClick={addFeature}>
          Добавить
        </button>
        <button className="prioritizerSDK-button centred" onClick={createSurvey}>
          Создать
        </button>
      </main>
    </div>
  );
};

export default CreateSurvey;
