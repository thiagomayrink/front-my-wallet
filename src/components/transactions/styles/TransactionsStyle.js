import styled from "styled-components";

const Title = styled.span`
  font-size: 26px;
  font-weight: 700;
  line-height: 31px;
  letter-spacing: 0em;
  width: 100%;
  text-align: left;
  margin-bottom: 40px;
`;
const Container = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Button = styled.button`
  width: 100%;
  height: 46px;
  background: #a328d6;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 700;
  line-height: 23px;
  color: #fff;
  border: none;
  cursor: ${(props) => (props.isloading ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.isloading ? 0.7 : 1)};
  :hover {
    filter: contrast(120%);
  }
`;
const Form = styled.form`
  font-size: 20px;
  line-height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  button:hover {
    filter: contrast(120%);
  }
  button:active {
    filter: contrast(80%);
  }
  input {
    border: none;
    margin-bottom: 13px;
    width: 100%;
    height: 58px;
    background: #ffffff;
    border-radius: 5px;
    font-size: 20px;
    line-height: 23px;
    text-indent: 15px;
    color: #000;
    outline: none;
  }
  input::placeholder {
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    text-indent: 15px;
  }
`;
export { Title, Container, Button, Form };
