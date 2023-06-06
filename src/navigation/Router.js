import React from 'react';
import HomeStack from './HomeStack';
import AuthStack from './AuthStack';
import {NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routeName } from '../constants/routeName';
import Splash from '../screens/Auth/splash/Splash';
import BottomTabs from './BottomTabs';
import ProductDetail from '../screens/Categories/ProductDetail';
import ShoppingCart from '../screens/Categories/ShoppingCart';
import Login from '../screens/Auth/Login/Login';
import Home from '../screens/Home/Home';
import Register from '../screens/Auth/Login/Register';
import AdminHome from '../screens/AdminRole/AdminHome';
import OrderDetail from '../screens/MyAccount/OrderDetail';
import DrawerHomeTab from './DrawerHomeTab';
import CategoryList from '../screens/Categories/CategoryList';
import PaymentMethod from '../screens/Categories/PaymentMethod';
import Profile from '../screens/MyAccount/Profile';
import ViewAllItemScreen from '../screens/Home/ViewAllItemScreen';
import NotifactionList from '../screens/Notification/NotificationList';
import DetailAllItem from '../screens/Home/DetailAllItem';
import MyFavList from '../screens/MyAccount/MyFavList';
import EditProfile from '../screens/MyAccount/EditProfile';
import SearchScreen from '../screens/Home/SearchScreen';
import ViewAllFlashSales from '../screens/Home/ViewAllFlashSales';
import ViewAllBestProduct from '../screens/Home/ViewAllBestProduct';
import ItemDetail from '../screens/Home/ItemDetail';
import AllCategoriesList from '../screens/Categories/AllCategoriesList';
import ConfirmOrder from '../screens/Categories/ConfirmOrder';

const Router = () => {
  const [Token , setToken]= React.useState('');
  // React.useEffect(() => {
  //   async function fetchAndSetUser() 
  //   {
  //   const token = await AsyncStorage.getItem('@token');
  //   setToken(token);
  //   }
  //   fetchAndSetUser();
  // },[]);

    const Stack=createNativeStackNavigator();
  
  return (
    <NavigationContainer>
       <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={routeName.SPLASH} component={Splash} />

        <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name={routeName.BOTTOM_TABS} component={BottomTabs} />
      <Stack.Screen name={routeName.LOGIN} component={Login} />
      <Stack.Screen name={routeName.PRODUCT_DETAIL} component={ProductDetail} />
      <Stack.Screen name={routeName.SHOPPING_CART} component={ShoppingCart} />
      <Stack.Screen name={routeName.REGISTER} component={Register} />
      <Stack.Screen name={routeName.ADMIN_HOME} component={AdminHome} />
      <Stack.Screen name={routeName.ORDERS_DETAILS} component={OrderDetail} />
      <Stack.Screen name={routeName.DRAWER_TAB} component={DrawerHomeTab} />
      <Stack.Screen name={routeName.HOME} component={Home} />
      <Stack.Screen name={routeName.CATEGORY_LIST} component={CategoryList} />
      <Stack.Screen name={routeName.PAYMENT_METHOD} component={PaymentMethod} />
      <Stack.Screen name={routeName.PROFILE} component={Profile} />
      <Stack.Screen name={routeName.VIEW_ALL_ITEM} component={ViewAllItemScreen} />
      <Stack.Screen name={routeName.NOTIFICATION} component={NotifactionList} />
      <Stack.Screen name={routeName.DETAIL_ALL_ITEM} component={DetailAllItem} />
      <Stack.Screen name={routeName.MY_FAV_LIST} component={MyFavList} />
      <Stack.Screen name={routeName.EDIT_PROFILE} component={EditProfile} />
      <Stack.Screen name={routeName.SEARCH_SCREEN} component={SearchScreen} />
      <Stack.Screen name={routeName.VIEW_ALL_FLASH_LIST} component={ViewAllFlashSales} />
      <Stack.Screen name={routeName.VIEW_ALL_BEST_PRODUCT} component={ViewAllBestProduct} />
      <Stack.Screen name={routeName.ITEM_DETAIL} component={ItemDetail} />
      <Stack.Screen name={routeName.ALL_CATEGORY_LIST} component={AllCategoriesList} />
      <Stack.Screen name={routeName.CONFIRM_ORDER} component={ConfirmOrder} />

        {/* <Stack.Screen name="Home" component={DrawerTab} /> */}
      </Stack.Navigator>
      {/* {Token === '' || Token === null?<AuthStack/> :<HomeStack /> } */}
      
      {/* <DrawerStack/> */}
    </NavigationContainer>
  );
};

export default Router;
