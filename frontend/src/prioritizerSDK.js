class PrioritizerSDK {
    constructor({ apiUrl, features }) {
        this.apiUrl = apiUrl;
        this.features = features || [];
    }

    async vote(featureId) {
        try {
            const response = await fetch(`${this.apiUrl}/api/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ featureId }),
            });
            if (!response.ok) {
                throw new Error('Ошибка при голосовании');
            }
            return await response.json();
        } catch (error) {
            console.error('Ошибка при голосовании:', error);
            throw error;
        }
    }

    async getVotes() {
        try {
            const response = await fetch(`${this.apiUrl}/api/votes`);
            if (!response.ok) {
                throw new Error('Ошибка при получении голосов');
            }
            return await response.json();
        } catch (error) {
            console.error('Ошибка при получении голосов:', error);
            throw error;
        }
    }

    init() {
        this.createVotingForm();
        this.updateResults();
    }

    createVotingForm() {
        const pollDiv = document.getElementById('poll');

        pollDiv.innerHTML = '';

        const form = document.createElement('form');
        form.id = 'voteForm';

        const checkboxList = document.createElement('div');
        checkboxList.id = 'checkboxList';

        this.features.forEach(feature => {
            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'feature';
            checkbox.value = feature.id;

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(` ${feature.name}`));
            checkboxList.appendChild(label);
            checkboxList.appendChild(document.createElement('br'));
        });

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Отправить голос';

        form.appendChild(checkboxList);
        form.appendChild(submitButton);
        pollDiv.appendChild(form);

        form.addEventListener('submit', (event) => this.handleVoteSubmit(event));
    }

    async handleVoteSubmit(event) {
        event.preventDefault();

        const selectedFeatures = [];
        const checkboxes = document.querySelectorAll('input[name="feature"]:checked');

        checkboxes.forEach(checkbox => {
            selectedFeatures.push(checkbox.value);
        });

        if (selectedFeatures.length === 0) {
            alert('Пожалуйста, выберите хотя бы одну функцию.');
            return;
        }

        try {
            for (const featureId of selectedFeatures) {
                await this.vote(featureId);
            }
            alert('Голос учтен!');
            this.updateResults();
        } catch (error) {
            console.error('Ошибка при голосовании:', error);
        }
    }

    async updateResults() {
        const resultsDisplay = document.getElementById('results');

        if (!resultsDisplay) {
            const newResultsDisplay = document.createElement('pre');
            newResultsDisplay.id = 'results';
            document.body.appendChild(newResultsDisplay);
        }

        try {
            const votes = await this.getVotes();
            document.getElementById('results').textContent = JSON.stringify(votes, null, 2);
        } catch (error) {
            console.error('Ошибка при получении голосов:', error);
        }
    }
}

export default PrioritizerSDK;
