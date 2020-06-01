import React from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";

import Homepage from "./pages";
import Adminpage from "./pages/Adminpage";
import Employeepage from "./pages/Employeepage";
import Pagenotfound from "./pages/Pagenotfound";
import { AppEmployeesProvider } from "./reducer";

const Container = styled.div`
  margin: 0 auto;
  width: 960px;
  max-width: 100%;
`;

const App = () => {
  return (
    <div className="main-wrapper">
      <Container>
        <AppEmployeesProvider>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/admin" component={Adminpage} />
            <Route path="/employee" component={Employeepage} />
            <Route component={Pagenotfound} />
          </Switch>
        </AppEmployeesProvider>
      </Container>
    </div>
  );
};

export default App;
