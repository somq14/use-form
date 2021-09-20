import {
  useForm,
  bindTextField,
  MinLength,
  MaxLength,
  Pattern,
} from "@somq14/use-form";
import React from "react";

type PasswordForm = {
  password: string;
};

export const ValidatedForm: React.FC = () => {
  const form = useForm<PasswordForm>({
    password: {
      rules: [
        MinLength(8, "at least 8 characters"),
        MaxLength(32, "at most 32 characters"),
        Pattern(/^[a-zA-Z0-9]+$/, "only alphanumeric are allowed"),
      ],
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!(await form.validate())) {
      return;
    }

    const formValue = await form.convert();
    alert(`password: ${formValue.password}`);
  };

  return (
    <div>
      <h1>validated form</h1>
      <form className="card" onSubmit={onSubmit}>
        <label htmlFor="password">PASSWORD</label>
        <input
          id="password"
          type="text"
          maxLength={32}
          {...bindTextField(form.fields.password)}
        />

        {form.fields.password.errors.length > 0 && (
          <div className="error">
            <p>field has errors</p>
            <ul>
              {form.fields.password.errors.map((error) => (
                <li key={error.ruleName}>{error.message}</li>
              ))}
            </ul>
          </div>
        )}

        <input type="submit" value="submit" />
      </form>
    </div>
  );
};
