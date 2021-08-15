import axios from "axios";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import {
  EmptyTransactionsMessage,
  ExitButton,
  Header as Container,
} from "./styles/HomeStyle";

export default function Header() {
  const { user: userData, setUser } = useContext(UserContext);
  const history = useHistory();

  function signOut() {
    const path = new URL("/sign-out", process.env.REACT_APP_API_BASE_URL);
    const request = axios.post(path.href, {}, userData?.config);
    request.then(() => {
      localStorage.clear();
      setUser(null);
      history.push("/");
    });
    request.catch(() => {
      alert("erro inesperado, estamos verificando!");
    });
  }
  if (userData !== null) {
    return (
      <Container>
        <span>Olá, {userData?.user.name}</span>
        <ExitButton
          onClick={() => {
            signOut();
          }}
        />
      </Container>
    );
  } else {
    return (
      <Container>
        <EmptyTransactionsMessage>
          Por favor faça o login!
        </EmptyTransactionsMessage>
      </Container>
    );
  }
}
