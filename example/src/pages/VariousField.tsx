import {
  bindCheckbox,
  bindRadio,
  bindSelect,
  bindTextArea,
  bindTextField,
  MinLength,
  OneOf,
  useForm,
} from "@somq14/use-form";
import React from "react";

type Form = {
  textField: string;
  textArea: string;
  checkbox: string;
  select: string;
  radio: string;
};

export const VariousField: React.FC = () => {
  const { form, validateAll, validated } = useForm<Form>({
    textField: {
      rules: [MinLength(1)],
    },
    textArea: {
      rules: [MinLength(1)],
    },
    checkbox: {
      rules: [OneOf(["true"])],
    },
    radio: {
      rules: [OneOf(["x", "y"])],
    },
    select: {
      rules: [OneOf(["a", "b", "c"])],
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateAll()) {
      return;
    }
    const formValue = validated();
    alert(JSON.stringify(formValue, undefined, 2));
  };

  return (
    <div>
      <h1>various field</h1>
      <form className="card" onSubmit={onSubmit}>
        <label htmlFor="text-field">Text Field</label>
        <input
          id="text-field"
          type="text"
          maxLength={32}
          {...bindTextField(form.textField)}
        />
        {form.textField.errors.length > 0 && (
          <div className="error">required</div>
        )}

        <label htmlFor="text-area">Text Area</label>
        <textarea id="text-area" {...bindTextArea(form.textArea)}></textarea>
        {form.textArea.errors.length > 0 && (
          <div className="error">required</div>
        )}

        <label>Checkbox</label>
        <div>
          <input
            id="checkbox"
            type="checkbox"
            {...bindCheckbox(form.checkbox)}
          ></input>
          <label htmlFor="checkbox">enable</label>
        </div>
        {form.checkbox.errors.length > 0 && (
          <div className="error">required</div>
        )}

        <label htmlFor="radio">Radio</label>
        <div>
          <input
            id="radio-x"
            name="radio-group"
            type="radio"
            {...bindRadio(form.radio, "x")}
          ></input>
          <label htmlFor="radio-x">X</label>
        </div>
        <div>
          <input
            id="radio-y"
            name="radio-group"
            type="radio"
            {...bindRadio(form.radio, "y")}
          ></input>
          <label htmlFor="radio-y">Y</label>
        </div>
        {form.radio.errors.length > 0 && <div className="error">required</div>}

        <label htmlFor="select">Select</label>
        <select id="select" {...bindSelect(form.select)}>
          <option value="">not selected</option>
          <option value="a">option A</option>
          <option value="b">option B</option>
          <option value="c">option C</option>
        </select>
        {form.select.errors.length > 0 && <div className="error">required</div>}

        <input type="submit" value="submit" />
      </form>
    </div>
  );
};
