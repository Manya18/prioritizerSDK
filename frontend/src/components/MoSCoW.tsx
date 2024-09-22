import React, { useEffect, useState } from 'react';
import { Choice, Feature } from '../types/types';

const classifyMoSCoW = (functional: number, dysfunctional: number): string => {
    if ((functional === 4 && dysfunctional === -2) || (functional === -2 && dysfunctional === 4)) return 'Must';
    if (functional === 4 && dysfunctional <= 2) return 'Must';
    if (functional === 4 && dysfunctional === 4) return 'Should';
    if (functional <= 2 && dysfunctional === 4) return 'Could';
    if ((functional <= 2 && dysfunctional === 4) || (functional === -2 && dysfunctional <= 2)) return 'Won\'t';

    return 'Needs Analysis';
};

const categoryMoSCoW = ['Must', 'Should', 'Could', 'Won\'t'];

const classifyMoSCoWChoices = (choices: Choice[]): { [key: number]: number[] } => {
    const featureMap: { [key: number]: number[] } = {};
    choices.forEach((choice) => {
        const curCategory = classifyMoSCoW(choice.positive, choice.negative);

        if (!featureMap[choice.feature_id]) {
            featureMap[choice.feature_id] = [0, 0, 0, 0];
        }

        switch (curCategory) {
            case 'Must':
                featureMap[choice.feature_id][0]++;
                break;
            case 'Should':
                featureMap[choice.feature_id][1]++;
                break;
            case 'Could':
                featureMap[choice.feature_id][2]++;
                break;
            case 'Won\'t':
                featureMap[choice.feature_id][3]++;
                break;
            default:
                break;
        }
    });

    return featureMap;
};

const summMoSCoWCat = (categories: number[]) => {
    return categories.reduce((sum, value) => sum + value, 0);
};

const MoSCoWTable = ({
    survey_id,
    tableStyle
}: {
    survey_id: string,
    tableStyle?: React.CSSProperties
}) => {

    const [choices, setChoices] = useState<Choice[]>([]);
    const [features, setFeatures] = useState([]);
    const categoryMap = classifyMoSCoWChoices(choices);

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
            console.log(process.env.REACT_APP_API_URL)
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
  
    return (
        <div className="moscow-table">
            <h2>Таблица MoSCoW</h2>
            <table
                border={1}
                cellPadding={10}
                cellSpacing={0}
                style={tableStyle}
            >
                <thead>
                    <tr>
                        <th>Функция</th>
                        <th>Must</th>
                        <th>Should</th>
                        <th>Could</th>
                        <th>Won't</th>
                    </tr>
                </thead>
                <tbody>
                    {features.map((feature) => {
                        const categories = categoryMap[(feature as any).id!] || [];

                        return (
                            <tr key={(feature as any).id}>
                                <td>{(feature as any).title}</td>
                                {categoryMoSCoW.map((cat, index) => (
                                    <td style={Math.max(...categories) === categories[index] ? { backgroundColor: 'lightgreen' } : { backgroundColor: 'inherit' }}>
                                        {(categories[index] * 100 / summMoSCoWCat(categories)).toFixed(2)}%
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


export default MoSCoWTable;

