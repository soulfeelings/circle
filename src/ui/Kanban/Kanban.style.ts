import styled from "styled-components";
import "@atlaskit/css-reset";

export const Board = styled.div`
  display: flex;
  gap: 20px;
`;



export const TaskCard = styled.div`
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: grab;
  transition: margin 0.2s ease;
  
  &:active {
    background-color: yellow;
  }
`;

export const Spacer = styled.div`
  height: 20px;
  background-color: rgba(0, 0, 0, 0.1);
`;