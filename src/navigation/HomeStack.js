import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { routeName } from "../constants/routeName";
import CategoryList from "../screens/Categories/CategoryList";
import PaymentMethod from "../screens/Categories/PaymentMethod";
import ProductDetail from "../screens/Categories/ProductDetail";
import ShoppingCart from "../screens/Categories/ShoppingCart";
import DetailAllItem from "../screens/Home/DetailAllItem";
import Home from "../screens/Home/Home";
import ItemDetail from "../screens/Home/ItemDetail";
import SearchScreen from "../screens/Home/SearchScreen";
import ViewAllBestProduct from "../screens/Home/ViewAllBestProduct";
import ViewAllFlashSales from "../screens/Home/ViewAllFlashSales";
import ViewAllItemScreen from "../screens/Home/ViewAllItemScreen";
import OrderDetail from "../screens/MyAccount/OrderDetail";


const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={routeName.HOME}
    >
      <Stack.Screen name={routeName.HOME} component={Home} />
      <Stack.Screen name={routeName.CATEGORY_LIST} component={CategoryList} />
      <Stack.Screen name={routeName.PRODUCT_DETAIL} component={ProductDetail} />
      <Stack.Screen name={routeName.SHOPPING_CART} component={ShoppingCart} />
      <Stack.Screen name={routeName.PAYMENT_METHOD} component={PaymentMethod} />
      <Stack.Screen name={routeName.VIEW_ALL_ITEM} component={ViewAllItemScreen} />
      <Stack.Screen name={routeName.DETAIL_ALL_ITEM} component={DetailAllItem} />
      <Stack.Screen name={routeName.SEARCH_SCREEN} component={SearchScreen} />
      <Stack.Screen name={routeName.VIEW_ALL_FLASH_LIST} component={ViewAllFlashSales} />
      <Stack.Screen name={routeName.VIEW_ALL_BEST_PRODUCT} component={ViewAllBestProduct} />
      <Stack.Screen name={routeName.ITEM_DETAIL} component={ItemDetail} />
      <Stack.Screen name={routeName.ORDERS_DETAILS} component={OrderDetail} />


    </Stack.Navigator>
  );
}

export default HomeStack;
