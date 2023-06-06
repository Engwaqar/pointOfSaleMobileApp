import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from 'react'
import Icon from "./Icon";
import ResponsiveText from "./RnText";
import { globalPath } from "../constants/globalPath";
import { colors } from "../constants/colorsPallet";
import { wp } from "../helpers/Responsiveness";
import Feather from "react-native-vector-icons/Feather";
import { TextInput } from "react-native-gesture-handler";
import Input from '../components/Input';
import { routeName } from "../constants/routeName";
import { useDispatch, useSelector } from "react-redux";
import { getCartlist } from "../redux/actions/user.actions";
import { createDrawerNavigator, } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { DrawerActions } from '@react-navigation/native';
export default function HomeHeader(props) {
  // const Tab = createDrawerNavigator();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const Cartlist = useSelector(state => state.userReducers.Cartlist.data,);
  const CartCount = Cartlist.objCartDetailDto ? Cartlist.objCartDetailDto.length : 0
  // console.log('first', CartCount)
  const isloggedIn = useSelector(state => state.userReducers.loginScreen.isloggedIn)
  useEffect(() => {
    dispatch(getCartlist());
  }, [])
  console.log('Cartlistlllllll', Cartlist)
  return (
    <View style={{
      height: (wp(20)),
      alignItems: "center",
      margin: wp(0),
      backgroundColor: colors.primary,
      marginTop: "7.8%"
    }}>

      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          marginHorizontal: 5,

        }}
      >
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
        >
          <Icon
            tintColor={colors.white}
            size={28}
            source={globalPath.DrawerIcon}
          />
        </TouchableOpacity>
        <View style={{ flex: 1, }}>
          <ResponsiveText textAlign={'center'} weight={'bold'} color={colors.white} size={4}>
            {props.title}
          </ResponsiveText>
          <ResponsiveText textAlign={'center'} weight={'bold'} color={colors.white} size={4}>
            {props.Itemtitle}
          </ResponsiveText>
        </View>
        <TouchableOpacity onPress={() => props.navigation.navigate(routeName.SEARCH_SCREEN)}>
          <Icon
            tintColor={colors.white}
            style={{ marginTop: 10, }}
            // borderRadius={30}
            size={40}
            margin={[0, 10, 0, 0]}
            resizeMode={"contain"}
            source={props.Search}
          />
        </TouchableOpacity>
        {isloggedIn == true ? (
          <TouchableOpacity onPress={() => props.navigation.navigate(routeName.SHOPPING_CART)}>
            <Icon
              tintColor={colors.white}
              style={{ marginTop: 20 }}
              // borderRadius={30}
              size={40}
              margin={[0, 10, 0, 0]}
              resizeMode={"contain"}
              source={props.AddToCart}
            />

            <View style={{
              // position: 'absolute',
              backgroundColor: colors.red,
              width: 18,
              height: 18,
              borderRadius: 10,
              zIndex: 1,
              // top: 5, 
              // right: 0,
              left: 20,
              bottom: 35,

            }}>
              <ResponsiveText textAlign={'center'} color={colors.white}>{CartCount}</ResponsiveText>
            </View>
          </TouchableOpacity>
        ) :
          (<TouchableOpacity onPress={() => props.navigation.navigate(routeName.LOGIN)}>
            <Icon
              tintColor={colors.white}
              style={{ marginTop: 20 }}
              // borderRadius={30}
              size={40}
              margin={[0, 10, 0, 0]}
              resizeMode={"contain"}
              source={props.AddToCart}
            />

            <View style={{
              // position: 'absolute',
              backgroundColor: colors.red,
              width: 18,
              height: 18,
              borderRadius: 10,
              zIndex: 1,
              // top: 5, 
              // right: 0,
              left: 20,
              bottom: 35,

            }}>
              <ResponsiveText textAlign={'center'} color={colors.white}>{CartCount}</ResponsiveText>
            </View>
          </TouchableOpacity>)}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  btnBack: {
    backgroundColor: colors.green5,
    padding: 12,
    borderRadius: 45,
    marginRight: 5
  },
  showPasswordBtn: {
    marginHorizontal: 0,
    backgroundColor: colors.white,
    paddingHorizontal: 70,
    paddingVertical: 10,
    marginBottom: 5,
    borderRadius: 20,
    marginLeft: 5
  },
  Search: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',

  },
});
