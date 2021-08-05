
import {  BrowserRouter as Router,  Switch,  Route,  Link,Redirect
} from "react-router-dom";

import Test from  './pages/test'


function App() {

  return (
    <Router>
      <Route path="/test">
        <Test/>
      </Route>
    </Router>
  );
}

export default App;
