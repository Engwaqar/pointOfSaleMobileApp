import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
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
import moment from 'moment';
import { _toast } from "../../constants/Index";
import HomeHeader from '../../components/HomeHeader'
import Input2 from '../../components/Input2'
import Input from '../../components/Input';
import RecordNotFound from '../../components/RecordnotFound'
import Loader from '../../components/Loader'
import { getBestSellingProducts, getFlashSales } from '../../redux/actions/user.actions'
import AsyncStorage from '@react-native-community/async-storage'
import { useDispatch, useSelector } from "react-redux";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const FlashSalesData = useSelector((state) => state.userReducers.flashSales.data);
  const loadingFlashSales = useSelector((state) => state.userReducers.flashSales.refreshing);
  const BestSellingProducts = useSelector((state) => state.userReducers.bestSellingProducts.data);
  const loadingProducts = useSelector((state) => state.userReducers.bestSellingProducts.refreshing);
  const [loading, setLoading] = useState([]);
  const [BannerData, setBannerData] = useState([]);
  // const [SelectedIndex, setSelectedIndex] = useState(null)
  const [SelectIndex, setSelectIndex] = useState(null)

   console.log('SelectedIndex', SelectIndex)
  // console.log('FlashSalesData', FlashSalesData)
  // console.log('BestSellingProducts', BestSellingProducts)
  // const loginVerification = async () => {
  // const userId = await AsyncStorage.getItem('@UserTypeId')
  // console.log('userIdyyyy', userId)
  // }
  useEffect(() => {
    getSliderShow();
    dispatch(getFlashSales(1, 3));
    dispatch(getBestSellingProducts(1, 3));
    SearchItems();

  }, [])
  const getSliderShow = async () => {
    try {
      setLoading(true);
      const res = await Api.get(urls.GET_SLIDER_SHOW);
      console.log("Slidershow", res);
      if (res && res.success == true) {
        setBannerData(res.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      // seterrorString(error);
      setLoading(false);
    }
  };
  const SearchItems = async (text) => {
    try {
      setLoading(true);
      const res = await Api.get(urls.SEARCH_ITEMS + text + "/1");
      console.log("SearchProducts", res);
      if (res && res.success == true) {
        setsearchFilterFunction(res.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      // seterrorString(error);
      setLoading(false);
    }
  };
  const AdFavourites = async (item) => {
    // const UserId = await AsyncStorage.getItem('@UserId')
    var obj = {
      "id": item.itemId ? item.itemId : item.id,
      "addFavourite": item.addFavourite ? false : true,
    }
    console.log('obj', obj)
    try {
      setLoading(true);
      const res = await Api.put(urls.ADD_FAVORITE_PRODUCT, obj);
      console.log('res', res)
      if (res && res.success == true) {
        // navigation.goBack()
        // _toast("Like")
        // dispatch(getFlashSales(1, 3));
        dispatch(getBestSellingProducts(1, 3));
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);

    }
  }

  const Data = [
    {
      id: 1,
      url: require('../../assets/icons/bannnarImage.jpeg'),
      price: '$49.00',
      title: 'Fruits & Veg'
    },

    {
      id: 2,
      url: require('../../assets/icons/bannnarImage.jpeg'),
      price: '$49.00',
      title: 'Fruits & Veg'
    },
    {
      id: 3,
      url: require('../../assets/icons/bannnarImage.jpeg'),
      price: '$49.00',
      title: 'Fruits & Veg'
    },



  ];
  return (
    <ScrollView>
      <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
        <HomeHeader
          title="Delivery Location"
          Itemtitle="2680 Stadium Drive Fall..."
          searchBox
          AddToCart={globalPath.AddToCart}
          Search={globalPath.Search}
          navigation={navigation}
        />

        <View style={{ height: wp(42) }}>
          <ScrollView horizontal  >
            {BannerData.map((item) => {
              return (
                <Icon margin={[5, 0, 0, 10]}
                  // size={50}
                  borderRadius={10}
                  resizeMode={'contain'}
                  height={wp(40)}
                  width={wp(95)}
                  source={{ uri: item.fullPath }}>
                </Icon>)
            })}

          </ScrollView>
        </View>
        {FlashSalesData.length > 0 ?
          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <ResponsiveText margin={[10, 0, 0, 20]} textAlign={'center'} weight={'bold'} color={colors.black} size={4}>Flash Sales</ResponsiveText>
            <TouchableOpacity onPress={() => navigation.navigate(routeName.VIEW_ALL_FLASH_LIST,)}>
              <ResponsiveText margin={[10, 20, 0, 0]} textAlign={'center'} weight={'bold'} color={colors.primary} size={4}>View All</ResponsiveText>
            </TouchableOpacity>
          </View>
          : null}
        <View style={{ height: hp(33) }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} >
            {FlashSalesData.length > 0 ?
              FlashSalesData.map((item, index) => {
                return (
                  <View style={{
                    margin: 0,
                    padding: 10,
                    marginTop: 10,
                  }}>
                    <TouchableOpacity onPress={() => navigation.navigate(routeName.ITEM_DETAIL, { item: item })}>
                      <Card style={{
                        width: wp(45),
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: wp(60),
                        bottom: 12,
                        margin: 0,
                      }}>
                        {/* <TouchableOpacity onPress={() => { AdFavourites(item); setSelectIndex(index) }}
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
                          {/* {loading && SelectIndex ? <Loader Circle /> : undefined} */}
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
                            cutText={item.objPackage[0].discoutedPrice?'line-through':undefined}
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
              }) : (loadingFlashSales == false ?
                <RecordNotFound />
                : null
              )}
          </ScrollView>
        </View>
        {BestSellingProducts.length > 0 ?
          <View style={{ justifyContent: 'space-between', flexDirection: 'row', }}>
            <ResponsiveText margin={[10, 0, 0, 20]} textAlign={'center'} weight={'bold'} color={colors.black} size={4}>Best Selling Products</ResponsiveText>
            <TouchableOpacity onPress={() => navigation.navigate(routeName.VIEW_ALL_BEST_PRODUCT)}>
              <ResponsiveText margin={[10, 20, 0, 0]} textAlign={'center'} weight={'bold'} color={colors.primary} size={4}>View All</ResponsiveText>
            </TouchableOpacity>
          </View>
          : null}

        <View style={{ height: hp(33) }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} >
            {BestSellingProducts.length > 0 ?
              BestSellingProducts.map((item, index) => {
                if (index < 3) {
                  return (
                    <View style={{
                      margin: 0,
                      padding: 10,
                      marginTop: 10,
                    }}>
                      <TouchableOpacity onPress={() => navigation.navigate(routeName.ITEM_DETAIL, { item: item })}>
                        <Card style={{
                          width: wp(45),
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: wp(60),
                          bottom: 12,
                          margin: 0,
                        }}>
                          <TouchableOpacity onPress={() => { AdFavourites(item); setSelectIndex(index) }}
                            style={{ alignSelf: 'flex-end', top: 20 }
                            }>
                            <Icon
                              size={30}
                              margin={[0, 0, 0, 0]}
                              source={item.addFavourite ? globalPath.FillHeart : globalPath.EmptyHeart}
                            >
                            </Icon>
                          </TouchableOpacity>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Icon
                              size={80}
                              borderRadius={50}
                              source={{ uri: item.fullPath }}
                            >
                            </Icon>
                            {loading && index === SelectIndex ? <Loader Circle /> : undefined}
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
                              cutText={item.objPackage[0].discoutedPrice?'line-through':undefined}
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
                }
              }) : null}
          </ScrollView>
        </View>

        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <ResponsiveText margin={[10, 0, 0, 20]} textAlign={'center'} weight={'bold'} color={colors.black} size={4}>Exclusive Offer</ResponsiveText>
          <TouchableOpacity onPress={() => navigation.navigate(routeName.VIEW_ALL_ITEM)}>
            <ResponsiveText margin={[10, 20, 0, 0]} textAlign={'center'} weight={'bold'} color={colors.primary} size={4}>View All</ResponsiveText>
          </TouchableOpacity>
        </View>
        <View style={{ height: hp(30) }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} >
            {Data.map((item) => {
              return (
                <View style={{
                  margin: 0,
                  padding: 10,
                  marginTop: 10
                }}>
                  <TouchableOpacity onPress={() => navigation.navigate(routeName.PRODUCT_DETAIL, { item: item })}>
                    <Card style={{
                      width: wp(45),
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: wp(50),
                      bottom: 12,
                      margin: 0,
                    }}>
                      <TouchableOpacity style={{ alignSelf: 'flex-end', top: 20 }}>
                        <Icon
                          size={30}
                          margin={[0, 0, 0, 0]}
                          source={globalPath.FillHeart}
                        >
                        </Icon>
                      </TouchableOpacity>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Icon
                          size={80}
                          borderRadius={50}
                          source={item.url}
                        >
                        </Icon>

                      </View>
                      <ResponsiveText
                        weight={'bold'}
                        textAlign={'center'}
                        margin={[0, 0, 0, 0]}
                        color={colors.black1}
                      >{item.title}
                      </ResponsiveText>
                      <ResponsiveText

                        margin={[2, 0, 0, 0]}
                        color={colors.primary}
                        textAlign={'center'}
                      >{item.price}
                      </ResponsiveText>
                      <TouchableOpacity onPress={() => navigation.navigate(routeName.SHOPPING_CART)}>
                        <View style={{ marginHorizontal: 0, backgroundColor: colors.yellow, paddingHorizontal: 25, paddingVertical: 6, marginBottom: 20, borderRadius: 20, }}>
                          <ResponsiveText weight={'bold'} color={colors.white} size={2.9}>
                            Add To Cart
                          </ResponsiveText>
                        </View>
                      </TouchableOpacity>
                    </Card>
                  </TouchableOpacity>
                </View>
              )
            })}
          </ScrollView>
        </View>
        <View style={{ height: hp(10) }}>

        </View>
        {loadingFlashSales || loadingProducts ? <Loader /> : null}
      </SafeAreaView>
    </ScrollView>
  )
}
export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
})