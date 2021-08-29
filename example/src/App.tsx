import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { BasicForm } from "./pages/BasicForm";
import { TopPage } from "./pages/TopPage";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <main>
        <Switch>
          <Route exact path="/">
            <TopPage></TopPage>
          </Route>
          <Route exact path="/basic">
            <BasicForm></BasicForm>
          </Route>
          <Route path="*">
            <Redirect to="/"></Redirect>
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
};
