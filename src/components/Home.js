import axios from 'axios';
import styled from "styled-components";
import {RiLogoutBoxRLine,RiAddCircleLine,RiIndeterminateCircleLine} from 'react-icons/ri'
import { useContext, useState , useEffect, useRef} from "react";
import {useHistory} from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import dayjs from 'dayjs';

export default function Home() {
    const { user: {user, config, token} } = useContext(UserContext);
    const history = useHistory();
    const [balance, setBalance] = useState('');
    const [transactions, setTransactions] = useState('');
    const bottomRef = useRef();

    function signOut() {
        const request = axios.post('http://localhost:4000/sign-out',{},config);
        request.then(()=> history.push("/"));
        request.catch((error)=> {
            console.log(error);
        });
    }
    function scrollToBottom() {
        if (bottomRef !== 'undefined') {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }
    function getBalance() {
        const request = axios.get('http://localhost:4000/balance',config);
        request.then((response)=> {
            console.log(response.data);
            setBalance(response.data?.balance);
        });
        request.catch((error)=> {
            console.log(error);
        });
    }
    function getTransactions() {
        const request = axios.get('http://localhost:4000/transactions',config);
        request.then((response)=> {
            setTransactions(response.data)
            scrollToBottom();
        });
        request.catch((error)=> {
            console.log(error);
        });
    }
    function toTransaction(type,id) {
        type === 0 
        ? history.push("/transaction", { type, id }) 
        :history.push("/transaction", { type, id });
    }
    useEffect(()=>{
        getTransactions();
        getBalance();
    },[])
    return (
        <Container>
            <Header>
                <span>Olá, {user.name}</span><RiLogoutBoxRLine onClick={signOut}/>
            </Header>
            <Content>
            <TransactionsContainer>
                {transactions
                ?  transactions.map(({amount,date,description,id,type},i)=>{
                    if(i = transactions.length){
                        return (
                            <TransactionContainer key={id} ref={bottomRef}>
                                <DateSpan>{dayjs(date).format('DD/MM')}</DateSpan>
                                <DescriptionSpan>{description}</DescriptionSpan>
                                <ValueSpan transaction={type}>{amount}</ValueSpan>
                            </TransactionContainer>
                        );
                    }
                    return (
                        <TransactionContainer key={id}>
                            <DateSpan>{dayjs(date).format('DD/MM')}</DateSpan>
                            <DescriptionSpan>{description}</DescriptionSpan>
                            <ValueSpan transaction={type}>{amount}</ValueSpan>
                        </TransactionContainer>
                    );
                })
                :<EmptyTransactionsMessage>
                    Não há registros de <br/>
                    entrada ou saída
                </EmptyTransactionsMessage>}
                <BalanceContainer>
                    <BalanceText>SALDO:</BalanceText> 
                    <BalanceValue value={balance}>{balance}</BalanceValue>
                </BalanceContainer>
            </TransactionsContainer>
            </Content>
            <Actions>
                <Button onClick={(e)=>toTransaction(0,user.id)}>
                    <RiAddCircleLine/>
                    <p>Nova<br/>Entrada</p>
                </Button>
                <Button onClick={(e)=>toTransaction(1,user.id)}>
                    <RiIndeterminateCircleLine/>
                    <p>Nova<br/>Saída</p>
                </Button>
            </Actions>
        </Container>
    )
}
const BalanceContainer = styled.div`
    position:absolute;
    display:flex;
    align-items:center;
    justify-content:space-between;
    height:20px;
    left:12px;
    bottom:10px;
    right:24px;
    width:calc(100% - 24px);
    font-size: 17px;
    line-height: 20px;
`
const BalanceText = styled.div`
    color:#000000;
    font-weight: 700;
    text-align: left;
`
const BalanceValue = styled.div`
    color:${props=> props.value > 0 ? "#03AC00" : "#C70000"};
    text-align: right;
`
const TransactionContainer = styled.div`
    height: 19px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;
`
const ValueSpan = styled.span`
    color:${props=> props.transaction === 0 ? "#03AC00" : "#C70000"}; 
    text-align: right;
`
const DescriptionSpan = styled.span`
    color:#000000;
    width:100%;
    text-indent:10px;
    text-align: left;
`
const DateSpan = styled.span`
    color:#C6C6C6;
    text-align: left;
`
const EmptyTransactionsMessage = styled.div`
    position:absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #868686;
`
const Container = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
`
const Header = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    width:100%;
    justify-content:space-between;
    color:#FFF;
    font-size: 26px;
    font-weight: 700;
    line-height: 31px;
    margin-bottom:22px;
`
const TransactionsContainer = styled.div`
    display:flex;
    flex-direction:column;
    overflow-y: scroll;
    max-height:calc(100vh - 261px);
    width:100%;
`
const Content = styled.article`
    position:relative;
    display:flex;
    flex-direction:column;
    width:100%;
    min-height:calc(100vh - 221px);
    border-radius:5px;
    padding:24px 12px 40px;
    background:#fff;
    margin-bottom:12px;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;
`
const Actions = styled.div`
    display:flex;
    justify-content:space-between;
    width:100%;
    p:hover,button:hover,svg:hover{
        filter: contrast(120%);
    }
    p:active,button:active,svg:active{
        filter: contrast(80%);
    }
`
const Button = styled.button`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:start;
    border:none;
    svg {
        font-size:25px;
    }
    padding:9px;
    color:#FFF;
    text-align:left;
    font-size: 17px;
    font-weight: 700;
    line-height: 20px;
    width: calc(50% - 8px);
    min-height: 114px;
    background: #A328D6;
    border-radius: 5px;
`