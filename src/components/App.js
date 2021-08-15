import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useState } from "react";
import GlobalStyle from "../styles/globalStyles";
import SignInPage from "./sign/SignInPage";
import SignUpPage from "./sign/SignUpPage";
import HomePage from "./home/HomePage";
import TransactionPage from "./transactions/TransactionPage";

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <GlobalStyle />
        <Switch>
          <Route path="/" exact>
            <SignInPage />
          </Route>
          <Route path="/signup" exact>
            <SignUpPage />
          </Route>
          <Route path="/home" exact>
            <HomePage />
          </Route>
          <Route path="/transaction" exact>
            <TransactionPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
