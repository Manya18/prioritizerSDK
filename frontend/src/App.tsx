import React, { useEffect, useState } from "react";
import "./App.css";
import Survey from "./components/Survey";
import KanoTable from "./components/KanoTable";
import KanoBarChart from "./components/KanoBarChart";
import { Answer, Feature, ResultsType } from "./types/types";

function App() {
  const [surveyResults, setSurveyResults] = useState<ResultsType>({});
  const [features, setFeatures] = useState([]);
  const [error, setError] = useState<any>(null);

  const onSubmit = (results: ResultsType) => {
    setSurveyResults(results);
  };

  const convertChoicesToResults = (
    choices: Array<{
      id: number;
      priority: number;
      feature_id: number;
      is_positive: boolean;
    }>
  ): ResultsType => {
    return choices.reduce((acc: ResultsType, choice) => {
      const { feature_id, is_positive, id, priority } = choice;

      if (!acc[feature_id]) {
        acc[feature_id] = {};
      }

      const question_id = is_positive ? 1 : 0;

      const answer: Answer = {
        id,
        title: is_positive ? "Positive" : "Negative",
        priority,
      };

      acc[feature_id][question_id] = answer;

      return acc;
    }, {});
  };

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/feature");
        if (!response.ok) {
          throw new Error("Trouble");
        }
        const data = await response.json();
        setFeatures(data);
      } catch (error) {
        setError(error);
      }
    };

    const fetchResults = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/choice");
        if (!response.ok) {
          throw new Error("Trouble");
        }
        const data = await response.json();

        setSurveyResults(convertChoicesToResults(data));
      } catch (error) {
        setError(error);
      }
    };
    fetchResults();
    fetchFeatures();
  }, []);

  return (
    <div className="App">
      <Survey
        features={features}
        onSubmit={onSubmit}
        buttonBackNextStyle={{ backgroundColor: "lightgray", color: "black" }}
        buttonStyle={{ backgroundColor: "blue", color: "white" }}
      />

      <KanoTable results={surveyResults} features={features} />
      <KanoBarChart results={surveyResults} features={features} />
    </div>
  );
}

export default App;
