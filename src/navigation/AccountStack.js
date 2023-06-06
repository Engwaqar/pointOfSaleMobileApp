import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { routeName } from '../constants/routeName';
import Login from '../screens/Auth/Login/Login';
import Register from '../screens/Auth/Login/Register';
import Splash from '../screens/Auth/splash/Splash';
import SplashSlider from '../screens/Auth/splash/SplashSlider';
import CategoryList from '../screens/Categories/CategoryList';
import PaymentMethod from '../screens/Categories/PaymentMethod';
import ProductDetail from '../screens/Categories/ProductDetail';
import ShoppingCart from '../screens/Categories/ShoppingCart';
import DetailAllItem from '../screens/Home/DetailAllItem';
import Home from '../screens/Home/Home';
import ViewAllItemScreen from '../screens/Home/ViewAllItemScreen';
import EditProfile from '../screens/MyAccount/EditProfile';
import MyFavList from '../screens/MyAccount/MyFavList';
import MyOrders from '../screens/MyAccount/MyOrders';
import OrderDetail from '../screens/MyAccount/OrderDetail';
import Profile from '../screens/MyAccount/Profile';
import NotifactionList from '../screens/Notification/NotificationList';
import BottomTabs from './BottomTabs';

const Stack = createNativeStackNavigator();


function AccountStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
     initialRouteName={routeName.HOME}
    >
      <Stack.Screen name={routeName.PROFILE} component={Profile} /> 
      <Stack.Screen name={routeName.VIEW_ALL_ITEM} component={ViewAllItemScreen} /> 
      <Stack.Screen name={routeName.NOTIFICATION} component={NotifactionList} /> 
      <Stack.Screen name={routeName.DETAIL_ALL_ITEM} component={DetailAllItem} /> 
      <Stack.Screen name={routeName.MY_FAV_LIST} component={MyFavList} /> 
      <Stack.Screen name={routeName.EDIT_PROFILE} component={EditProfile} /> 
      <Stack.Screen name={routeName.MY_ORDERS_LIST} component={MyOrders} />
      <Stack.Screen name={routeName.ORDERS_DETAILS} component={OrderDetail} />


    </Stack.Navigator>
  )
}
export default AccountStack
