import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRef } from "react";
import { globalPath } from "../constants/globalPath";
import { colors } from "../constants/colorsPallet";
import { wp } from "../helpers/Responsiveness";
import HomeStack from "./HomeStack";
import Home from "../screens/Home/Home";
import Icon from "../components/Icon";
import AllCategoriesList from "../screens/Categories/AllCategoriesList";
import Profile from "../screens/MyAccount/Profile";
import NotifactionList from "../screens/Notification/NotificationList";
import ResponsiveText from "../components/RnText";
import CategoriesStack from "./CategoriesStack";
import AccountStack from "./AccountStack";
import MyOrders from "../screens/MyAccount/MyOrders";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderlist } from "../redux/actions/user.actions";
import DrawerHomeTab from "./DrawerHomeTab";
import AuthStack from "./AuthStack";
const Tab = createBottomTabNavigator();

// Hiding Tab Names...
export default function BottomTabs(props) {
  const dispatch = useDispatch();
  const GetAllOrders = useSelector(state => state.userReducers.AllOrderlist.data,);
  const isloggedIn = useSelector(state => state.userReducers.loginScreen.isloggedIn)
  const GetAllOrdersArray = Object.values(GetAllOrders);
  useEffect(() => {
    dispatch(getAllOrderlist());
  }, [])
  // console.log("route.params.isLoggedIn", props.route.params.isLoggedIn);
  const Login_Verification = useSelector(
    (state) => state.userReducers.loginScreen.data.loggedInUserTypeId
  );
  console.log("Login_Verification", Login_Verification);
  // Animated Tab Indicator...
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const result = GetAllOrdersArray.filter(item => item.seen == false)
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        style={{ marginHorizontal: 10 }}
        // sceneContainerStyle={{marginHorizontal:20,backgroundColor:'red'}}
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.grey5,

          // Floating Tab Bar...
          // tabBarLabelStyle: {
          //   fontSize: 10,
          //   fontWeight: "bold",
          // },
          tabBarStyle: {
            backgroundColor: colors.grey,
            height: 55,
            // borderRadius: 10,
            // borderBottomLeftRadius:20,
            // borderBottomRightRadius:20,
            // Shadow...
            shadowColor: colors.black,
            shadowOpacity: 0.1,
            shadowOffset: {
              width: 40,
              height: 90,
            },
            // marginBottom:isKeyboardVisible?-40:20,
            paddingHorizontal: 20,
            marginHorizontal: wp(2),
            position: "absolute",
            // justifyContent:'center',
            paddingTop: Platform.OS == "ios" ? 20 : 0,
          },
          //  }
        }}
      >
        <Tab.Screen
          name={"Home"}
          component={DrawerHomeTab}
          options={{
            tabBarIcon: ({ focused }) => (
              <View >
                <View>
                  <Image
                    source={globalPath.home}
                    resizeMode={"contain"}
                    style={{
                      width: 27,
                      height: 25,
                      tintColor: focused ? colors.primary : 'grey',
                    }}
                  ></Image>
                </View>
              </View>
            ),
          }}
        ></Tab.Screen>
        <Tab.Screen
          name={"Categories"}
          component={CategoriesStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <View >
                <View>
                  <Image
                    source={globalPath.Category}
                    resizeMode={"contain"}
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: focused ? colors.primary : 'grey',
                    }}
                  ></Image>
                </View>
              </View>
            ),
          }}
        >
        </Tab.Screen>
        {isloggedIn == true ?(
          <Tab.Screen
            name={"My Orders"}
            component={MyOrders}
            options={{
              tabBarIcon: ({ focused }) => (
                <View >
                  <View style={styles.inActiveTab}>
                    <Image
                      source={globalPath.MyOrder}
                      resizeMode={"contain"}
                      style={{
                        width: 25,
                        height: 25,
                        top: 11,
                        tintColor: focused ? colors.primary : 'grey',
                      }}
                    ></Image>
                  </View>
                  <View style={{
                    // position: 'absolute',
                    backgroundColor: colors.red,
                    width: 18,
                    height: 18,
                    borderRadius: 10,
                    // zIndex: 1,
                    // top: 0,
                    right: 0,
                    left: 15,
                    bottom: 18,

                  }}>
                    <ResponsiveText textAlign={'center'} color={colors.white}>{result.length ? result.length : '0'}</ResponsiveText>
                  </View>
                </View>
              ),
            }}
          >
          </Tab.Screen>
        ) : <Tab.Screen
          name={"Authstack2"}
          component={AuthStack}
          options={{
            title:'My Orders',
            tabBarIcon: ({ focused }) => (
              <View >
                <View style={styles.inActiveTab}>
                  <Image
                    source={globalPath.MyOrder}
                    resizeMode={"contain"}
                    style={{
                      width: 25,
                      height: 25,
                      top: 11,
                      tintColor: focused ? colors.primary : 'grey',
                    }}
                  ></Image>
                </View>
                <View style={{
                  // position: 'absolute',
                  backgroundColor: colors.red,
                  width: 18,
                  height: 18,
                  borderRadius: 10,
                  // zIndex: 1,
                  // top: 0,
                  right: 0,
                  left: 15,
                  bottom: 18,

                }}>
                  <ResponsiveText textAlign={'center'} color={colors.white}>{result.length ? result.length : '0'}</ResponsiveText>
                </View>
              </View>
            ),
          }}
        >
        </Tab.Screen>}
        {isloggedIn? (
          <Tab.Screen
            name={"My Profile"}
            component={AccountStack}
            options={{
              tabBarIcon: ({ focused }) => (
                <View >
                  <View>
                    <Image
                      source={globalPath.User}
                      resizeMode={"contain"}
                      style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? colors.primary : 'grey',
                      }}
                    ></Image>
                  </View>
                </View>
              ),
            }}
          ></Tab.Screen>
        ) : <Tab.Screen
          name={"Authstack3"}
          component={AuthStack}
          options={{
            title:'My Profile',
            tabBarIcon: ({ focused }) => (
              <View >
                <View>
                  <Image
                    source={globalPath.User}
                    resizeMode={"contain"}
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: focused ? colors.primary : 'grey',
                    }}
                  ></Image>
                </View>
              </View>
            ),
          }}
        ></Tab.Screen>}
      </Tab.Navigator>
    </View>
  );
}

function NotificationScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Notifications!</Text>
    </View>
  );
}
function History() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>History!</Text>
    </View>
  );
}
function Report() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>History!</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  ActiveTab: {
    width: 60,
    height: 60,
    backgroundColor: colors.primary,
    // borderRadius: 30,
    // borderWidth: 4,
    borderColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    // marginBottom:30
    // marginBottom: Platform.OS == "android" ?80 : 30
  },
  inActiveTab: {},
  TouchableTab: {
    backgroundColor: "white",
    padding: 2,
    width: 65,
    bottom: 20,
    height: 65,
    borderRadius: 30,
    alignItems: "center",
  },
});
