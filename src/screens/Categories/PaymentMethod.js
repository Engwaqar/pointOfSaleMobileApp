import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../../components/HomeHeader";
import { colors } from "../../constants/colorsPallet";
import { globalPath } from "../../constants/globalPath";
import { ScrollView } from "react-native-gesture-handler";
import ResponsiveText from "../../components/RnText";
import { hp, wp } from "../../helpers/Responsiveness";
import Icon from "../../components/Icon";
import { routeName } from "../../constants/routeName";
import PaymentCard from "../../components/PaymentCard";
import { useState } from "react";
import { useEffect } from "react";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import {
  getAllOrderlist,
  getCartlist,
  getOrderHistory,
  get_cart_detail,
} from "../../redux/actions/user.actions";
import { useDispatch } from "react-redux";
import Card from "../../components/Card";
import CheckBox from "../../components/CheckBox";
import Loader from "../../components/Loader";
import RadioButton from "../../components/RadioButton";
import OrderCard from "../../components/OrderCard";
import ChatHeader from "../../components/ChatHeader";
import { _toast } from "../../constants/Index";
import Steps from "../../components/Steps";

const PaymentMethod = ({ navigation, route }) => {
  const { item } = route.params;
  console.log('item', item)
  const [selectPaymentMethod, setSelectPaymentMethod] = useState(1);
  // const [data, setData] = useState(route.params.cartData);
  const [Loading, setLoading] = useState(false);
  const [CurrentLocation, setCurrentLocation] = useState("Home");
  const [paymentData, setPaymentData] = useState([
    {
      paymentType: null,
      id: 1,
      name: "CashOnDelivery",
      accountNumber: "03001234567",
    },
    {
      paymentType: null,
      id: 2,
      name: "JazzCash",
      accountNumber: "03001234567",
    },
    {
      paymentType: null,
      id: 3,
      name: "EasyPaisa",
      accountNumber: "03001234567",
    },
  ]);
  const dispatch = useDispatch();
  const [SecondaryAddress, setSecondaryAddress] = useState("");
  const [errorString, setErrorString] = React.useState("");

  const Get_PaymentTypes = async () => {
    try {
      setLoading(true);
      const res = await Api.get(urls.GetPaymentType);
      console.log("GetPaymentType", res);
      if (res && res.success == true) {
        setLoading(false);
        setPaymentData(res.data);
      } else {
        // _toast(res.message)
        setLoading(false);
      }
    } catch (error) {
      // seterrorString(error);
      setLoading(false);
    }
  };
  const Submit_Order = async (id) => {
    setErrorString("");
    if (SecondaryAddress === ""  ) {
      setErrorString("Delivery Address required!");
      return false;
    }
    var obj = {
      id: item.orderId,
      orderStatus: 2,
      paymentMethodType: selectPaymentMethod,
      deliveryAddress: SecondaryAddress,
      subTotal: item.subTotal,
      totalPrice: item.subTotal + item.deliveryCharges,
    };
    console.log('obj', obj)
    try {
      setLoading(true);
      const res = await Api.put(urls.ORDER_PROCEED, obj);
      console.log("orderProceed", res);
      if (res && res.success == true) {
        setLoading(false);
        dispatch(getCartlist());
        dispatch(getAllOrderlist());
        if (selectPaymentMethod != 0) {
          navigation.navigate(routeName.CONFIRM_ORDER,{item:item});
          _toast(res.message);

        }
      } else {
         _toast(res.message)
        setLoading(false);
      }
    } catch (error) {
      // seterrorString(error);
      setLoading(false);
    }
  };
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      edges={['bottom', "left", "right"]}
    >
      <ChatHeader
        backbutton
        // title={'Order Confirmation'}
        navigation={navigation}
      />
      
      <View style={{ backgroundColor: colors.white, flex: 1, marginTop: 0 }}>
      <Steps first second/>
        <ScrollView>
          {/* <ImageBackground
              style={{ height: hp(14), width: wp(100) }}
              imageStyle={{ resizeMode: "stretch" }}
              source={globalPath.bannnarImage}
            > */}
          <View style={styles.advertisementBanner}>
            {/* <Swiper data={StateLife} /> */}
            <ResponsiveText color={colors.black} size={8}>
              Order Confirmation
            </ResponsiveText>
            <ResponsiveText color={colors.black} size={3.5}>
              Take away & Home Delievery
            </ResponsiveText>
          </View>
          {/* </ImageBackground> */}
          <View style={{ margin: wp(3) }}>
            {paymentData.map((item) => {
              return (
                <PaymentCard
                  title={item.name}
                  active={selectPaymentMethod == item.id}
                  source={
                    item.id == 2
                      ? globalPath.jazzCash
                      : item.id == 3
                        ? globalPath.easypaisa
                        : globalPath.Cash_Logo
                  }
                  onPress={() => setSelectPaymentMethod(item.id)}
                />
              );
            })}
            <View style={{ marginHorizontal: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 5,
                }}
              >
                <ResponsiveText color={colors.grey1}>
                  Estimated delivery time:
                </ResponsiveText>
                <ResponsiveText size={3}>{"30 Mins"}</ResponsiveText>
              </View>
            </View>
          </View>

          <OrderCard title={"Delivery Address"}>
            <View
              style={{
                padding: 10,
                // paddingHorizontal: 10,
              }}
            >
              <TextInput
                style={{
                  height: 50,
                  width: wp(87),
                  // borderWidth: 0.5,
                  borderRadius: 8,
                  padding: 15,
                  // borderColor: color.black2,
                  alignContent: "center",
                  backgroundColor: colors.white,
                  color: colors.black,
                }}
                placeholderTextColor={colors.grey1}
                textAlignVertical="top"
                multiline={true}
                placeholder="Type Address here..."
                onChangeText={(text) => setSecondaryAddress(text)}
              // defaultValue={text}
              />
            </View>
          </OrderCard>
        </ScrollView>
        <ResponsiveText color={colors.red} margin={[20, 0, 0, 10]}>{errorString}</ResponsiveText> 
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: hp(5),
            // margin: wp(0),
            marginHorizontal: wp(8),
          }}
        >
          <View>
            <ResponsiveText color={colors.grey1}>Total price</ResponsiveText>
            <ResponsiveText size={5.5}>
              Rs. {item.subTotal + item.deliveryCharges}
            </ResponsiveText>
          </View>
          <TouchableOpacity
            onPress={ Submit_Order}
            style={{
              backgroundColor: colors.primary,
              height: 40,
              justifyContent: "center",
              paddingHorizontal: 15,
              borderRadius: 45,
            }}
          >
            <ResponsiveText color={colors.white} size={5}>
              Proceed
            </ResponsiveText>
          </TouchableOpacity>
        </View>
        {/* <View style={{ height: hp(0) }}>

        </View> */}
      </View>
      {Loading ? <Loader /> : undefined}
    </SafeAreaView>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  advertisementBanner: {
    marginTop: 5,
    alignItems: "center",

  },
  btn: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 15,
  },
});
