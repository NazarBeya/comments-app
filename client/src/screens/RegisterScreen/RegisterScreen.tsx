import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Text, View } from "react-native";
import { AvatarButton, LoadingButton } from "../../components/molecules";
import { TextField } from "../../components/atoms";
import styles from "./RegisterScreen.style";
import useImagePicker from "../../hooks/useImagePicker";
import { FormProvider, useForm } from "react-hook-form";
import { AuthFormValue, AuthSchema } from "../../../validation/AuthValidation";
import { fetchRegister } from "../../services/AuthService";

const RegisterScreen = () => {
  const { container, avatarContainer } = styles();
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const { pickImage, imageUri, isLoading, file, fileFormData } = useImagePicker(
    {
      formDataFieldName: "userAvatar",
    }
  );

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
  });
  const onSubmit = async (data: AuthFormValue) => {
    if (!fileFormData) return;
    fileFormData.append("email", data.email);
    fileFormData.append("username", data.username);
    fileFormData.append("password", data.password);

    setIsAuthLoading(true);

    await fetchRegister(fileFormData);
    setIsAuthLoading(false);
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
            isLoaing={isAuthLoading}
            onPress={methods.handleSubmit(onSubmit)}
            title="submit"
          />
        </FormProvider>
      </View>
    </View>
  );
};

export { RegisterScreen };
