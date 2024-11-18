import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import {Canvas} from "./ui/Canvas/Canvas.tsx";
import {initialEdges} from "./data/edges.ts";
import {initialNodes} from "./data/nodes.ts";

import styled from 'styled-components';
import Kanban from "./ui/Kanban/Kanban.tsx";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #f4f4f4;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const MainSpace = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const LinkStyled = styled(Link)`
  display: block;
  margin-bottom: 10px;
  text-decoration: none;
  color: #333;
  &:hover {
    text-decoration: underline;
  }
`;

const Home = () => <div>Home Page</div>;
const Board = () => <div>Kanban Board</div>;
const Canvas = () => <Canvas initialEdges={initialEdges} initialNodes={initialNodes} />
;

function App() {
    return (
        <Router>
            <AppContainer>
                <Sidebar>
                    <h2>Menu</h2>
                    <LinkStyled to="/">Home</LinkStyled>
                    <LinkStyled to="/kanban">Kanban</LinkStyled>
                    <LinkStyled to="/canvas">Canvas</LinkStyled>
                </Sidebar>
                <MainSpace>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/kanban" element={<Kanban />} />
                        <Route path="/canvas" element={<Canvas />} />
                    </Routes>
                </MainSpace>
            </AppContainer>
        </Router>
    );
}

export default App;

