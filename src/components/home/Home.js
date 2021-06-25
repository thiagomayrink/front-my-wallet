import axios from 'axios';
import {RiAddCircleLine,RiIndeterminateCircleLine} from 'react-icons/ri'
import { useContext, useState , useEffect, useRef, useCallback} from "react";
import {useHistory} from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import dayjs from 'dayjs';

import 
    { 
     BalanceContainer, BalanceText, BalanceValue, TransactionContainer,
     ValueSpan, DescriptionSpan, DateSpan, EmptyTransactionsMessage, Container, 
     Header, TransactionsContainer, Content, Actions, Button, ExitButton
    } 
from './styles/HomeStyle';

export default function Home() {
    const history = useHistory();
    const {user: userData, setUser} = useContext(UserContext);
    const [balance, setBalance] = useState('');
    const [transactions, setTransactions] = useState('');
    const bottomRef = useRef();

    function signOut() {
        const request = axios.post('http://localhost:4000/sign-out',{},userData?.config);
        request.then(()=> history.push("/"));
        request.catch((error)=> {
            console.log(error);
        });
    };

    function scrollToBottom() {
        if (bottomRef !== 'undefined') {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        };
    };

    const getBalance = useCallback (()=>{
        const request = axios.get('http://localhost:4000/balance',userData?.config);
        request.then((response)=> {
            setBalance(response.data?.balance);
        });
        request.catch((error)=> {
            if (error.response.status === 401){
                localStorage.clear();
                setUser(null);
                history.push("/");
            };
            console.log(error);
        });
    },[userData?.config,setUser,history]);

    const getTransactions = useCallback (()=> {
        const request = axios.get('http://localhost:4000/transactions',userData?.config);
        request.then((response)=> {
            setTransactions(response.data);
            scrollToBottom();
        });
        request.catch((error)=> {
            if (error.response.status === 401){
                localStorage.clear();
                setUser(null);
                history.push("/");
            };
            console.log(error);
        });
    },[userData?.config,setUser,history]);

    function toTransaction(type) {
        history.push("/transaction", { type })
    };

    useEffect(()=>{
        getTransactions();
        getBalance();
    },[userData, getBalance,getTransactions]);

    if (userData !== null) {
        return (
            <Container>
                <Header>
                    <span>Olá, {userData?.user.name}</span><ExitButton onClick={()=>{signOut();localStorage.clear();setUser(null)}}/>
                </Header>
                <Content >
                    <TransactionsContainer>
                        {transactions
                            ? transactions.map(({amount,date,description,id,type},i)=>{
                                const decimalAmount = Number(amount/100).toFixed(2).replace(".",",");
                                if(i = transactions.length){
                                    return (
                                        <TransactionContainer key={id} ref={bottomRef}>
                                            <DateSpan>{dayjs(date).format('DD/MM')}</DateSpan>
                                            <DescriptionSpan>{description}</DescriptionSpan>
                                            <ValueSpan transaction={type}>{decimalAmount}</ValueSpan>
                                        </TransactionContainer>
                                    );
                                }
                                return (
                                    <TransactionContainer key={id}>
                                        <DateSpan>{dayjs(date).format('DD/MM')}</DateSpan>
                                        <DescriptionSpan>{description}</DescriptionSpan>
                                        <ValueSpan transaction={type}>{decimalAmount}</ValueSpan>
                                    </TransactionContainer>
                                );
                            })
                            : <EmptyTransactionsMessage>
                                Não há registros de <br/>
                                entrada ou saída
                            </EmptyTransactionsMessage>
                        }
                        <BalanceContainer>
                            <BalanceText>SALDO:</BalanceText> 
                            {}
                            <BalanceValue value={balance}>{Number(balance/100).toFixed(2).replace(".",",")}</BalanceValue>
                        </BalanceContainer>
                    </TransactionsContainer>
                </Content>
                <Actions>
                    <Button onClick={()=>toTransaction(0)}>
                        <RiAddCircleLine/>
                        <p>Nova<br/>Entrada</p>
                    </Button>
                    <Button onClick={()=>toTransaction(1)}>
                        <RiIndeterminateCircleLine/>
                        <p>Nova<br/>Saída</p>
                    </Button>
                </Actions>
            </Container>
        );
    } else {
        return(
            <Header>
                <EmptyTransactionsMessage>
                    Por favor faça o login!
                </EmptyTransactionsMessage>
            </Header>
        )
    }
};