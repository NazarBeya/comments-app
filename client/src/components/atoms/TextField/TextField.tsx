import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Text, TextInput, TextInputProps, View } from "react-native";
import styles from "./TextField.style";

interface TextFieldProps extends TextInputProps {
  label?: string;
  name?: string;
  isControled?: boolean;
}

const TextField: FC<TextFieldProps> = ({
  label,
  name = "",
  isControled = false,
  ...rest
}) => {
  const { fieldStyle, labelStyle } = styles();

  if (!isControled)
    return (
      <>
        <View>
          {label && <Text style={labelStyle}>{label}</Text>}
          <TextInput {...rest} style={fieldStyle} />
        </View>
      </>
    );

  if (isControled) {
    const { control } = useFormContext();

    return (
      <>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <View>
              {label && <Text style={labelStyle}>{label}</Text>}
              <TextInput
                {...rest}
                value={value}
                onChangeText={onChange}
                style={fieldStyle}
              />
            </View>
          )}
        />
      </>
    );
  }
};

export { TextField };
