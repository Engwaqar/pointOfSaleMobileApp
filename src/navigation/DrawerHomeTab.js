import * as React from 'react';
import { Text, View, Image, Alert } from "react-native";
import Icon from '../components/Icon';
import ResponsiveText from '../components/RnText';
import { globalPath } from '../constants/globalPath';
import { colors } from '../constants/colorsPallet';
import { routeName } from '../constants/routeName';
import { hp, wp } from '../helpers/Responsiveness';
import MyOrders from '../screens/MyAccount/MyOrders';
import Home from '../screens/Home/Home';
import { SafeAreaView } from 'react-native-safe-area-context';
import FastImage from "react-native-fast-image";
import MyFavList from '../screens/MyAccount/MyFavList';
import Login from '../screens/Auth/Login/Login';
import AsyncStorage from "@react-native-community/async-storage";
import { StackActions } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
  DrawerNavigationOptions,
  DrawerItem,
} from "@react-navigation/drawer";
import { Drawer } from "react-native-paper";
import AllCategoriesList from '../screens/Categories/AllCategoriesList';
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from '../redux/actions/user.actions';

const DrawerTab = createDrawerNavigator();
function CustomDrawerContent(props) {
  const isloggedIn = useSelector(state => state.userReducers.loginScreen.isloggedIn)
  const [active, setActive] = React.useState("");
  const dispatch = useDispatch();
  const logout = () => {
    Alert.alert("Logout", "Confirm Logout", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          // await AsyncStorage.removeItem('@token');
          // await AsyncStorage.removeItem('@userId');
          // await AsyncStorage.removeItem('@UserTypeId');
          await AsyncStorage.clear();
          dispatch(logoutUser());
          // props.navigation.replace(routeName.HOME);
          props.navigation.dispatch(StackActions.replace("BOTTOM_TABS"));
        },
      },
    ]);
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        <SafeAreaView
          style={{
            height: hp(18),
            width: wp(70),
            backgroundColor: colors.primary,
            paddingTop: hp(3.2),
            paddingHorizontal: wp(3),
            paddingBottom: hp(5),
          }}
        >
          <FastImage
            source={globalPath.logo}
            style={{ height: hp(10), width: wp(65) }}
          />
        </SafeAreaView>

        <DrawerItemList {...props} />
        {isloggedIn == true ?
          <Drawer.Section>
            <Drawer.Item
              icon={({ color, size }) => (
                <Icon
                  source={globalPath.loogout}
                  color={color}
                  size={size}
                />
              )}
              label="Logout"
              onPress={() => {
                logout();
              }}
            />
          </Drawer.Section>
          : null}
      </DrawerContentScrollView>
    </View>
  );
}
export default function DrawerHomeTab(props) {

  return (
    <DrawerTab.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ route }) => ({
        drawerStyle: {
          backgroundColor: colors.white,
          width: wp(70),
        },
        drawerIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === routeName.HOME) {
            iconName = focused ? globalPath.home : globalPath.home
          }
          if (route.name === routeName.MY_ORDERS_LIST) {
            size = 30, iconName = focused ? globalPath.MyOrder : globalPath.MyOrder
          }
          if (route.name === routeName.ALL_CATEGORY_LIST) {
            iconName = focused ? globalPath.Category : globalPath.Category
          }
          if (route.name === routeName.MY_FAV_LIST) {
            size = 30, iconName = focused ? globalPath.wishlistIcon : globalPath.wishlistIcon
          }
          if (route.name === routeName.LOGIN) {
            iconName = focused ? globalPath.ChangePassword : globalPath.ChangePassword
          }
          if (route.name === routeName.NOTIFICATION) {
            iconName = focused ? globalPath.loogout : globalPath.loogout
          }
          // You can return any component that you like here!
          return <Icon source={iconName} size={size} color={color} />;
        },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.black,
        drawerActiveBackgroundColor: colors.grey

      })}>
      <DrawerTab.Screen
        name={routeName.HOME}
        component={Home}
        options={{
          headerShown: false,
          title: 'Home'

        }}
      />
      <DrawerTab.Screen
        name={routeName.MY_ORDERS_LIST}
        component={MyOrders}
        options={{
          headerShown: false,
          title: 'My Orders'

        }}
      />
      <DrawerTab.Screen
        name={routeName.ALL_CATEGORY_LIST}
        component={AllCategoriesList}
        options={{
          headerShown: false,
          title: 'Categories'

        }}
      />
      <DrawerTab.Screen
        name={routeName.MY_FAV_LIST}
        component={MyFavList}
        options={{
          headerShown: false,
          title: 'Wish List',

        }}
      />
      <DrawerTab.Screen
        name={routeName.LOGIN}
        component={Login}
        options={{
          headerShown: false,
          title: 'Change password'

        }}
      />
      {/* <DrawerTab.Screen
        name={routeName.NOTIFICATION}
        component={logout}
        options={{
          headerShown: false,
          title: 'Logout'

        }}
      /> */}
    </DrawerTab.Navigator>
  );
}
