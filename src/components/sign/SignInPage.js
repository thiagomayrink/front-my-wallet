import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import UserContext from "../../contexts/UserContext";
import { Container, Form, Button, Title } from "./styles/LogInAndSignUpStyle";

export default function SignInPage() {
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user !== null) {
      history.push("/home");
    }
  }, [user, history]);

  function login(e) {
    e.preventDefault();
    if (email && password) {
      setIsLoading(true);
      const body = { email, password };
      const request = axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/sign-in`,
        body
      );
      request.then((response) => {
        if (!response.data?.user || !response.data?.token) {
          return console.log("login error, incomplete credential");
        }
        const userCredential = {
          user: response.data.user,
          token: response.data.token,
          config: {
            headers: { Authorization: `Bearer ${response.data.token}` },
          },
        };
        setIsLoading(false);
        localStorage.setItem("user", JSON.stringify(userCredential));
        setUser(userCredential);
        history.push("/home");
      });
      request.catch((error) => {
        setIsLoading(false);
        if (error.response.status === 403) {
          return alert("Wrong e-mail or password, please try again");
        }
      });
    } else {
      return alert("Please enter your e-mail and password");
    }
  }
  return (
    <Container>
      <Form onSubmit={login}>
        <Title>MyWallet</Title>
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
        <Button isloading={isLoading} disabled={isLoading} type="submit">
          Entrar
        </Button>
        <Link to="/signup">
          <p>Primeira vez? Cadastre-se!</p>
        </Link>
      </Form>
    </Container>
  );
}
