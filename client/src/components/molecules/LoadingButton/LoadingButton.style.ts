import { StyleSheet } from "react-native";
import { scale } from "../../../styles/scaling";

const styles = () =>
  StyleSheet.create({
    container: {
      borderWidth: scale(1),
      justifyContent: "center",
      borderRadius: scale(12),
      backgroundColor: "black",
      padding: scale(10),
      flexDirection: "row",
    },
    titleStyle: {
      color: "white",
    },
  });

export default styles;
