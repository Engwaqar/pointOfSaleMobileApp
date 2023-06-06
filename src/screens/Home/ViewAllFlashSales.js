import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { colors } from '../../constants/colorsPallet'
import ResponsiveText from '../../components/RnText'
import Card from '../../components/Card'
import Icon from '../../components/Icon'
import { globalPath } from '../../constants/globalPath'
import Fonts from '../../helpers/Fonts'
import { hp, wp } from '../../helpers/Responsiveness'
import { routeName } from '../../constants/routeName'
import { ScrollView } from 'react-native-gesture-handler'
import urls from '../../redux/lib/urls'
import Api from '../../redux/lib/api'
import HomeHeader from '../../components/HomeHeader'
import ChatHeader from '../../components/ChatHeader'
import { useDispatch, useSelector } from "react-redux";
import { getFlashSales } from '../../redux/actions/user.actions'
import RecordNotFound from '../../components/RecordnotFound'
import AsyncStorage from '@react-native-community/async-storage'
import { _toast } from "../../constants/Index";
import Loader from '../../components/Loader'

const ViewAllFlashSales = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const FlashSalesData = useSelector((state) => state.userReducers.flashSales.data);
  const Refreshing = useSelector((state) => state.userReducers.flashSales.refreshing);
  const [index, setIndex] = React.useState(1);
  const [Selectedindex, setSelectedindex] = React.useState(null);
  const [loading, setLoading] = useState([]);
  console.log('ViewAllFlashSalesData', FlashSalesData)
  const update = (i, size) => {
    dispatch(getFlashSales(1, 10,));
  };
  const onLoad = (i, size) => {
    dispatch(getFlashSales(i, size,));
    setIndex(index + 1);
  };
  useEffect(() => {
    dispatch(getFlashSales(1, 10,));

  }, [])
  const AdFavourites = async (item) => {
    const UserId = await AsyncStorage.getItem('@userId')
    var obj = {
      "id": item.itemId ? item.itemId : item.id,
      "addFavourite": item.addFavourite ? false : true,
      "userId": UserId
    }
    console.log('obj', obj)
    try {
      setLoading(true);
      const res = await Api.put(urls.ADD_FAVORITE_PRODUCT, obj);
      console.log('res', res)
      if (res && res.success == true) {
        // navigation.goBack()
        // _toast("Like")
        dispatch(getFlashSales(1, 8));
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }
  return (

    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ChatHeader
        backbutton
        title={'Flash Items'}
        navigation={navigation}
      />
      {FlashSalesData.length > 0 ?
        <FlatList
          data={FlashSalesData}
          keyExtractor={(item, index) => item + index}
          numColumns={2}
          onEndReached={() => onLoad(index, 10)}
          onEndReachedThreshold={0.2}
          refreshing={Refreshing}
          onRefresh={() => update()}
          renderItem={({ item, index }) => {
            return (
              <View style={{
                margin: 0,
                padding: 10,
                marginTop: 10
              }}>
                {/* {loading ? <Loader Circle /> : undefined} */}
                <TouchableOpacity onPress={() => navigation.navigate(routeName.ITEM_DETAIL, { item: item })}>
                  <Card style={{
                    width: wp(45),
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: wp(60),
                    bottom: 12,
                    margin: 0,
                  }}>
                    {/* <TouchableOpacity onPress={() => { AdFavourites(item); setSelectedindex(index) }}
                      style={{ alignSelf: 'flex-end', top: 20 }
                      }>
                      <Icon
                        size={30}
                        margin={[0, 0, 0, 0]}
                        source={item.addFavourite ? globalPath.FillHeart : globalPath.EmptyHeart}

                      >
                      </Icon>
                    </TouchableOpacity> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Icon
                        size={80}
                        borderRadius={50}
                        source={{ uri: item.fullPath }}
                      >
                      </Icon>
                      {loading && Selectedindex == index ? <Loader Circle /> : undefined}
                    </View>
                    <ResponsiveText
                      weight={'bold'}
                      textAlign={'center'}
                      margin={[0, 0, 0, 0]}
                      color={colors.black1}
                    >{item.title}
                    </ResponsiveText>
                    <View style={{ flexDirection: 'row' }}>
                      <ResponsiveText
                        cutText={item.objPackage[0].discoutedPrice ? 'line-through' : undefined}
                        margin={[2, 0, 0, 0]}
                        color={colors.grey1}
                        textAlign={'center'}
                      >Rs {item.objPackage[0].price}
                      </ResponsiveText>
                      {item.objPackage[0].discoutedPrice ?
                        <ResponsiveText
                          weight={'bold'}
                          margin={[2, 0, 0, 10]}
                          color={colors.grey1}
                          textAlign={'center'}
                        >Rs {item.objPackage[0].discoutedPrice}
                        </ResponsiveText>
                        : null}
                    </View>
                    {item.objPackage[0].discountPercent ?
                      <View style={{
                        marginHorizontal: 0,
                        backgroundColor: colors.red,
                        paddingHorizontal: 15,
                        paddingVertical: 6,
                        marginBottom: 5,
                        borderRadius: 20,
                      }}>
                        <ResponsiveText weight={'bold'} color={colors.white} size={2.9}>
                          {item.objPackage[0].discountPercent}% OFF
                        </ResponsiveText>
                      </View> : null}
                    <TouchableOpacity onPress={() => navigation.navigate(routeName.PRODUCT_DETAIL, { item: item })}>
                      <View style={{
                        marginHorizontal: 0,
                        backgroundColor: colors.yellow,
                        paddingHorizontal: 25,
                        paddingVertical: 6,
                        marginBottom: 20,
                        borderRadius: 20,
                      }}>
                        <ResponsiveText weight={'bold'} color={colors.white} size={2.9}>
                          Add To Cart
                        </ResponsiveText>
                      </View>
                    </TouchableOpacity>
                  </Card>
                </TouchableOpacity>
              </View>
            )
          }}
          ListFooterComponent={<View style={{ height: hp(10) }} />}
        /> : <RecordNotFound />}
    </SafeAreaView>
  )
}

export default ViewAllFlashSales

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title: {
    paddingTop: 5,
    color: colors.white,
    fontSize: 14,
    backgroundColor: colors.black1,
    width: wp(50),
  },
})
