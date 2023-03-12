import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  type FieldValues,
  type UseFormRegister,
} from "react-hook-form";
import ArrayInput from "./ArrayInput";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { type Schema } from "../formSchema";
import { useFields } from "../hooks/useFields";

const Form = () => {
  const { fields, defaultValues, formSchema } = useFields();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitSuccessful },
    control,
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
    mode: "all",
  });

  const onSubmit = (data: Schema) => {
    console.log(data);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {fields.map((props) => (
          <div key={props.name} className="field">
            {props.isArray ? (
              <ArrayInput control={control} {...props} />
            ) : (
              <Input register={register} {...props} />
            )}
            {errors[props.name] && (
              <p style={{ color: "red" }}>
                {errors[props.name]!.message?.toString()}
              </p>
            )}
          </div>
        ))}
        <Button variant="contained" type="submit" disabled={!isValid}>
          Submit
        </Button>
      </form>
      {isSubmitSuccessful && (
        <div>
          <h2>Form data</h2>
          <pre>{JSON.stringify(watch(), null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

const Input = ({
  name,
  type,
  register,
  label,
  isRequired,
}: {
  name: string;
  type: string;
  register: UseFormRegister<FieldValues>;
  label?: string;
  isRequired?: boolean;
}) => {
  if (type === "checkbox") {
    return (
      <FormControlLabel
        control={<Checkbox />}
        label={`${label || name}`}
        id={name}
        {...register(name)}
      />
    );
  }
  return (
    <TextField
      {...register(name, {
        [type === "number" ? "valueAsNumber" : ""]: true,
        [type === "date" ? "setValueAs" : ""]: (value: string) => {
          if (value === "") return undefined;
          return new Date(value);
        },
      })}
      variant="standard"
      label={label || name}
      type={type}
      id={name}
      {...(type === "date" && {
        InputLabelProps: { shrink: true },
      })}
      required={isRequired}
    />
  );
};

export default Form;
