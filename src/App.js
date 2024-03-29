import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Pages from './Components/Pages/Pages';
import AppContext from './Components/AppContext/AppContext';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AppContext>
      <Pages/>
      </AppContext>
      </BrowserRouter>
    </div>
  );
}

export default App;
