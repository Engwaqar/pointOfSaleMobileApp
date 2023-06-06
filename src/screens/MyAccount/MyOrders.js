import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { colors } from '../../constants/colorsPallet'
import ChatHeader from '../../components/ChatHeader'
import ResponsiveText from '../../components/RnText'
import { globalPath } from '../../constants/globalPath'
import Fonts from '../../helpers/Fonts'
import { hp, wp } from '../../helpers/Responsiveness'
import { routeName } from '../../constants/routeName'
import urls from '../../redux/lib/urls'
import Api from '../../redux/lib/api'
import { _toast } from "../../constants/Index";
import moment from 'moment';
// import Loader from "../../components/loader";
import Swipeout from "react-native-swipeout";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderlist } from '../../redux/actions/user.actions'
import RecordNotFound from '../../components/RecordnotFound'
import Loader from '../../components/Loader'
const MyOrders = ({ navigation, route }) => {
  const [count, setCount] = useState(1);
  const [Qunatity, setQunatity] = useState(1);
  const [Loading, setLoading] = useState([]);
  const [errorString, setErrorString] = React.useState("");

  const dispatch = useDispatch();
  const GetAllOrders = useSelector(state => state.userReducers.AllOrderlist.data,);
  const loading = useSelector(state => state.userReducers.AllOrderlist.refreshing);
  console.log('GetAllOrders', GetAllOrders)
  useEffect(() => {
    dispatch(getAllOrderlist());
  }, [])
  //  const itemDetail = route.params.item
  //  console.log('title', itemDetail)
  const Delete_Order = async (id) => {
    var id = id;
    console.log('id', id)
    try {
      setLoading(true);
      const res = await Api.delete(urls.ORDER_DELETE + id);
      console.log("delete order", res);
      if (res && res.success == true) {
        dispatch(getCartlist());
        setLoading(false);
        _toast(res.message);
      } else {
        _toast(res.message);
        setLoading(false);
      }
    } catch (error) {
      // seterrorString(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    const read = async (id) => {
      try {
        const res = await Api.put(urls.UPDATE_ORDER_STATUS);
        console.log('AllOrderSeenUpdate', res);
        if (res && res.success == true) {
          dispatch(getAllOrderlist());
        } else {
        }
      } catch (error) {
        console.error(error);
      }
    };
    setTimeout(() => {
      read();
    }, 6000); // set a delay of 5 seconds before calling the API
  }, []);
  const updateCount = async (type, count, item) => {
    var quantity = count
    if (type == "Inc") {
      quantity = count + 1
    } else {
      quantity = count > 1 ? count - 1 : 1
    }
    const obj = {
      "orderId": item.orderId,
      "orderType": 1,
      "quantity": quantity,
      "itemId": item.itemId,
    }
    console.log('id', quantity)
    try {
      setLoading(true);
      const res = await Api.put(urls.UPDATE_COUNT, obj);
      console.log("update Count", res);
      if (res && res.success == true) {
        dispatch(getCartlist());
      } else {
        setLoading(false);
      }
    } catch (error) {
      // seterrorString(error);
      setLoading(false);
    }
  };
  console.log('count', count)
  const Data = [
    {
      id: 1,
      url: require('../../assets/icons/bannnarImage.jpeg'),
      price: '$ 7.48 $8.48 2.6/floz',
      title: 'Pepsi Soda,12 oz Cans,24 Count',
      OrderNo: '25',
      dateCreated: '15/5/2022',
      totalAmount: '1500',
      Item: '4',
      orderStatus: 'Pending',



    },

    {
      id: 2,
      url: require('../../assets/icons/bannnarImage.jpeg'),
      price: '$ 7.48 $8.48 2.6/floz',
      title: 'Pepsi Soda,12 oz Cans,24 Count',
      OrderNo: '20',
      dateCreated: '15/5/2022',
      totalAmount: '1500',
      Item: '1',
      orderStatus: 'Pending',



    },
    {
      id: 3,
      url: require('../../assets/icons/bannnarImage.jpeg'),
      price: '$ 7.48 $8.48 2.6/floz',
      title: 'Fruits & Veg',
      OrderNo: '5',
      dateCreated: '15/5/2022',
      totalAmount: '1500',
      Item: '2',
      orderStatus: 'Pending',
    },



  ];
  return (

    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ChatHeader
        backbutton
        title={'My Orders'}
        navigation={navigation}
      />
      {GetAllOrders.length > 0 ?
        <FlatList
          // contentContainerStyle={{ alignItems: "center" }}
          // ListHeaderComponent={listHeader}
          //  stickyHeaderIndices={[0]}
          //  onEndReached={() => onLoad(index,10)}
          //  onEndReachedThreshold={0.2}
          //  refreshing={Refreshing}
          //  onRefresh={() =>update()}
          data={GetAllOrders}
          //  keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <View
                //  onPress={() => read()}
                style={{
                  backgroundColor: item.seen == false ? colors.lighterGrey : colors.white,
                  padding: 10,
                  margin: 5,
                  borderRadius: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  marginHorizontal: 10
                }}
              >
                <View style={{ flex: 0.9 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <ResponsiveText color={colors.grey1} size={2.5}>
                      {"Order No: " + item.orderId}
                    </ResponsiveText>
                    <ResponsiveText color={colors.grey1} size={2.5}>
                      {item.dateCreated}
                    </ResponsiveText>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginVertical: 5,
                      marginTop: 10,
                    }}
                  >
                    <View>
                      <ResponsiveText>Price:</ResponsiveText>
                      <ResponsiveText color={colors.grey1} size={3}>
                        Rs: {item.totalPrice}
                      </ResponsiveText>
                    </View>
                    <View>
                      <ResponsiveText>Items:</ResponsiveText>
                      <ResponsiveText color={colors.grey1} size={3}>
                        {item.quantity} items
                      </ResponsiveText>
                    </View>
                    <View>
                      <ResponsiveText>Status:</ResponsiveText>
                      <ResponsiveText color={colors.grey1} size={3}>
                        {item.orderStatus}
                      </ResponsiveText>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() =>
                    navigation.navigate(routeName.ORDERS_DETAILS, { item: item })
                  }
                >
                  <ResponsiveText
                    // margin={[0, 0, 0, 5]}
                    color={colors.white}
                    size={2.5}
                  >
                    Detail
                  </ResponsiveText>
                </TouchableOpacity>
              </View>
            );
          }}
        /> : <RecordNotFound />}
      {/* {loading ?
        <Loader />
        :
        undefined
      } */}
      <View style={{ height: hp(8) }}>

      </View>
    </SafeAreaView >

  )
}

export default MyOrders

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.secondary,
  },
  btn: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 15,
    height: 20,
  },
})