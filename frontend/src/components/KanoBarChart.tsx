import React, { useEffect, useState } from 'react';
import { Choice, Feature } from '../types/types';

const classifyKano = (functional: number, dysfunctional: number): number => {
  if ((functional === 4 && dysfunctional === -2) || (functional === -2 && dysfunctional === 4)) return 0; // Questionable
  if (functional === 4 && dysfunctional <= 2) return 1; // Attractive
  if (functional === 4 && dysfunctional === 4) return 2; // Performance
  if (functional <= 2 && dysfunctional === 4) return 3; // Must-be
  if ((functional <= 2 && dysfunctional === 4) || (functional === -2 && dysfunctional <= 2)) return 4; // Reverse
  return 5; // Indifferent
};

const categories = ['Questionable', 'Attractive', 'Performance', 'Must-be', 'Reverse', 'Indifferent'];
const colors = ['blue', 'orange', 'yellow', 'red', 'purple', 'gray'];

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
  }, []);

  const categoryMap = classifyChoices(choices);

  return (
    <div className="kano-bar-chart">
      <h2>Распределение функций по модели Кано</h2>
      {features.map((feature) => {
        const categoriesForFeature = categoryMap[(feature as any).id!] || [0, 0, 0, 0, 0, 0];
        const totalResponses = summCat(categoriesForFeature);

        return (
          <div key={(feature as any).id} style={{ display: 'flex', margin: '20px' }}>
            <div title={(feature as any).title} style={{ marginRight: '6px', maxWidth: '100px', textOverflow: 'ellipsis' }}>{(feature as any).title}</div>
            <div className="kano-bar" style={{ display: 'flex', height: '30px', width: '100%' }}>
              {categories.map((cat, index) => {
                const count = categoriesForFeature[index];
                const percentage = totalResponses > 0 ? (count * 100) / totalResponses : 0;

                return (
                  <div
                    key={cat}
                    style={{
                      backgroundColor: colors[index],
                      width: `${percentage.toFixed(2)}%`,
                      textAlign: 'center',
                      lineHeight: '30px',
                      color: 'black',
                      fontSize: '12px',
                    }}
                  >
                    {percentage > 0 ? `${percentage.toFixed(2)}%` : ''}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="kano-legend" style={{ display: 'flex', gap: '20px', margin: '20px', justifyContent: 'center' }}>
        {categories.map((cat, index) => (
          <div key={cat} style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                backgroundColor: colors[index],
                width: '20px',
                height: '20px',
                marginRight: '10px',
              }}
            ></div>
            <span>{cat}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanoBarChart;
