import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Text, View } from "react-native";
import { AvatarButton, LoadingButton } from "../../components/molecules";
import { TextField } from "../../components/atoms";
import styles from "./RegisterScreen.style";
import useImagePicker from "../../hooks/useImagePicker";
import { FormProvider, useForm } from "react-hook-form";
import { AuthFormValue, AuthSchema } from "../../../validation/AuthValidation";
import { useRegisterQuery } from "../../queries/authQueries/authQueries";
import { fetchRegister } from "../../services/AuthService";

const RegisterScreen = () => {
  const { container, avatarContainer } = styles();

  const { pickImage, imageUri, isLoading, file, fileFormData } = useImagePicker(
    {
      formDataFieldName: "userAvatar",
    }
  );

  const methods = useForm({
    resolver: yupResolver(AuthSchema),
  });

  const onSubmit = (data: AuthFormValue) => {
    const formData = new FormData();
    if (fileFormData) {
      formData.append("userAvatar", file);
    }
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("password", data.password);

    console.log(data);
    fetchRegister(formData);
  };

  useEffect(() => {
    if (fileFormData) {
      methods.setValue("file", fileFormData);
    }
  }, [fileFormData]);

  return (
    <View>
      <View style={avatarContainer}>
        <AvatarButton
          isLoading={isLoading}
          source={imageUri || ""}
          onPress={pickImage}
        />
      </View>
      <View style={container}>
        <FormProvider {...methods}>
          <TextField label="Name" isControled name="username" />
          <TextField label="Email" isControled name="email" />
          <TextField label="Password" isControled name="password" />
          <LoadingButton
            onPress={methods.handleSubmit(onSubmit)}
            title="submit"
          />
        </FormProvider>
      </View>
    </View>
  );
};

export { RegisterScreen };
