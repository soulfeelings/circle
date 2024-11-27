import styled from "styled-components";
import {Link} from "react-router-dom";

export const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export const Sidebar = styled.div`
  width: 200px;
  background-color: #f4f4f4;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

export const MainSpace = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

export const LinkStyled = styled(Link)`
  display: block;
  margin-bottom: 10px;
  text-decoration: none;
  color: #333;

  &:hover {
    text-decoration: underline;
  }
`;