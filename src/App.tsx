import { Provider } from 'react-redux';
import { store } from './store';
import GameContainer from './components/GameContainer';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <GameContainer />
      </div>
    </Provider>
  );
}

export default App;
