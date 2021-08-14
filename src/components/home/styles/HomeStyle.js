import styled from "styled-components";
import { RiLogoutBoxRLine } from "react-icons/ri";

const BalanceContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 20px;
  left: 12px;
  bottom: 10px;
  right: 24px;
  width: calc(100% - 24px);
  font-size: 17px;
  line-height: 20px;
`;
const BalanceText = styled.div`
  color: #000000;
  font-weight: 700;
  text-align: left;
`;
const BalanceValue = styled.div`
  color: ${(props) =>
    props.value >= 0 ? (props.value === 0 ? "#868686" : "#03AC00") : "#C70000"};
  text-align: right;
`;
const TransactionContainer = styled.div`
  height: 19px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
`;
const ValueSpan = styled.span`
  color: ${(props) => (props.transaction === 0 ? "#03AC00" : "#C70000")};
  text-align: right;
`;
const DescriptionSpan = styled.span`
  color: #000000;
  width: 100%;
  text-indent: 10px;
  text-align: left;
`;
const DateSpan = styled.span`
  color: #c6c6c6;
  text-align: left;
`;
const EmptyTransactionsMessage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #868686;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  color: #fff;
  font-size: 26px;
  font-weight: 700;
  line-height: 31px;
  margin-bottom: 22px;
`;
const TransactionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  max-height: calc(100vh - 261px);
  width: 100%;
`;
const Content = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - 221px);
  border-radius: 5px;
  padding: 24px 12px 40px;
  background: #fff;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
`;
const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  p:hover,
  button:hover,
  svg:hover {
    filter: contrast(120%);
  }
  p:active,
  button:active,
  svg:active {
    filter: contrast(80%);
  }
`;
const Button = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  border: none;
  cursor: pointer;
  svg {
    font-size: 25px;
  }
  padding: 9px;
  color: #fff;
  text-align: left;
  font-size: 17px;
  font-weight: 700;
  line-height: 20px;
  width: calc(50% - 8px);
  min-height: 114px;
  background: #a328d6;
  border-radius: 5px;
`;
const ExitButton = styled(RiLogoutBoxRLine)`
  cursor: pointer;
`;
export {
  BalanceContainer,
  BalanceText,
  BalanceValue,
  TransactionContainer,
  ValueSpan,
  DescriptionSpan,
  DateSpan,
  EmptyTransactionsMessage,
  Container,
  Header,
  TransactionsContainer,
  Content,
  Actions,
  Button,
  ExitButton,
};
