import React, { useEffect, useState } from 'react';
import { Choice } from '../types/types';
import './KanoBarChart.css';

const classifyKano = (functional: number, dysfunctional: number): number => {
  if ((functional === 4 && dysfunctional === -2) || (functional === -2 && dysfunctional === 4)) return 0;
  if (functional === 4 && dysfunctional <= 2) return 1;
  if (functional === 4 && dysfunctional === 4) return 2;
  if (functional <= 2 && dysfunctional === 4) return 3;
  if ((functional <= 2 && dysfunctional === 4) || (functional === -2 && dysfunctional <= 2)) return 4;
  return 5;
};

const categories = ['Questionable', 'Attractive', 'Performance', 'Must-be', 'Reverse', 'Indifferent'];

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
  return categories.reduce((sum, count) => sum + count, 0);
};

const KanoBarChart = ({ survey_id }: { survey_id: string }) => {
  const [choices, setChoices] = useState<Choice[]>([]);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/choice`);
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
  }, []);

  const categoryMap = classifyChoices(choices);

  return (
    <div className="kano-bar-chart">
      <h2>Распределение функций по модели Кано</h2>
      {features.map((feature) => {
        const categoriesForFeature = categoryMap[(feature as any).id!] || [0, 0, 0, 0, 0, 0];
        const totalResponses = summCat(categoriesForFeature);

        return (
          <div key={(feature as any).id} className="kano-feature-row">
            <div className="kano-feature-title">{(feature as any).title}</div>
            <div className="kano-bar">
              {categories.map((cat, index) => {
                const count = categoriesForFeature[index];
                const percentage = totalResponses > 0 ? (count * 100) / totalResponses : 0;

                return (
                  <div
                    key={cat}
                    className={`kano-bar-segment kano-color-${index}`}
                    style={{ width: `${percentage.toFixed(2)}%` }}
                  >
                    {percentage > 0 ? `${percentage.toFixed(2)}%` : ''}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="kano-legend">
        {categories.map((cat, index) => (
          <div key={cat} className="kano-legend-item">
            <div className={`kano-legend-color kano-color-${index}`}></div>
            <span>{cat}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanoBarChart;
