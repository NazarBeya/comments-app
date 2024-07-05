import { StyleSheet } from "react-native";
import { scale } from "../../styles/scaling";

const styles = () =>
  StyleSheet.create({
    avatarContainer: {
      justifyContent: "center",
      alignItems: "center",
      padding: scale(10),
    },

    container: {
      gap: scale(10),
      padding: scale(15),
    },
  });

export default styles;
