import React, { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import DLInfo from "./components/pages/DLInfo";
import Results from "./components/pages/Results";
import Election from "./components/pages/Election";
import Home from "./components/pages/Home";
import LoginLayout from "./components/login/LoginLayout";
import Login from "./components/login/Login"
import NewUser from "./components/login/NewUser"

const Router = (props) => {

const history = useHistory();
const [username, setUsername] = useState();
const [password, setPassword] = useState();

  return (
    <Switch>
      <Route exact path={"/"}>
        <Home {...props} />
      </Route>
      <Route exact path="/elections">
        <Home {...props} />
      </Route>
      <Route path="/new-user">
        <LoginLayout>
          <NewUser {...props} username={username} setUsername={setUsername} 
            password={password} setPassword={setPassword}/>
        </LoginLayout>
      </Route>
      <Route path="/elections/:topicId">
       
          <Election {...props}  username={username} setUsername={setUsername} 
            password={password} setPassword={setPassword} history={history}/>
       
      </Route>
      <Route path="/learn-more">
        <DLInfo />
      </Route>
      <Route path="/results">
        <Results />
      </Route>
    </Switch>
  );
};

export default Router;
