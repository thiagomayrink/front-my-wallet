import axios from "axios";
import { useState } from "react";
import {Link, useHistory} from 'react-router-dom';

import {Container, Form, Button, Title} from './styles/LogInAndSignUpStyle';

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    function signUp(e) {
        e.preventDefault();
        if (name && password && email && (password === passwordConfirmation)){
            setIsLoading(true);
            const body = {
                name,
                email,
                password
            };
            const request = axios.post(`${process.env.REACT_APP_API_BASE_URL}/sign-up`, body);
            request.then((response)=> {
                if (response.status === 201){
                    setIsLoading(false);
                    history.push("/");
                } else {
                    alert(response.status);
                }
            });
            request.catch((error)=> {
                if(error.response.status === 409) {
                    alert('This e-mail is already in use, please proceed to log in page or use a different e-mail address');
                } else {
                    alert('Something went wrong, please try again soon', error.response.status);
                }
                setIsLoading(false);
            })
        }
        if (!name){
            alert("Please, tell us your name");
            return;
        }
        if (!email){
            alert("Please, provide your e-mail");
            return;
        }
        if (!password){
            alert("Please, enter a password");
            return;
        }
        if (password !== passwordConfirmation){
            alert("Passwords must match");
            return;
        }
    }

    return (
        <Container>
            <Form onSubmit={signUp}>
                <Title>MyWallet</Title>
                <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder="Nome"></input>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" placeholder="E-mail" ></input>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="Senha"></input>
                <input onChange={(e)=>setPasswordConfirmation(e.target.value)} value={passwordConfirmation} type="password" placeholder="Confirme a senha"></input>
                <Button isloading={isLoading} disabled={isLoading} type="submit">Cadastrar</Button>
                <Link to='/'><p>Já tem uma conta? Entre agora!</p></Link>
            </Form>
        </Container>
    )
}