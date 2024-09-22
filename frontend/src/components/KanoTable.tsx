import React, { useState } from 'react';
import { Choice, Feature, ResultsType } from '../types/types';

type KanoCategory = 'Must-be' | 'Performance' | 'Questionabie' | 'Indifferent' | 'Reverse' | 'Attractive';

const classifyKano = (functional: number, dysfunctional: number): KanoCategory => {
    if ((functional === 4 && dysfunctional === -2) || (functional === -2 && dysfunctional === 4)) return 'Questionabie';
    if (functional === 4 && dysfunctional <= 2) return 'Attractive';
    if (functional === 4 && dysfunctional === 4) return 'Performance';
    if (functional <= 2 && dysfunctional === 4) return 'Must-be';
    if ((functional <= 2 && dysfunctional === 4) || (functional === -2 && dysfunctional <= 2)) return 'Reverse';
    return 'Indifferent';
};

const getCellColor = (category: KanoCategory) => {
    switch (category) {
        case 'Must-be':
            return 'green';
        case 'Performance':
            return 'yellow';
        case 'Questionabie':
            return 'blue';
        case 'Indifferent':
            return 'gray';
        case 'Reverse':
            return 'red';
        default:
            return 'white';
    }
};

const classifyChoices = (choices: Choice[]): { [key: number]: KanoCategory[] } => {
    const featureMap: { [key: number]: KanoCategory[] } = {};

    choices.forEach((choice) => {
        const { positive, negative, feature_id } = choice;

        const category = classifyKano(positive, negative);

        if (!featureMap[feature_id]) {
            featureMap[feature_id] = [];
        }

        featureMap[feature_id].push(category);
    });

    return featureMap;
};

const KanoTable = ({
    choices,
    features,
    cellStyles,
    tableStyle
}: {
    choices: Choice[],
    features: Feature[],
    cellStyles?: { [key in KanoCategory]?: React.CSSProperties },
    tableStyle?: React.CSSProperties
}) => {
    const [category, setCategory] = useState([]);

    const defaultStyles = {
        'Performance': { backgroundColor: getCellColor('Performance') },
        'Must-be': { backgroundColor: getCellColor('Must-be') },
        'Questionabie': { backgroundColor: getCellColor('Questionabie') },
        'Attractive': { backgroundColor: getCellColor('Attractive') },
        'Indifferent': { backgroundColor: getCellColor('Indifferent') },
        'Reverse': { backgroundColor: getCellColor('Reverse') }
    };
    console.log("eee", choices)
    const categoryMap = classifyChoices(choices);
    console.log(categoryMap)

    return (
        <div className="kano-table">
            <h2>Таблица Кано</h2>
            <table
                border={1}
                cellPadding={10}
                cellSpacing={0}
                style={tableStyle}
            >
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
                        const categories = categoryMap[feature.id!] || [];

                        return (
                            <tr key={feature.id}>
                                <td>{feature.title}</td>
                                <td style={categories.includes('Performance') ? { ...defaultStyles['Performance'], ...cellStyles?.['Performance'] } : {}}></td>
                                <td style={categories.includes('Must-be') ? { ...defaultStyles['Must-be'], ...cellStyles?.['Must-be'] } : {}}></td>
                                <td style={categories.includes('Attractive') ? { ...defaultStyles['Attractive'], ...cellStyles?.['Attractive'] } : {}}></td>
                                <td style={categories.includes('Questionabie') ? { ...defaultStyles['Questionabie'], ...cellStyles?.['Attractive'] } : {}}></td>
                                <td style={categories.includes('Indifferent') ? { ...defaultStyles['Indifferent'], ...cellStyles?.['Indifferent'] } : {}}></td>
                                <td style={categories.includes('Reverse') ? { ...defaultStyles['Reverse'], ...cellStyles?.['Reverse'] } : {}}></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};




export default KanoTable;
