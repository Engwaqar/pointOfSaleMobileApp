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
import Input from '../../components/Input';
import RecordNotFound from '../../components/RecordnotFound'
import Loader from '../../components/Loader'
import ChatHeader from '../../components/ChatHeader'
import { _toast } from "../../constants/Index";
import AsyncStorage from '@react-native-community/async-storage'
import { useDispatch, useSelector } from "react-redux";

const SearchScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState([]);
  const [searchFilterFunction, setsearchFilterFunction] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [Selectedindex, setSelectedindex] = React.useState(null);
  const [ItemCategories, setItemCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState([])
  const [hotLoading, sethotLoading] = useState(false)

  useEffect(() => {
    Categories();
  }, [])
  const SearchItems = async (text) => {
    setSearchText(text)
    if (text.length < 3) {
      return false
    }

    try {
      setLoading(true);
      const res = await Api.get(urls.SEARCH_ITEMS + text + "/1/" + (selectedCat.toString() ? selectedCat.toString() : "0"));
      console.log("SearchProducts", res);
      if (res && res.success == true) {
        setsearchFilterFunction(res.data);
        setLoading(false);
      } else {
        setLoading(false);
        setsearchFilterFunction([]);
      }
    } catch (error) {
      // seterrorString(error);
      setLoading(false);
    }
  };

  const Categories = async () => {
    try {
      setLoading(true);
      const res = await Api.get(urls.CATEGORIES);
      console.log('res', res)
      if (res && res.success == true) {
        setItemCategories(res.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      //   setErrorString(error);
    }
  };
  const onSelect = async (id) => {
    // console.log('id', selectedCat.includes(id, 3))

    if (selectedCat.includes(id)) {
      let arr = selectedCat.filter((v) => v != id)
      console.log('arr', arr)
      setSelectedCat(arr);

    } else {
      selectedCat.push(id)

    }
    // console.log('selectedCat', selectedCat)
    // setSelectedCat(selectedCat);
    sethotLoading(!hotLoading);
  };
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
        // SearchItems('');
        // dispatch(getFlashSales(1, 3));
        // dispatch(getBestSellingProducts(1, 3));
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);

    }
  }

  return (

    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ChatHeader
        title="Search Items"
        navigation={navigation}
        Search
        backbutton
      />

      <TouchableOpacity
        style={{ marginTop: 10, alignItems: 'center' }}>

        <View style={styles.Search}>
          <Input
            style={{ borderRadius: 20 }}
            width={wp(90)}
            padding={[0, 5, 0, 10]}
            placeholder="Search"
            color={colors.black}
            backgroundColor={colors.white}
            searchBox
            onChnageText={(text) => SearchItems(text)}

          />
        </View>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
        {ItemCategories.length > 0 ?
          ItemCategories.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => onSelect(item.id)}
              >
                <View
                  style={[
                    styles.box,
                    {
                      backgroundColor: selectedCat.includes(item.id)
                        ? colors.primary
                        : colors.lightGrey,
                    },
                  ]}
                >
                  <ResponsiveText
                    color={selectedCat.includes(item.id) ? colors.white : colors.black}
                    size={3}
                  >
                    {item.title}
                    {/* <ResponsiveText
                  color={selectedCat.includes(item.id) ? colors.white : colors.primary}
                >
                  ({item.quantity})
                </ResponsiveText> */}
                  </ResponsiveText>
                </View>
              </TouchableOpacity>
            );
          }) : null}
      </View>
      {searchText ?
        <View style={styles.advertisementBanner}>
          <ResponsiveText color={colors.grey1} size={4}>
            Now showing results for "{searchText}" {searchFilterFunction.length} results
            found!
          </ResponsiveText>
        </View>
        : null}
      <View style={{ height: '100%' }}>
        <View style={{ marginHorizontal: 12 }}>
          {searchFilterFunction.length > 0 ?
            <FlatList
              data={searchFilterFunction}
              keyExtractor={(item, index) => 'key' + index}
              numColumns={2}
              style={{ height: hp(83), flexGrow: 0 }}
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
                        <TouchableOpacity onPress={() => { AdFavourites(item); setSelectedindex(index) }}
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
            />
            : <RecordNotFound />}
        </View>
      </View>
      {loading ? <Loader /> : null}
    </SafeAreaView>

  )
}
export default SearchScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  advertisementBanner: {
    marginHorizontal: wp(10),
    alignItems: "center",
    paddingVertical: 15,
  },
  box: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.red,
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,

  },
})