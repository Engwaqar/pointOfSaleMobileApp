import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { routeName } from '../constants/routeName';
import AdminHome from '../screens/AdminRole/AdminHome';
import Login from '../screens/Auth/Login/Login';
// import Register from '../screens/Auth/Login/Register';
// import Splash from '../screens/Auth/splash/Splash';
import SplashSlider from '../screens/Auth/splash/SplashSlider';
// import CategoryList from '../screens/Categories/CategoryList';
// import PaymentMethod from '../screens/Categories/PaymentMethod';
// import ProductDetail from '../screens/Categories/ProductDetail';
// import ShoppingCart from '../screens/Categories/ShoppingCart';
// import DetailAllItem from '../screens/Home/DetailAllItem';
// import Home from '../screens/Home/Home';
// import ViewAllItemScreen from '../screens/Home/ViewAllItemScreen';
// import EditProfile from '../screens/MyAccount/EditProfile';
// import MyFavList from '../screens/MyAccount/MyFavList';
// import Profile from '../screens/MyAccount/Profile';
// import NotifactionList from '../screens/Notification/NotificationList';
// import BottomTabs from './BottomTabs';
// import OrderDetail from '../screens/MyAccount/OrderDetail';
// import DrawerHomeTab from './DrawerHomeTab';
// import SearchScreen from '../screens/Home/SearchScreen';
// import ViewAllFlashSales from '../screens/Home/ViewAllFlashSales';
// import ViewAllBestProduct from '../screens/Home/ViewAllBestProduct';
// import ItemDetail from '../screens/Home/ItemDetail';
// import AllCategoriesList from '../screens/Categories/AllCategoriesList';

const Stack = createNativeStackNavigator();


function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={routeName.LOGIN}
    >
      <Stack.Screen name={routeName.SPLASH_SLIDER} component={SplashSlider} />
      <Stack.Screen name={routeName.LOGIN} component={Login} />
      {/* <Stack.Screen name={routeName.REGISTER} component={Register} />
      <Stack.Screen name={routeName.BOTTOM_TABS} component={BottomTabs} />
      <Stack.Screen name={routeName.ADMIN_HOME} component={AdminHome} />
      <Stack.Screen name={routeName.ORDERS_DETAILS} component={OrderDetail} />
      <Stack.Screen name={routeName.DRAWER_TAB} component={DrawerHomeTab} />
      <Stack.Screen name={routeName.HOME} component={Home} />
      <Stack.Screen name={routeName.CATEGORY_LIST} component={CategoryList} />
      <Stack.Screen name={routeName.PRODUCT_DETAIL} component={ProductDetail} />
      <Stack.Screen name={routeName.SHOPPING_CART} component={ShoppingCart} />
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
      <Stack.Screen name={routeName.ALL_CATEGORY_LIST} component={AllCategoriesList} /> */}




    </Stack.Navigator>
  )
}
export default AuthStack
