import { RiAddCircleLine, RiIndeterminateCircleLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import { Actions, Button } from "./styles/HomeStyle";

export default function Footer() {
  const history = useHistory();

  function toTransaction(type) {
    history.push("/transaction", { type });
  }

  return (
    <Actions>
      <Button onClick={() => toTransaction(0)}>
        <RiAddCircleLine />
        <p>
          Nova
          <br />
          Entrada
        </p>
      </Button>
      <Button onClick={() => toTransaction(1)}>
        <RiIndeterminateCircleLine />
        <p>
          Nova
          <br />
          Saída
        </p>
      </Button>
    </Actions>
  );
}
