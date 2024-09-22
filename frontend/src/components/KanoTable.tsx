import React from 'react';
import { Choice, Feature } from '../types/types';


const classifyKano = (functional: number, dysfunctional: number): number => {
    if ((functional === 4 && dysfunctional === -2) || (functional === -2 && dysfunctional === 4)) return 0;
    if (functional === 4 && dysfunctional <= 2) return 1;
    if (functional === 4 && dysfunctional === 4) return 2;
    if (functional <= 2 && dysfunctional === 4) return 3;
    if ((functional <= 2 && dysfunctional === 4) || (functional === -2 && dysfunctional <= 2)) return 4;
    return 5;
};
const category = ['Questionabie', 'Attractive', 'Performance', 'Must-be', 'Reverse', 'Indifferent']
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
    let summ = 0
    for (let i = 0; i < categories.length; i++) {
        summ += categories[i];
    }
    return summ;
}



const KanoTable = ({
    choices,
    features,
    tableStyle
}: {
    choices: Choice[],
    features: Feature[],
    tableStyle?: React.CSSProperties
}) => {

    const categoryMap = classifyChoices(choices);
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
                                {category.map((cat, index) => (
                                    <td style={Math.max(...categories) === categories[index] ? { backgroundColor: 'lightgreen' } : { backgroundColor: 'inherit' }}>
                                        {(categories[index] * 100 / summCat(categories)).toFixed(2)}%</td>
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
