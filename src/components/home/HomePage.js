import axios from "axios";
import { useContext, useState, useEffect, useRef, useCallback } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import dayjs from "dayjs";

import Header from "./Header";
import Footer from "./Footer";

import {
  BalanceContainer,
  BalanceText,
  BalanceValue,
  TransactionContainer,
  ValueSpan,
  DescriptionSpan,
  DateSpan,
  EmptyTransactionsMessage,
  Container,
  TransactionsContainer,
  Content,
} from "./styles/HomeStyle";
import { transformToDecimal } from "../utils/utils";

export default function HomePage() {
  const history = useHistory();
  const { user: userData, setUser } = useContext(UserContext);
  const [balance, setBalance] = useState("");
  const [transactions, setTransactions] = useState("");
  const bottomRef = useRef();

  const getBalance = useCallback(() => {
    const request = axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/balance`,
      userData?.config
    );
    request.then((response) => {
      setBalance(response.data?.balance);
    });
    request.catch((error) => {
      if (error.response.status === 401) {
        localStorage.clear();
        setUser(null);
        history.push("/");
      } else {
        console.error(error);
        alert("erro inesperado, estamos verificando!");
      }
    });
  }, [userData?.config, setUser, history]);

  const getTransactions = useCallback(() => {
    const request = axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/transactions`,
      userData?.config
    );
    request.then((response) => {
      setTransactions(response.data);
      scrollToBottom();
    });
    request.catch((error) => {
      if (error.response.status === 401) {
        localStorage.clear();
        setUser(null);
        history.push("/");
      } else {
        console.error(error);
        alert("erro inesperado, estamos verificando!");
      }
    });
  }, [userData?.config, setUser, history]);

  function scrollToBottom() {
    if (bottomRef !== "undefined") {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    getTransactions();
    getBalance();
  }, [userData, getBalance, getTransactions]);

  if (userData !== null) {
    return (
      <Container>
        <Header />
        <Content>
          <TransactionsContainer>
            {transactions ? (
              transactions.map(({ amount, date, description, id, type }, i) => {
                const decimalAmount = transformToDecimal(amount);
                if (i === transactions.length - 1) {
                  return (
                    <TransactionContainer key={id} ref={bottomRef}>
                      <DateSpan>{dayjs(date).format("DD/MM")}</DateSpan>
                      <DescriptionSpan>{description}</DescriptionSpan>
                      <ValueSpan transaction={type}>{decimalAmount}</ValueSpan>
                    </TransactionContainer>
                  );
                }
                return (
                  <TransactionContainer key={id}>
                    <DateSpan>{dayjs(date).format("DD/MM")}</DateSpan>
                    <DescriptionSpan>{description}</DescriptionSpan>
                    <ValueSpan transaction={type}>{decimalAmount}</ValueSpan>
                  </TransactionContainer>
                );
              })
            ) : (
              <EmptyTransactionsMessage>
                Não há registros de <br />
                entrada ou saída
              </EmptyTransactionsMessage>
            )}
            <BalanceContainer>
              <BalanceText>SALDO:</BalanceText>
              {}
              <BalanceValue value={balance}>
                {transformToDecimal(balance)}
              </BalanceValue>
            </BalanceContainer>
          </TransactionsContainer>
        </Content>
        <Footer />
      </Container>
    );
  } else {
    return <Header />;
  }
}
