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
// import Loader from "../../components/loader";
import HomeHeader from '../../components/HomeHeader'
import Input2 from '../../components/Input2'
import Input from '../../components/Input';
import ChatHeader from '../../components/ChatHeader'
import { getFavorite } from '../../redux/actions/user.actions'
import { useDispatch, useSelector } from "react-redux";
import RecordNotFound from '../../components/RecordnotFound'
import Loader from '../../components/Loader'
import AsyncStorage from '@react-native-community/async-storage'
import { _toast } from "../../constants/Index";

const MyFavList = ({ navigation }) => {
  const dispatch = useDispatch();
  const GetUserfav = useSelector(state => state.userReducers.favorite.data,);
  const Loading = useSelector(state => state.userReducers.favorite.refreshing);
  const [loading, setLoading] = useState([]);

  console.log('GetUserfav', GetUserfav)
  useEffect(() => {
    dispatch(getFavorite());
  }, []);
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
        dispatch(getFavorite());
        _toast("Dislike")
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
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
    {
      id: 4,
      url: require('../../assets/icons/bannnarImage.jpeg'),
      price: '$49.00',
      title: 'Fruits & Veg'
    },
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
    {
      id: 4,
      url: require('../../assets/icons/bannnarImage.jpeg'),
      price: '$49.00',
      title: 'Fruits & Veg'
    },

  ];
  return (
    // <ScrollView>
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ChatHeader
        backbutton
        title={'My Favourite List'}
        navigation={navigation}
      />
      <View style={{ height: hp(100) }}>
        {GetUserfav.length > 0 ?
          <FlatList
            data={GetUserfav}
            keyExtractor={(item, index) => item + index}
            numColumns={2}
            style={{ height: '20%' }}
            renderItem={({ item }) => {
              return (
                <View style={{
                  // flex: 1,
                  margin: 0,
                  padding: 10,
                  marginTop: 10
                  // borderRadius: 7,
                  //  flexDirection: 'row'
                }}>
                  {/* <TouchableOpacity onPress={() => navigation.navigate(routeName.PRODUCT_DETAIL, { item: item })}> */}
                  <Card style={{
                    width: wp(45),
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: wp(60),
                    bottom: 12,
                    margin: 0,
                  }}>
                    <TouchableOpacity onPress={() => { AdFavourites(item) }}
                      style={{ alignSelf: 'flex-end', top: 20 }}>
                      <Icon
                        // tintColor={colors.primary}
                        size={30}
                        margin={[0, 0, 0, 0]}
                        source={item.addFavourite ? globalPath.FillHeart : null}
                      >
                      </Icon>
                    </TouchableOpacity >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Icon
                        // tintColor={colors.primary}
                        size={80}
                        borderRadius={50}
                        source={{ uri: item.fullPath }}
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
                      <View style={{ marginHorizontal: 0, backgroundColor: colors.yellow, paddingHorizontal: 25, paddingVertical: 6, marginBottom: 20, borderRadius: 20, }}>
                        <ResponsiveText weight={'bold'} color={colors.white} size={2.9}>
                          Add To Cart
                        </ResponsiveText>
                      </View>
                    </TouchableOpacity>
                  </Card>
                  {/* </TouchableOpacity> */}
                </View>
              )
            }}
          /> : (Loading == false ?
            <RecordNotFound />
            : null
          )}
      </View>
      {Loading ? <Loader /> : null}
    </SafeAreaView>
    // </ScrollView>
  )
}

export default MyFavList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
})