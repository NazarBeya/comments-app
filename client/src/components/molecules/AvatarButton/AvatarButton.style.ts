import { StyleSheet } from "react-native";
import { scale } from "../../../styles/scaling";

const styles = () =>
  StyleSheet.create({
    avatar: {
      width: scale(120),
      height: scale(120),
      borderRadius: scale(100),
      backgroundColor: "#2131",
      borderWidth: scale(1),
      borderColor: "black",
    },
    loaderConteiner: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    loader: {
      width: 100,
      height: 30,
    },
  });

export default styles;
