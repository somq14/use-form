import { useForm, bindField } from "@somq14/use-form";
import React from "react";
import "./BasicForm.css";

type LoginForm = {
  userId: string;
  password: string;
};

export const BasicForm: React.FC = () => {
  const { form, validated } = useForm<LoginForm>({
    userId: {},
    password: {},
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValue = validated();
    alert(`userId: ${formValue.userId} password: ${formValue.password}`);
  };

  return (
    <div className="basic-form">
      <h1>basic form</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="user-id">USER ID</label>
        <input id="user-id" type="text" {...bindField(form.userId)} />

        <label htmlFor="password">PASSWORD</label>
        <input id="password" type="password" {...bindField(form.password)} />

        <input type="submit" />
      </form>
    </div>
  );
};
