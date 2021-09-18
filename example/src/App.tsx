import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { BasicForm } from "./pages/BasicForm";
import { TopPage } from "./pages/TopPage";
import { ValidatedForm } from "./pages/ValidatedForm";
import { VariousField } from "./pages/VariousField";

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
          <Route exact path="/validation">
            <ValidatedForm></ValidatedForm>
          </Route>
          <Route exact path="/various-field">
            <VariousField></VariousField>
          </Route>
          <Route path="*">
            <Redirect to="/"></Redirect>
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
};
