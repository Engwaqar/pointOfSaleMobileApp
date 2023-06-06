import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../constants/colorsPallet";
import { wp } from "../helpers/Responsiveness";

const Card = (props) => {
  return (
    <View style={[styles.container, { flexDirection: props.flexDirection },props.style?props.style:{}]}>
      {props.children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    elevation: 9,
    shadowColor: colors.green,
    shadowOpacity: 0.2,
     padding: 10,
     flex:0,
     width: wp(28), alignItems: 'center', justifyContent: 'center', height: wp(31),
     justifyContent:'center',
    // paddingVertical:15,
    // paddingHorizontal:10,
    alignItems:'center',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    backgroundColor: colors.white,
    margin: 5,
    borderRadius: 10,
  },
});
