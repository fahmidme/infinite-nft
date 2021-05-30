import logo from './logo.svg';
import './App.css';

import {AuthCluster} from './auth-cluster'
import {initMarket} from './flow/init-market.tx'

function App() {
  return (
    <div className="App">
      <AuthCluster/>
      <button onClick={initMarket}>Init Market</button>
    </div>
  );
}

export default App;
