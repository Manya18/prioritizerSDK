import React from 'react';
import { Feature, ResultsType } from '../types/types';

type KanoCategory = 'Must-be' | 'Performance' | 'Excitement' | 'Indifferent' | 'Reverse';

const classifyKano = (functional: number, dysfunctional: number): KanoCategory => {
  if (functional === 4 && dysfunctional === -2) return 'Excitement';
  if (functional === 2 && dysfunctional <= 0) return 'Performance';
  if (functional === 0 && dysfunctional === 0) return 'Indifferent';
  if (functional === -2 && dysfunctional === 4) return 'Reverse';
  return 'Must-be';
};

const getCategoryColor = (category: KanoCategory) => {
  switch (category) {
    case 'Must-be':
      return 'green';
    case 'Performance':
      return 'yellow';
    case 'Excitement':
      return 'blue';
    case 'Indifferent':
      return 'gray';
    case 'Reverse':
      return 'red';
    default:
      return 'white';
  }
};

const KanoBarChart = ({ results, features }: { results: ResultsType, features: Feature[] }) => {
  return (
    <div className="kano-bar-chart">
      <h2>Распределение функций по модели Кано</h2>
      {features.map((feature) => {
        const featureResults = results[feature.id];

        if (featureResults) {
          const functionalAnswer = featureResults[0]?.priority ?? 0;
          const dysfunctionalAnswer = featureResults[1]?.priority ?? 0;
          const category = classifyKano(functionalAnswer, dysfunctionalAnswer);

          const categoryCounts = {
            'Must-be': 0,
            'Performance': 0,
            'Excitement': 0,
            'Indifferent': 0,
            'Reverse': 0,
          };

          const totalResponses = 100; 
          categoryCounts[category] = 100; 

          return (
            <div key={feature.id} className="kano-feature">
              <h3>{feature.title}</h3>
              <div className="kano-bar" style={{ display: 'flex', height: '30px', width: '100%' }}>
                {Object.keys(categoryCounts).map((cat) => {
                  const percentage = categoryCounts[cat as KanoCategory]; 
                  return (
                    <div
                      key={cat}
                      style={{
                        backgroundColor: getCategoryColor(cat as KanoCategory),
                        width: `${percentage}%`,
                        textAlign: 'center',
                        lineHeight: '30px',
                        color: 'white',
                        fontSize: '12px',
                      }}
                    >
                      {percentage > 0 ? `${cat} ${percentage}%` : ''}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        } else {
          return (
            <div key={feature.id} className="kano-feature">
              <h3>{feature.title}</h3>
              <p>Нет данных</p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default KanoBarChart;
