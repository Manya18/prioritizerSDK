import React, { useEffect, useState } from "react";
import "./App.css";
import Survey from "./components/Survey";
import KanoTable from "./components/KanoTable";
import KanoBarChart from "./components/KanoBarChart";
import { Answer, Choice, Feature, ResultsType } from "./types/types";
import CreateSurvey from "./components/CreateSurvey";
import MoSCoWTable from "./components/MoSCoW";

function App() {
  const survey_id = "7";

  return (
    <div className="App">
      <Survey
        survey_id={survey_id}
        buttonBackNextStyle={{ backgroundColor: "lightgray", color: "black" }}
        buttonStyle={{ backgroundColor: "blue", color: "white" }}
      />

      <KanoTable
        survey_id={survey_id}
        tableStyle={{
          width: '100%',
          backgroundColor: '#f8f8f8',
          color: '#333',
          textAlign: 'center',
          fontSize: '16px'
        }}
      />
      <MoSCoWTable
      survey_id={survey_id}
        tableStyle={{
          width: '100%',
          backgroundColor: '#f8f8f8',
          color: '#333',
          textAlign: 'center',
          fontSize: '16px'
        }}
      />
      <KanoBarChart survey_id={survey_id} />
      <CreateSurvey></CreateSurvey>
    </div>
  );
}

export default App;
