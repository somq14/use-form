import {
  bindCheckbox,
  bindRadio,
  bindSelect,
  bindTextArea,
  bindTextField,
  BooleanType,
  MinLength,
  OneOf,
  useForm,
} from "@somq14/use-form";
import React from "react";

type Form = {
  textField: string;
  textArea: string;
  checkbox: boolean;
  select: string;
  radio: string;
};

export const VariousField: React.FC = () => {
  const form = useForm<Form>({
    textField: {
      rules: [MinLength(1)],
    },
    textArea: {
      rules: [MinLength(1)],
    },
    checkbox: {
      type: BooleanType,
      rules: [OneOf(["true"])],
    },
    radio: {
      rules: [OneOf(["x", "y"])],
    },
    select: {
      rules: [OneOf(["a", "b", "c"])],
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!(await form.validate())) {
      return;
    }
    const formValue = await form.convert();
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
          {...bindTextField(form.fields.textField)}
        />
        {form.fields.textField.errors.length > 0 && (
          <div className="error">required</div>
        )}

        <label htmlFor="text-area">Text Area</label>
        <textarea
          id="text-area"
          {...bindTextArea(form.fields.textArea)}
        ></textarea>
        {form.fields.textArea.errors.length > 0 && (
          <div className="error">required</div>
        )}

        <label>Checkbox</label>
        <div>
          <input
            id="checkbox"
            type="checkbox"
            {...bindCheckbox(form.fields.checkbox)}
          ></input>
          <label htmlFor="checkbox">enable</label>
        </div>
        {form.fields.checkbox.errors.length > 0 && (
          <div className="error">required</div>
        )}

        <label htmlFor="radio">Radio</label>
        <div>
          <input
            id="radio-x"
            name="radio-group"
            type="radio"
            {...bindRadio(form.fields.radio, "x")}
          ></input>
          <label htmlFor="radio-x">X</label>
        </div>
        <div>
          <input
            id="radio-y"
            name="radio-group"
            type="radio"
            {...bindRadio(form.fields.radio, "y")}
          ></input>
          <label htmlFor="radio-y">Y</label>
        </div>
        {form.fields.radio.errors.length > 0 && (
          <div className="error">required</div>
        )}

        <label htmlFor="select">Select</label>
        <select id="select" {...bindSelect(form.fields.select)}>
          <option value="">not selected</option>
          <option value="a">option A</option>
          <option value="b">option B</option>
          <option value="c">option C</option>
        </select>
        {form.fields.select.errors.length > 0 && (
          <div className="error">required</div>
        )}

        <input type="submit" value="submit" />
      </form>
    </div>
  );
};
