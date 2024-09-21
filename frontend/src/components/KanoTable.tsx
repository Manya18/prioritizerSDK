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

const getCellColor = (category: KanoCategory) => {
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
        'Must-be': { backgroundColor: getCellColor('Must-be') },
        'Performance': { backgroundColor: getCellColor('Performance') },
        'Excitement': { backgroundColor: getCellColor('Excitement') },
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
                        <th>Обязательные</th>
                        <th>Ожидаемые</th>
                        <th>Волнующие</th>
                        <th>Безразличные</th>
                        <th>Противоположные</th>
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
                                    <td style={category === 'Must-be' ? { ...defaultStyles['Must-be'], ...cellStyles?.['Must-be'] } : {}}></td>
                                    <td style={category === 'Performance' ? { ...defaultStyles['Performance'], ...cellStyles?.['Performance'] } : {}}></td>
                                    <td style={category === 'Excitement' ? { ...defaultStyles['Excitement'], ...cellStyles?.['Excitement'] } : {}}></td>
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
