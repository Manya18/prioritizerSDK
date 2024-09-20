import './App.css';
import VotingPoll from './VotingPoll';

function App() {
  return (
    <div className="App">
      <VotingPoll
        apiUrl='http://localhost:3000'
        features={[
          { id: 'feature-1', name: 'Функция 1' },
          { id: 'feature-2', name: 'Функция 2' },
          { id: 'feature-3', name: 'Функция 3' }
        ]}
      />
    </div>
  );
}

export default App;
