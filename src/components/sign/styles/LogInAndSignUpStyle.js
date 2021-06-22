import styled from "styled-components";

const Title = styled.span`
    font-family: 'Saira Stencil One', cursive;
    font-size: 32px;
    line-height: 50px;
    letter-spacing: 0em;
    text-align: left;
    margin-bottom:18px;
`
const Container = styled.div`
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    display:flex;
    align-items:center;
    justify-content:center;
`
const Button = styled.button`
    width: 100%;
    height: 46px;
    margin-bottom:36px;
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
    p:hover,button:hover{
        filter: contrast(120%);
    }
    p:active,button:active{
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
    p{
        font-size: 15px;
        font-weight: 700;
        line-height: 18px;
        letter-spacing: 0em;
    }
`
export {Container, Form, Button, Title};