import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import {AppContainer, LinkStyled, MainSpace, Sidebar} from "./App.style.ts";
import {routes} from "./routes.tsx";


function App() {
    return (
        <Router>
            <AppContainer>
                <Sidebar>
                    <h2>Menu</h2>
                    {routes.map(({path, label}) => (
                        <LinkStyled key={path} to={path}>
                            {label}
                        </LinkStyled>
                    ))}
                </Sidebar>
                <MainSpace>
                    <Routes>
                        {routes.map(({path, element}) => (
                            <Route key={path} path={path} element={element}/>
                        ))}
                    </Routes>
                </MainSpace>
            </AppContainer>
        </Router>
    );
}

export default App;

