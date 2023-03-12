import { Autocomplete, TextField } from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";
import { type Control } from "react-hook-form";
import { useState } from "react";

const OPTIONS = ["1", "2", "3"];

const ArrayInput = ({
  control,
  name,
  type,
  label,
  isRequired,
}: {
  control: Control<FieldValues, any>;
  name: string;
  type: string;
  label?: string;
  isRequired?: boolean;
}) => {
  return (
    <Controller
      render={({ field: { onChange } }) => {
        return (
          <Autocomplete
            options={OPTIONS}
            getOptionLabel={(option) => option}
            multiple
            id="tags-standard"
            filterSelectedOptions
            noOptionsText={`No ${name} found`}
            renderInput={(params) => (
              <TextField
                {...params}
                {...(label ? { label } : { hiddenLabel: true })}
                variant="outlined"
                placeholder={"Choose " + name}
                name={name}
                required={isRequired}
              />
            )}
            onChange={(e, data) => {
              if (type === "number") {
                onChange(data.map((item) => parseInt(item)));
              } else {
                onChange(data);
              }
            }}
          />
        );
      }}
      name={name}
      control={control}
    />
  );
};

export default ArrayInput;
