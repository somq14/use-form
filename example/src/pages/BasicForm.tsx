import { useForm, bindTextField } from "@somq14/use-form";
import React from "react";

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
    alert(`userId: ${formValue.userId}\npassword: ${formValue.password}`);
  };

  return (
    <div>
      <h1>basic form</h1>
      <form className="card" onSubmit={onSubmit}>
        <label htmlFor="user-id">USER ID</label>
        <input id="user-id" type="text" {...bindTextField(form.userId)} />

        <label htmlFor="password">PASSWORD</label>
        <input
          id="password"
          type="password"
          {...bindTextField(form.password)}
        />

        <input type="submit" value="submit" />
      </form>
    </div>
  );
};
