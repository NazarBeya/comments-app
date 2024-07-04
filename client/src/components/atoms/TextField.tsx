import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Text, TextInput, TextInputProps, View } from "react-native";

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
  if (!isControled)
    return (
      <View>
        {label && <Text>{label}</Text>}
        <TextInput
          {...rest}
          className=" bg-gray-200/50 p-3 rounded-xl border border-black-200/10"
        />
      </View>
    );

  if (isControled) {
    const { control } = useFormContext();

    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <View>
            {label && <Text className=" p-1">{label}</Text>}
            <TextInput
              {...rest}
              value={value}
              onChangeText={onChange}
              className=" bg-gray-200/50 p-3 rounded-xl border border-black-200/10"
            />
          </View>
        )}
      />
    );
  }
};

export { TextField };
