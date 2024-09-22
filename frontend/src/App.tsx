import React, { useEffect, useState } from "react";
import "./App.css";
import Survey from "./components/Survey";
import KanoTable from "./components/KanoTable";
import KanoBarChart from "./components/KanoBarChart";
import { Answer, Choice, Feature, ResultsType } from "./types/types";
import CreateSurvey from "./components/CreateSurvey";
import MoSCoWTable from "./components/MoSCoWTable";

function App() {
  const survey_id = "1";

  return (
    <div className="App">
      <Survey survey_id={survey_id} />

      <KanoTable survey_id={survey_id} />
      <MoSCoWTable survey_id={survey_id} />
      <KanoBarChart survey_id={survey_id} />
      <CreateSurvey></CreateSurvey>
    </div>
  );
}

export default App;
