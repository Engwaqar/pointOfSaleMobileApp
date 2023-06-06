import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ResponsiveText from "../components/RnText";
import { hp, wp } from "../helpers/Responsiveness";
import { colors } from "../constants/colorsPallet";
import Icon from "../components/Icon";
import { globalPath } from "../constants/globalPath";


const Steps = ({ first, second, third ,marginTop}) => {
  return (
    <View style={{ width: wp(80), alignSelf: "center", marginBottom: hp(3),marginTop:marginTop?hp(3):undefined }}>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: wp(4),
          alignItems: "center",
          marginTop:10
        }}
      >
        {first || second || third? (
          <Icon source={globalPath.tickIcon} />
         ) : (
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor: colors.black,
              borderRadius: 10,
            }}
          />
        )}
        <View
          style={{
            flex: 1,
            height: 2,
            backgroundColor: second || third ? colors.primary : colors.black,
          }}
        />

        {second ||third? (
          <Icon source={globalPath.tickIcon} />
        ) : (
          <View style={styles.smallCircle} />
        )}
        <View style={{ flex: 1, height: 2, backgroundColor: third ? colors.primary : colors.black }} />

        {third ? (
          <Icon source={globalPath.tickIcon} />
        ) : (
          <View style={styles.smallCircle} />
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 0,
        }}
      >
        <ResponsiveText size={2.7}>1. CheckOut</ResponsiveText>
        <ResponsiveText size={2.7}>2. Place Order</ResponsiveText>
        <ResponsiveText size={2.7}>3. Complete</ResponsiveText>
      </View>
    </View>
  );
};

export default Steps;

const styles = StyleSheet.create({
  smallCircle: {
    width: 20,
    height: 20,
    backgroundColor: colors.black,
    borderRadius: 10,
  },
});