import { bindTextField, StringType, useForm } from "@somq14/use-form";
import React from "react";

type LoginForm = {
  userId: string;
  password: string;
};

export const BasicForm: React.FC = () => {
  const form = useForm<LoginForm>({
    userId: {
      type: StringType,
    },
    password: {
      type: StringType,
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValue = await form.convert();
    alert(`userId: ${formValue.userId}\npassword: ${formValue.password}`);
  };

  return (
    <div>
      <h1>basic form</h1>
      <form className="card" onSubmit={onSubmit}>
        <label htmlFor="user-id">USER ID</label>
        <input
          id="user-id"
          type="text"
          {...bindTextField(form.fields.userId)}
        />

        <label htmlFor="password">PASSWORD</label>
        <input
          id="password"
          type="password"
          {...bindTextField(form.fields.password)}
        />

        <input type="submit" value="submit" />
      </form>
    </div>
  );
};
