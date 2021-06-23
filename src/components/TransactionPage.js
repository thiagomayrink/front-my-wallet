import axios from 'axios';
import styled from "styled-components";
import { useState, useContext } from "react";
import { useHistory, useLocation } from "react-router";
import UserContext from '../contexts/UserContext';

export default function TransactionPage() {
    const { user: { config } } = useContext(UserContext);
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const type = location.state.type;
    const id = location.state.id;

    function makeTransaction(e,type,id) {
        e.preventDefault();
        if (type !==0 && type !== 1){
            return alert('operação inválida');
        } 
        if (!value){
            return alert('insira um valor!');
        }
        setIsLoading(true);
        const body = {
            type,
            amount: parseInt(value),
            description,
        };
        console.log(body);
        console.log(config);
        const request = axios.post('http://localhost:4000/transactions',body,config);
        request.then(()=> {
            setIsLoading(false);
            history.push('/home');
        });
        request.catch((error)=> {
            setIsLoading(false);
            console.log(error.response.status);
            alert('ocorreu um erro, tente novamente');
        });
    }
    return (
        <Container>
            <Form onSubmit={(e)=>makeTransaction(e,type,id)}>
                <Title>Nova {type === 0 ? 'Entrada':'Saída'}</Title>
                <input onChange={(e)=>setValue(e.target.value.replace(/[^0-9]/g, ""))} value={value} type="text" placeholder="Valor" ></input>
                <input onChange={(e)=>setDescription(e.target.value)} value={description} type="text" placeholder="Descrição"></input>
                <Button isloading={isLoading} disabled={isLoading} type="submit">{type === 0 ? 'Salvar entrada':'Salvar saída'}</Button>
            </Form>
        </Container>
    );
}
const Title = styled.span`
    font-size: 26px;
    font-weight: 700;
    line-height: 31px;
    letter-spacing: 0em;
    width:100%;
    text-align: left;
    margin-bottom:40px;
`
const Container = styled.div`
    margin:0 auto;
    display:flex;
    align-items:center;
    justify-content:center;
`
const Button = styled.button`
    width: 100%;
    height: 46px;
    background: #A328D6;
    border-radius: 5px;
    font-size: 20px;
    font-weight: 700;
    line-height: 23px;
    color: #FFF;
    border: none;
    cursor: ${props=> props.isloading ? "not-allowed" : "pointer"};
    opacity: ${props=> props.isloading ? 0.7 : 1};
    :hover{
        filter: contrast(120%)
    }
`
const Form = styled.form`
    font-size: 20px;
    line-height: 23px;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    button:hover{
        filter: contrast(120%);
    }
    button:active{
        filter: contrast(80%);
    }
    input { 
        border: none;
        margin-bottom:13px;
        width: 100%;
        height: 58px;
        background: #FFFFFF;
        border-radius: 5px;
        font-size: 20px;
        line-height: 23px;
        text-indent: 15px;
        color:#000;
        outline:none;
    }
    input::placeholder{
        font-size: 20px;
        font-weight:400;
        line-height: 23px;
        text-indent: 15px;
    }
`