import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../constants/colorsPallet";
import { wp } from "../helpers/Responsiveness";
import ResponsiveText from "./RnText";

const OrderCard = (props) => {
  return (
    <View style={styles.cardView}>
      <View
        style={{
          backgroundColor: colors.primary,
          paddingHorizontal: 8,
          padding: 5,
          borderRadius: 5,
          margin:5
        }}
      >
        <ResponsiveText weight={"bold"} color={colors.white}>
          {props.title}
        </ResponsiveText>
      </View>
      {props.children}
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  cardView: {
    backgroundColor: colors.lightGrey,
    alignItems: "flex-start",
    margin: 13,
    // padding: 10,
  },
});
