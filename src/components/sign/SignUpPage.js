import axios from "axios";
import { useState } from "react";
import {Link, useHistory} from 'react-router-dom';

import {Container, Form, Button, Title} from './styles/LogInAndSignUpStyle';

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    function signUp(e) {
        e.preventDefault();
        if (username && password && email && (password === passwordConfirmation)){
            setIsLoading(true);
            const body = {
                email,
                password,
                username
            };
            const request = axios.post('http://localhost:4000/sign-up', body);
            request.then((response)=> {
                if (response.status === 200){
                    setIsLoading(false);
                    history.push("/");
                } else {
                    alert(response.status);
                }
            });
            request.catch((error)=> {
                if(error.response.status === 403) {
                    alert('This e-mail is already in use, please proceed to log in page or use a different e-mail address');
                } else {
                    alert('Something went wrong, please try again soon');
                }
                setIsLoading(false);
            })
        }
        if (!email){
            alert("Please, provide your e-mail");
            return;
        }
        if (password !== passwordConfirmation){
            alert("Passwords must match");
            return;
        }
        if (!password){
            alert("Please, enter a password");
            return;
        }
        if (!username){
            alert("Please, tell us your username");
            return;
        }
    }

    return (
        <Container>
            <Form onSubmit={signUp}>
                <Title>MyWallet</Title>
                <input onChange={(e)=>setUserName(e.target.value)} value={username} type="text" placeholder="Nome"></input>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" placeholder="E-mail" ></input>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="Senha"></input>
                <input onChange={(e)=>setPasswordConfirmation(e.target.value)} value={passwordConfirmation} type="password" placeholder="Confirme a senha"></input>
                <Button isloading={isLoading} disabled={isLoading} type="submit">Cadastrar</Button>
                <Link to='/'><p>Já tem uma conta? Entre agora!</p></Link>
            </Form>
        </Container>
    )
}