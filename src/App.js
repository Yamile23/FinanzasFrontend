
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Page/Header';
import {BrowserRouter as Router} from "react-router-dom";
import RouterConfig from './Config/RouterConfig';

function App() {
  return (
    <Router>
     <div>
     <Header/>
     <RouterConfig/>
     </div>
     </Router>
  );
}

export default App;
