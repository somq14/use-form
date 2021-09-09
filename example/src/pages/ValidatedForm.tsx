import {
  useForm,
  bindField,
  MinLength,
  MaxLength,
  Pattern,
} from "@somq14/use-form";
import React from "react";

type PasswordForm = {
  password: string;
};

export const ValidatedForm: React.FC = () => {
  const { form, validateAll, validated } = useForm<PasswordForm>({
    password: {
      rules: [
        MinLength(8, "at least 8 characters"),
        MaxLength(32, "at most 32 characters"),
        Pattern(/^[a-zA-Z0-9]+$/, "only alphanumeric are allowed"),
      ],
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateAll()) {
      return;
    }

    const formValue = validated();
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
          {...bindField(form.password)}
        />

        {form.password.errors.length > 0 && (
          <div className="error">
            <p>field has errors</p>
            <ul>
              {form.password.errors.map((error) => (
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
