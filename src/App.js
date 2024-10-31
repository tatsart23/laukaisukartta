import './App.css';
import Field from './components/Field';
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='container'>
        <Field />
      </div>
    </div>
  );
}

export default App;
