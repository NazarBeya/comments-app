import { StyleSheet } from "react-native";
import { scale } from "../../styles/scaling";

const styles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: "white",
      flex: 1,
      padding: scale(18),
      justifyContent: "space-between",
    },
    formContainer: {
      gap: scale(10),
    },
    registerButton: {
      textDecorationLine: "underline",
      color: "blue",
    },
  });

export default styles;
