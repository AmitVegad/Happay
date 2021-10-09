import "./App.css";
import Cart from "./components/Cart";
import Home from "./components/Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cart" component={Cart} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
