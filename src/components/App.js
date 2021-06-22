import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import { useState } from 'react';
import GlobalStyle from '../styles/globalStyles';
import SignInPage from './sign/SignInPage'
import SignUpPage from './sign/SignUpPage'
import Home from './Home';
import TransactionPage from './TransactionPage';

export default function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
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
                        <Home />
                    </Route>
                    <Route path="/transaction" exact>
                        <TransactionPage />
                    </Route>
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    );
}