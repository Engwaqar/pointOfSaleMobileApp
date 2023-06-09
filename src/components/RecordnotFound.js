import React, { useEffect, version } from "react";

import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import { colors } from "../constants/colorsPallet";
import { globalPath } from "../constants/globalPath";
import { hp, wp } from "../helpers/Responsiveness";
import Icon from "./Icon";
import ResponsiveText from "./RnText";
export default function RecordNotFound(props) {
  return (
    <View style={{ width: wp(100),marginVertical:hp(15), alignItems: "center", alignSelf: "center",}}>
      <Icon size={hp(45)} source={globalPath.RecordNotFound} />
      <ResponsiveText margin={[-25, 0, 0, 0]} textAlign={"center"}>
        Record not found
      </ResponsiveText>
    </View>
  );
}
