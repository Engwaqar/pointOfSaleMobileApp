import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../constants/colorsPallet";
import { globalPath } from "../../constants/globalPath";
import { ScrollView } from "react-native-gesture-handler";
import ResponsiveText from "../../components/RnText";
import { hp, wp } from "../../helpers/Responsiveness";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import { RowText } from "../../components/RowText";
import RnButton from "../../components/RnButton";
import { useState } from "react";
import ChatHeader from "../../components/ChatHeader";
import moment from 'moment';
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import { routeName } from "../../constants/routeName";
import { getCartlist } from "../../redux/actions/user.actions";
import { _toast } from "../../constants/Index";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";

const OrderDetail = ({ navigation, route }) => {
  const Cartlist = useSelector(state => state.userReducers.Cartlist.data,);
  const data = route.params.item;
  console.log('item', data)
  const [Loading, setLoading] = useState(false);
  const RapeatOrder = async () => {
    if (Object.keys(Cartlist).length > 0) {
      _toast('Your Rapeat order already in cart');
      return false
    }
    const obj = {
      "orderId": data.orderId
    }
    try {
      setLoading(true)
      const res = await Api.post(urls.RAPEAT_ORDERS, obj);
      console.log("res", res);
      if (res && res.success == true) {
        navigation.navigate(routeName.SHOPPING_CART);
        dispatch(getCartlist());
        _toast(res.message);
        setLoading(false);
      } else {
        _toast(res.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <ChatHeader
        backbutton
        title={'Order Details'}
        navigation={navigation}
      />
      <ScrollView style={{ flex: 0.9, backgroundColor: colors.white, }} >
        <View
          style={{
            backgroundColor: colors.white,
            marginHorizontal: wp(5),
            marginVertical: hp(2),
            flexDirection: 'row'
          }}>
          <ResponsiveText weight={'bold'} flex={1} size={4} color={colors.primary}>
            Order Details
          </ResponsiveText>
          <View>
            <TouchableOpacity style={styles.cartBtn} onPress={() => RapeatOrder()}>
              <ResponsiveText size={2.8} color={colors.secondary}>
                Repeat Order
              </ResponsiveText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{
          width: wp(73), flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomColor: colors.lightBlack,
          marginLeft: '5%'
        }} >
          <View style={{ flexDirection: 'row', }}>
            <ResponsiveText weight={'bold'} size={3} color={colors.black2}>Customer Name: </ResponsiveText>
            <ResponsiveText size={3} margin={[0, 5, 0, 25]} color={colors.grey1}>{'Waqar Ahmad'}</ResponsiveText>
          </View>

        </View>
        <View style={{ padding: hp(0.5), flexDirection: 'row', }}>
          <ResponsiveText weight={'bold'} flex={0.5} size={3} color={colors.black2} margin={[0, 0, 0, 15]}>
            Order Id:
          </ResponsiveText>
          <ResponsiveText flex={1} size={3} color={colors.grey1} margin={[0, 0, 0, 15]}>
            {data ? data.orderId : 'id'}
          </ResponsiveText>
        </View>
        <View style={{ padding: hp(0.5), flexDirection: 'row' }}>
          <ResponsiveText weight={'bold'} size={3} flex={0.5} color={colors.black2} margin={[0, 0, 0, 15]}>
            Time:
          </ResponsiveText>
          <ResponsiveText size={3} flex={1} color={colors.grey1} margin={[0, 0, 0, 15]}>
            {/* {moment(data ? data.orderDateTimes : 'orderDateTimes').format("dddd, MMMM Do YYYY, h:mm a")} */}
            {'23/3/2023'}
          </ResponsiveText>

        </View>
        <View style={{ padding: hp(0.5), flexDirection: 'row', marginLeft: '5%' }}>
          <ResponsiveText weight={'bold'} size={3} color={colors.black2}>Order Status: </ResponsiveText>
          <ResponsiveText size={3} margin={[0, 5, 0, 50]} color={colors.black3}>{data.orderStatus}</ResponsiveText>
        </View>

        <View
          style={{
            backgroundColor: colors.lightGrey,
            flexDirection: 'row',
            paddingVertical: 10,
          }}>
          <View
            style={{ flex: 0.6, justifyContent: 'center', marginHorizontal: 15 }}>
            <ResponsiveText weight={'bold'} size={3} color={colors.black}>
              Ordered Items
            </ResponsiveText>
          </View>
          <View style={{ flex: 0.2, justifyContent: 'center' }}>
            <ResponsiveText weight={'bold'} size={3} color={colors.black2}>
              Qty
            </ResponsiveText>
          </View>
          <View style={{ flex: 0.2, justifyContent: 'center' }}>
            <ResponsiveText weight={'bold'} size={3.5} color={colors.black2}>
              Amount
            </ResponsiveText>
          </View>
        </View>
        {data ? data.objCartDetailDto.map(item => {
          return (
            <View
              style={{
                backgroundColor: colors.white,
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderBottomColor: colors.black1,
                paddingVertical: 10,
              }}>
              <View
                style={{
                  flex: 0.6,
                  justifyContent: 'center',
                  marginHorizontal: 15,
                }}>
                <ResponsiveText size={3} color={colors.black}>
                  {item.title}
                </ResponsiveText>
              </View>
              <View style={{ flex: 0.1, justifyContent: 'center' }}>
                <ResponsiveText size={3} margin={[0, 0, 0, 7]} color={colors.grey1}>
                  {item.quantity}
                </ResponsiveText>
              </View>
              <View style={{ flex: 0.3, justifyContent: 'center' }}>
                <ResponsiveText size={3} margin={[0, 0, 0, 28]} color={colors.black3}>
                  Rs {parseFloat(item.price * item.quantity).toFixed(2)}
                </ResponsiveText>
              </View>
            </View>
          );
        }) : null}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 25,
            marginTop: 10,
          }}>
          <View style={{ flex: 0.45, alignItems: 'flex-start' }}>
            <ResponsiveText color={colors.black2} size={3}>
              Sub Total
            </ResponsiveText>
          </View>
          <View style={{ flex: 0.55, alignItems: 'flex-end' }}>
            <ResponsiveText margin={[0, 0, 0, 0]} color={colors.black3} size={3}>
              Rs {data ? parseFloat(data.totalPrice).toFixed(2) : 'amount'}
            </ResponsiveText>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 25,
            marginTop: 10,
            borderBottomColor: colors.black1,
            paddingBottom: 5,
            borderBottomWidth: 1,
          }}>
          <View style={{ flex: 0.45, alignItems: 'flex-start' }}>
            <ResponsiveText color={colors.black2} size={3}>
              Discounts
            </ResponsiveText>
          </View>
          <View style={{ flex: 0.54, alignItems: 'flex-end' }}>
            <ResponsiveText margin={[0, 0, 0, 0]} color={colors.black3} size={3}>
              Rs 60.00
            </ResponsiveText>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 25,
            marginTop: 20,
          }}>
          <View style={{ flex: 0.45, alignItems: 'flex-start' }}>
            <ResponsiveText color={colors.black2} size={3}>
              Final Total
            </ResponsiveText>
          </View>
          <View style={{ flex: 0.55, alignItems: 'flex-end' }}>
            <ResponsiveText
              margin={[0, 0, 0, 0]}
              color={colors.black3}
              size={4.5}>
              Rs {data ? parseFloat(data.totalPrice).toFixed(2) : 'amount'}
            </ResponsiveText>
          </View>
        </View>
      </ScrollView>
      {/* <View style={{height:hp(20)}}>

      </View> */}
      {Loading ? <Loader /> : null}
    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  advertisementBanner: {
    // height: 130,
    // marginHorizontal: 10,
    alignItems: "center",
    // paddingTop:20
  },
  btn: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 15,
  },
  cartBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    height: hp(3),
    justifyContent: "center",
    borderRadius: 8,
    alignSelf: "flex-end",
  },
});
