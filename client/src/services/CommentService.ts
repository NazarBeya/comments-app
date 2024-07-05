import { $api } from "../http";

export const getAllComments = async () => {
  try {
    const response = await $api.get<TComment[]>("/comments");

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
