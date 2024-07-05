import { useState } from "react";
import {
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
  ImagePickerResult,
  MediaTypeOptions,
} from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";

export default function useImagePicker({
  formDataFieldName,
}: {
  formDataFieldName: string;
}) {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileFormData, setFileFormData] = useState<FormData | null>(null);

  const [file, setFile] = useState<any>(null);

  const pickImage = async () => {
    const { status } = await requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result: ImagePickerResult = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,

      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      setImageUri(uri);

      uriToFile(uri);
    }
  };

  const uriToFile = async (uri: string) => {
    try {
      setIsLoading(true);
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const binaryBuffer = Buffer.from(base64, "base64");

      const file = {
        fieldName: "file",
        originalName: uri.split("/").pop(),
        encoding: "7bit",
        mimeType: "image/jpeg",
        buffer: binaryBuffer,
      };

      setIsLoading(false);

      setFile(file);
      const formData = new FormData() as any;

      formData.append(formDataFieldName, {
        uri: "data:image/jpg;base64," + base64,
        type: "image/jpg",
        name: file.originalName,
      });

      setFileFormData(formData);

      return file;
    } catch (error) {
      throw new Error("Failed to convert URI to File");
    }
  };

  return {
    imageUri,
    pickImage,
    isLoading,
    file,
    fileFormData,
  };
}
