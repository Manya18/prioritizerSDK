import React, { useEffect, useState } from "react";
import "./App.css";
import Survey from "./components/Survey";
import KanoTable from "./components/KanoTable";
import KanoBarChart from "./components/KanoBarChart";
import { Answer, Choice, Feature, ResultsType } from "./types/types";
import { convertChoicesToResults } from "./logic/convertChoicesToResults";
import { convertResultsToChoicesArray } from "./logic/convertResultsToChoices";

function App() {
  const [surveyResults, setSurveyResults] = useState<ResultsType>({});
  const [features, setFeatures] = useState([]);
  const [error, setError] = useState<any>(null);

  const onSubmit = (results: ResultsType) => {
    sendChoices(convertResultsToChoicesArray(results));
    fetchResults();
    window.location.reload();
  };

  const sendChoices = async (choices: Choice[]) => {
    for(const choice of choices){
      try {
        const response = await fetch('http://localhost:8080/api/choice', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(choice)
      });
  
      if (!response.ok) {
          throw new Error('Ошибка при отправке данных на сервер');
      }
  
      const result = await response.json();
      console.log('Данные успешно отправлены:', result);
      } catch (error: any) {
        console.error('Ошибка:', error);
      }
  
    }
  }
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

  useEffect(() => {
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

      <KanoTable
        results={surveyResults}
        features={features}
        tableStyle={{
          width: '100%',
          backgroundColor: '#f8f8f8',
          color: '#333',
          textAlign: 'center',
          fontSize: '16px'
        }}
        cellStyles={{
          'Must-be': { backgroundColor: 'lightgreen' },
          'Performance': { backgroundColor: 'lightgreen' },
          'Excitement': { backgroundColor: 'lightgreen' },
          'Indifferent': { backgroundColor: 'lightgreen' },
          'Reverse': { backgroundColor: 'lightgreen' }
        }}
      />

      <KanoBarChart results={surveyResults} features={features} />
    </div>
  );
}

export default App;
