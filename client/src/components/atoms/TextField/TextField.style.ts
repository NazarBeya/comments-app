import { StyleSheet } from "react-native";
import { scale } from "../../../styles/scaling";

const styles = () =>
  StyleSheet.create({
    fieldStyle: {
      backgroundColor: "#2131",
      padding: scale(10),
      borderRadius: scale(12),
      borderColor: "black",
      borderWidth: scale(1),
    },
    labelStyle: {
      padding: scale(4),
    },
  });

export default styles;
