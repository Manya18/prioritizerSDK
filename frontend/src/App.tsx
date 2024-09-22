import React, { useEffect, useState } from "react";
import "./App.css";
import Survey from "./components/Survey";
import KanoTable from "./components/KanoTable";
import KanoBarChart from "./components/KanoBarChart";
import { Answer, Choice, Feature, ResultsType } from "./types/types";

function App() {
  const [surveyResults, setSurveyResults] = useState<Choice[]>([]);
  const [features, setFeatures] = useState([]);
  const [error, setError] = useState<any>(null);

  const onSubmit = (results: Choice[]) => {
    setSurveyResults(results);
    createChoices(results);
  };



  const createChoices = (choicesArray: Choice[]) => {
    choicesArray.map(async (f: Choice) => {
      try {
        const response = await fetch("http://localhost:8080/api/choice", {
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

        setSurveyResults(data);
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

      <KanoTable
        choices={surveyResults}
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
          'Questionabie': { backgroundColor: 'lightgreen' },
          'Attractive': { backgroundColor: 'lightgreen' },
          'Indifferent': { backgroundColor: 'lightgreen' },
          'Reverse': { backgroundColor: 'lightgreen' }
        }}
      />

      <KanoBarChart results={surveyResults} features={features} />
    </div>
  );
}

export default App;
