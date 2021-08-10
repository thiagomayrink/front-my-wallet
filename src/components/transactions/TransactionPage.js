import axios from 'axios';
import { useState, useContext} from "react";
import { useHistory, useLocation } from "react-router";
import UserContext from '../../contexts/UserContext';

import {  Title, Container, Button, Form } from './styles/TransactionsStyle';
import { EmptyTransactionsMessage, Header } from '../home/styles/HomeStyle';

import CurrencyInput from 'react-currency-input-field';

export default function TransactionPage() {
    const { user: userData, setUser } = useContext(UserContext);
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const type = location?.state?.type;

    function makeTransaction(e,type) {
        e.preventDefault();
        if (type !==0 && type !== 1){
            return alert('operação inválida');
        } 
        if (!value){
            return alert('insira um valor!');
        }
        setIsLoading(true);
        const amount = parseInt(value.replace(/[^0-9]/g,''))
        
        const body = {
            type,
            amount,
            description,
        };
        const request = axios.post(`${process.env.REACT_APP_API_BASE_URL}/transactions`,body,userData?.config);
        request.then(()=> {
            setIsLoading(false);
            history.push('/home');
        });
        request.catch((error)=> {
            setIsLoading(false);
            console.log(error.response.status);
            if (error.response.status === 401){
                localStorage.clear();
                setUser(null);
                return history.push("/");
            };
            alert('ocorreu um erro, tente novamente');
        });
    }
    
    if (userData!== null){
        return (
            <Container>
                <Form onSubmit={(e)=>makeTransaction(e,type)}>
                    <Title>Nova {type === 0 ? 'Entrada':'Saída'}</Title>
                    <CurrencyInput 
                        placeholder="Digite o valor" 
                        value={value}
                        allowNegativeValue={false}
                        fixedDecimalLength={2}
                        onValueChange={(value)=> setValue(value)} 
                    />
                    <input onChange={(e)=>setDescription(e.target.value)} value={description} type="text" placeholder="Descrição"></input>
                    <Button isloading={isLoading} disabled={isLoading} type="submit">{type === 0 ? 'Salvar entrada':'Salvar saída'}</Button>
                </Form>
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
}