import { useState } from "react";
import FormFeedback from "./FormFeedback";
import styled from "styled-components";

interface FormInputProps {
  name: string;
  type: string;
  placeholder?: string;
  label: string;
  onChange: any;
  onBlur: any;
  value: any;
  validation: any;
  options?: string[];
  disabled?: boolean;
}

const FormInput = ({
  type,
  label,
  onChange,
  onBlur,
  value,
  placeholder,
  name,
  validation,
  options,
  disabled,
}: FormInputProps) => {
  if (type === "text") {
    return (
      <div className="mb-3 w-full">
        <label htmlFor={name} className="block text-sm font-medium">
          {label}
        </label>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          disabled={disabled}
          id={`input-${name}`}
          className="block border-[2px] rounded-md px-4 py-3 text-xs mt-2 w-full outline-none border-[#ececec] text-gray-800 font-medium bg-[var(--input-bg)] cursor-pointer"
        />
        {validation.touched[name] && validation.errors[name] ? (
          <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
        ) : null}
      </div>
    );
  }
  if (type === "textarea") {
    return (
      <div className="mb-3 w-full">
        <label htmlFor={name} className="block text-sm font-medium">
          {label}
        </label>
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          disabled={disabled}
          id={`input-${name}`}
          className="block border-[2px] rounded-md px-4 py-3 text-xs mt-2 w-full outline-none border-[#ececec] text-gray-800 font-medium bg-[var(--input-bg)] resize-y min-h-32 cursor-pointer"
        />
        {validation.touched[name] && validation.errors[name] ? (
          <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
        ) : null}
      </div>
    );
  }

  if (type === "select") {
    return (
      <div className="mb-3 w-full">
        <label htmlFor={name} className="block text-sm font-medium">
          {label}
        </label>
        <div className="relative flex items-center w-full">
          <SelectInput
            name={name}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            disabled={disabled}
            className="block border-[2px] rounded-md px-4 py-3 text-xs mt-2 w-full outline-none border-[#ececec] text-gray-800 font-medium bg-[var(--input-bg)] cursor-pointer relative"
          >
            <option value={""}>{placeholder}</option>
            {options &&
              options.map((opt) => (
                <option value={opt} className="px-4 py-2">
                  {opt.toUpperCase()}
                </option>
              ))}
          </SelectInput>

          <i className="fi fi-sr-caret-down absolute right-2 top-5 z-100"></i>
        </div>
        {validation.touched[name] && validation.errors[name] ? (
          <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
        ) : null}
      </div>
    );
  }

  if (type === "password")
    return (
      <PasswordInput
        {...{
          type,
          label,
          onChange,
          onBlur,
          value,
          placeholder,
          name,
          validation,
          disabled,
        }}
      />
    );

  if (type === "checkbox") {
    return (
      <CheckboxInput
        {...{
          type,
          label,
          onChange,
          onBlur,
          value,
          placeholder,
          name,
          validation,
          disabled,
        }}
      />
    );
  }
  return (
    <div className="mb-3 w-full">
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        disabled={disabled}
        id={`input-${name}`}
        className="block border-[2px] rounded-md px-4 py-3 text-xs mt-2 w-full outline-none border-[#ececec] text-gray-500 font-medium bg-[var(--input-bg)] cursor-pointer"
      />
      {validation.touched[name] && validation.errors[name] ? (
        <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
      ) : null}
    </div>
  );
};

const CheckboxInput = ({
  label,
  name,
  onBlur,
  onChange,
  value,
  disabled,
}: FormInputProps) => {
  return (
    <CheckboxContainer className="flex items-center gap-1">
      <input
        name={name}
        type="checkbox"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        id={`input-${name}`}
        className="w-4 h-4 inline-block checkbox__input"
      />
      <label
        htmlFor={`input-${name}`}
        className="block text-xs font-normal cursor-pointer text-gray-700 checkbox__label"
      >
        {label}
      </label>
    </CheckboxContainer>
  );
};

const PasswordInput = ({
  label,
  name,
  onBlur,
  onChange,
  value,
  type,
  placeholder,
  validation,
  disabled,
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="mb-3 w-full ">
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <div className="relative flex items-center w-full">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          disabled={disabled}
          id={`input-${name}`}
          className="block border-[2px] rounded-md px-4 py-3 text-xs mt-2 w-full outline-none border-[#ececec] text-gray-500 font-medium bg-[var(--input-bg)] cursor-pointer"
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          type="button"
          className="absolute right-2 top-5"
        >
          {showPassword ? (
            <i className="fi fi-sr-eye flex"></i>
          ) : (
            <i className="fi fi-sr-eye-crossed flex"></i>
          )}
        </button>
      </div>
      {validation.touched[name] && validation.errors[name] ? (
        <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
      ) : null}
    </div>
  );
};

