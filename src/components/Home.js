import styled from "styled-components";
import {RiLogoutBoxRLine,RiAddCircleLine,RiIndeterminateCircleLine} from 'react-icons/ri'

export default function Home(params) {
    return (
        <Container>
            <Header>
                <span>Olá, Fulano</span><RiLogoutBoxRLine/>
            </Header>
            <Content>

            </Content>
            <Actions>
                <Button>
                    <RiAddCircleLine/>
                    <p>Nova<br/>Entrada</p>
                </Button>
                <Button>
                    <RiIndeterminateCircleLine/>
                    <p>Nova<br/>Saída</p>
                </Button>
            </Actions>
        </Container>
    )
}
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
    letter-spacing: 0em;
    margin-bottom:22px;
`
const Content = styled.article`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    width:100%;
    min-height:calc(100vh - 221px);
    border-radius:5px;
    padding:24px 12px 10px;
    background:#fff;
    overflow-y: scroll;
    margin-bottom:12px;
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
    letter-spacing: 0em;
    width: calc(50% - 8px);
    min-height: 114px;
    background: #A328D6;
    border-radius: 5px;
`