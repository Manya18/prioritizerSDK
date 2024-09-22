import React from 'react';
import { Feature, ResultsType } from '../types/types';

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

const KanoTable = ({
    results,
    features,
    cellStyles,
    tableStyle
}: {
    results: ResultsType,
    features: Feature[],
    cellStyles?: { [key in KanoCategory]?: React.CSSProperties },
    tableStyle?: React.CSSProperties
}) => {
    const defaultStyles = {
        'Performance': { backgroundColor: getCellColor('Performance') },
        'Must-be': { backgroundColor: getCellColor('Must-be') },
        'Questionabie': { backgroundColor: getCellColor('Questionabie') },
        'Attractive': { backgroundColor: getCellColor('Attractive') },
        'Indifferent': { backgroundColor: getCellColor('Indifferent') },
        'Reverse': { backgroundColor: getCellColor('Reverse') }
    };

    console.log(results)
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
                        const featureResults = results[feature.id];

                        if (featureResults && featureResults[0] && featureResults[1]) {
                            const functionalAnswer = featureResults[0].priority;
                            const dysfunctionalAnswer = featureResults[1].priority;

                            const category = classifyKano(functionalAnswer, dysfunctionalAnswer);

                            return (
                                <tr key={feature.id}>
                                    <td>{feature.title}</td>
                                    <td style={category === 'Performance' ? { ...defaultStyles['Performance'], ...cellStyles?.['Performance'] } : {}}></td>
                                    <td style={category === 'Must-be' ? { ...defaultStyles['Must-be'], ...cellStyles?.['Must-be'] } : {}}></td>
                                    <td style={category === 'Attractive' ? { ...defaultStyles['Attractive'], ...cellStyles?.['Attractive'] } : {}}></td>
                                    <td style={category === 'Questionabie' ? { ...defaultStyles['Questionabie'], ...cellStyles?.['Attractive'] } : {}}></td>
                                    <td style={category === 'Indifferent' ? { ...defaultStyles['Indifferent'], ...cellStyles?.['Indifferent'] } : {}}></td>
                                    <td style={category === 'Reverse' ? { ...defaultStyles['Reverse'], ...cellStyles?.['Reverse'] } : {}}></td>
                                </tr>
                            );
                        } else {
                            return (
                                <tr key={feature.id}>
                                    <td>{feature.title}</td>
                                    <td colSpan={5} style={{ textAlign: 'center', color: 'red' }}>
                                        Нет данных
                                    </td>
                                </tr>
                            );
                        }
                    })}
                </tbody>
            </table>
        </div>
    );
};


export default KanoTable;
