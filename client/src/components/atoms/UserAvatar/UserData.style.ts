import { StyleSheet } from "react-native";
import { scale, verticalScale } from "../../../styles/scaling";

const styles = () =>
  StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: scale(10),
    },
    image: {
      width: scale(40),
      height: verticalScale(40),
      borderRadius: scale(100),
    },
  });

export default styles;