const SelectInput = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const CheckboxContainer = styled.div`
  .checkbox__input {
    position: absolute;
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    opacity: 0;
  }

  .checkbox__label {
    position: relative;
    cursor: pointer;
    line-height: 24px;
    padding-top: 0px;
    padding-bottom: 2px;
    padding-left: 28px;
  }

  .checkbox__label:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 18px;
    height: 18px;
    margin: 3px;
    border: 2px #ececec solid;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-border-radius: 3px;
    border-radius: 3px;
  }

  .checkbox__input:checked ~ .checkbox__label:before {
    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgdmVyc2lvbj0iMS4xIgogICB2aWV3Qm94PSIwIDAgMSAxIgogICBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWluWU1pbiBtZWV0Ij4KICA8cGF0aAogICAgIGQ9Ik0gMC4wNDAzODA1OSwwLjYyNjc3NjcgMC4xNDY0NDY2MSwwLjUyMDcxMDY4IDAuNDI5Mjg5MzIsMC44MDM1NTMzOSAwLjMyMzIyMzMsMC45MDk2MTk0MSB6IE0gMC4yMTcxNTcyOSwwLjgwMzU1MzM5IDAuODUzNTUzMzksMC4xNjcxNTcyOSAwLjk1OTYxOTQxLDAuMjczMjIzMyAwLjMyMzIyMzMsMC45MDk2MTk0MSB6IgogICAgIGlkPSJyZWN0Mzc4MCIKICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lIiAvPgo8L3N2Zz4K");
    background-color: var(--base-color);
    border-color: var(--base-color);
    -webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiPjx0aXRsZT51bnRpdGxlZDwvdGl0bGU+PHBhdGggZD0iTTAsMFYxSDFWMEgwWk0wLjQ1LDAuNzRsLTAuMDguMDhMMC4yOCwwLjc0LDAuMTQsMC42bDAuMDgtLjA4TDAuMzYsMC42NWwwLjQxLS40MUwwLjg2LDAuMzJaIi8+PC9zdmc+");
    mask-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiPjx0aXRsZT51bnRpdGxlZDwvdGl0bGU+PHBhdGggZD0iTTAsMFYxSDFWMEgwWk0wLjQ1LDAuNzRsLTAuMDguMDhMMC4yOCwwLjc0LDAuMTQsMC42bDAuMDgtLjA4TDAuMzYsMC42NWwwLjQxLS40MUwwLjg2LDAuMzJaIi8+PC9zdmc+");
  }

  .checkbox__input:disabled ~ .checkbox__label {
    color: rgba(0, 0, 0, 0.38);
  }

  .checkbox__input:disabled ~ .checkbox__label:before {
    border-color: rgba(0, 0, 0, 0.26);
  }

  .checkbox__input:checked:disabled ~ .checkbox__label:before {
    background-color: rgba(0, 0, 0, 0.26);
    background-clip: padding-box;
  }

  .checkbox__description {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.54);
    margin-left: 28px;
  }

  .checkbox__input ~ .checkbox__label:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    -webkit-border-radius: 50%;
    border-radius: 50%;
  }

  .checkbox__input:focus ~ .checkbox__label:after {
    -webkit-animation: click-wave 0.5s;
    animation: click-wave 0.5s;
  }

  .checkbox__input:checked ~ .checkbox__label:after {
    background-color: var(--base-color);
  }

  .checkbox__input:not(:checked) ~ .checkbox__label:after {
    background-color: #000;
  }

  @-webkit-keyframes click-wave {
    0% {
      width: 24px;
      height: 24px;
      opacity: 0.5;
    }
    100% {
      width: 48px;
      height: 48px;
      margin-left: -12px;
      margin-top: -12px;
      opacity: 0;
    }
  }
  @keyframes click-wave {
    0% {
      width: 24px;
      height: 24px;
      opacity: 0.5;
    }
    100% {
      width: 48px;
      height: 48px;
      margin-left: -12px;
      margin-top: -12px;
      opacity: 0;
    }
  }
`;

export default FormInput;
