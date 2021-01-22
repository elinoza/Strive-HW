
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from "./components/Header"
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home"
import Details from "./components/Details"
import AddProduct from "./components/AddProduct"
function App() {
  return (
    <div className="App">
      <Router>
      <Header/>
      <Route
            path="/"
            exact
            render ={(props)=><Home {...props} />}
          />
        <Route path="/details/:id" component={Details} />  
       
  
    </Router>
    </div>
  );
}

export default App;
