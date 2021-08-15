import axios from "axios";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { Container, Form, Button, Title } from "./styles/LogInAndSignUpStyle";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  function signUp(e) {
    e.preventDefault();
    if (!name) {
      alert("Informe seu nome");
      return;
    }
    if (!email) {
      alert("Informe seu Email");
      return;
    }
    if (!password || password.length < 6) {
      alert("Insira uma senha de no mínimo 6 caracteres");
      return;
    }
    if (password !== passwordConfirmation) {
      alert("As senhas devem ser idênticas");
      return;
    }

    if (
      name &&
      password &&
      email &&
      password.length > 5 &&
      password === passwordConfirmation
    ) {
      setIsLoading(true);
      const body = {
        name,
        email,
        password,
      };

      const path = new URL("/sign-up", process.env.REACT_APP_API_BASE_URL);
      const request = axios.post(path.href, body);
      request.then((response) => {
        if (response.status === 201) {
          setIsLoading(false);
          history.push("/");
        } else {
          alert(response.status);
        }
      });
      request.catch((error) => {
        if (error?.response?.status === 409) {
          alert("O Email já está em uso, faça login ou use um Email diferente");
        } else {
          alert("erro inesperado, estamos verificando!");
        }
        setIsLoading(false);
      });
    }
  }

  return (
    <Container>
      <Form onSubmit={signUp}>
        <Title>MyWallet</Title>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Nome"
        ></input>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
          placeholder="E-mail"
        ></input>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Senha"
        ></input>
        <input
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          value={passwordConfirmation}
          type="password"
          placeholder="Confirme a senha"
        ></input>
        <Button isloading={isLoading} disabled={isLoading} type="submit">
          Cadastrar
        </Button>
        <Link to="/">
          <p>Já tem uma conta? Entre agora!</p>
        </Link>
      </Form>
    </Container>
  );
}
