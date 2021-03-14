import React from "react";
import { Switch, Route } from 'react-router-dom';
import ListOfUsers from "./components/ListOfUsers";
import UserForm from "./components/UserForm";

const Routes = () => {
    return (
        <Switch>
            <Route path='/' component={ListOfUsers} exact />
            <Route path='/user/:id' component={UserForm} />
        </Switch>
    );
};

export default Routes;