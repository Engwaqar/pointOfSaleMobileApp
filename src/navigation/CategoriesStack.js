import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { routeName } from "../constants/routeName";
import AllCategoriesList from "../screens/Categories/AllCategoriesList";
import CategoryList from "../screens/Categories/CategoryList";
import ProductDetail from "../screens/Categories/ProductDetail";

 

const Stack = createNativeStackNavigator();

function CategoriesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={routeName.BOTTOM_TABS}
    >
       <Stack.Screen name={routeName.ALL_CATEGORY_LIST} component={AllCategoriesList} /> 
       <Stack.Screen name={routeName.PRODUCT_DETAIL} component={ProductDetail} /> 
     
    </Stack.Navigator>
  );
}

export default CategoriesStack;
