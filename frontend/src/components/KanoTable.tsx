import React, { useEffect, useState } from "react";
import "./KanoTable.css";
import { Choice } from "../types/types";

const classifyKano = (functional: number, dysfunctional: number): number => {
  if (
    (functional === 4 && dysfunctional === -2) ||
    (functional === -2 && dysfunctional === 4)
  )
    return 0;
  if (functional === 4 && dysfunctional <= 2) return 1;
  if (functional === 4 && dysfunctional === 4) return 2;
  if (functional <= 2 && dysfunctional === 4) return 3;
  if (
    (functional <= 2 && dysfunctional === 4) ||
    (functional === -2 && dysfunctional <= 2)
  )
    return 4;
  return 5;
};

const category = [
  "Questionabie",
  "Attractive",
  "Performance",
  "Must-be",
  "Reverse",
  "Indifferent",
];

const classifyChoices = (choices: Choice[]): { [key: number]: number[] } => {
  const featureMap: { [key: number]: number[] } = {};
  choices.forEach((choice) => {
    const curCategory = classifyKano(choice.positive, choice.negative);

    if (!featureMap[choice.feature_id]) {
      featureMap[choice.feature_id] = [0, 0, 0, 0, 0, 0];
    }
    featureMap[choice.feature_id][curCategory]++;
  });

  return featureMap;
};

const summCat = (categories: number[]) => {
  return categories.reduce((sum, value) => sum + value, 0);
};

const KanoTable = ({
  survey_id,
}: {
  survey_id: string;
}) => {
  const [choices, setChoices] = useState<Choice[]>([]);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/choice`
        );
        if (!response.ok) {
          throw new Error("Trouble");
        }
        const data = await response.json();
        setChoices(data);
      } catch (error) {
        throw new Error("Trouble");
      }
    };

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

    fetchResults();
    fetchFeatures();
  }, [survey_id]);

  const categoryMap = classifyChoices(choices);
  return (
    <div className="kano-table">
      <h2>Таблица по модели Кано</h2>
      <table>
        <thead>
          <tr>
            <th>Функция</th>
            <th>Важные</th>
            <th>Обязательные</th>
            <th>Интересные</th>
            <th>Сомнительные</th>
            <th>Безразличные</th>
            <th>Противоречивые</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature) => {
            const categories = categoryMap[(feature as any).id!] || [];

            return (
              <tr key={(feature as any).id}>
                <td>{(feature as any).title}</td>
                {category.map((cat, index) => (
                  <td
                    key={index}
                    className={
                      Math.max(...categories) === categories[index] ? "highlight" : ""
                    }
                  >
                    {((categories[index] * 100) / summCat(categories)).toFixed(
                      2
                    )}
                    %
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default KanoTable;
