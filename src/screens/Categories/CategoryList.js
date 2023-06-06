import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { colors } from '../../constants/colorsPallet'
import ChatHeader from '../../components/ChatHeader'
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
import AllCategoriesList from './AllCategoriesList'
import Loader from '../../components/Loader'
import RecordNotFound from '../../components/RecordnotFound'
// import Loader from "../../components/loader";
const CategoryList = ({ navigation, route }) => {
    const { id, title } = route.params
    console.log('categories', title)
    const [ItemList, setItemList] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        AllItemList();
    }, []);
    const AllItemList = async () => {
        try {
            setLoading(true);
            const res = await Api.get(urls.ITEM_LIST + id);
            console.log('res categories', res)
            if (res && res.success == true) {
                setItemList(res.data);
                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            //   setErrorString(error);
        }
    };
    const Data = [
        {
            id: 1,
            title: 'Fruits & Veg',
            url: require('../../assets/icons/F.png'),
            price: '$49.00',
        },

        {
            id: 2,
            title: 'Beverages',
            url: require('../../assets/icons/Beverage.png'),
            price: '$49.00',
        },
        {
            id: 3,
            title: 'Household',
            url: require('../../assets/icons/cimage.png'),
            price: '$49.00',
        },
        {
            id: 4,
            title: 'Personal Care',
            url: require('../../assets/icons/PCare.png'),
            price: '$49.00',
        },
        {
            id: 5,
            title: 'Branded Foods',
            url: require('../../assets/icons/Food.png'),
            price: '$49.00',
        },


        {
            id: 6,
            title: 'Bakery',
            url: require('../../assets/icons/cake.png'),
            price: '$49.00',
        },
        {
            id: 7,
            title: 'Eggs & Meat',
            url: require('../../assets/icons/eggs.png'),
            price: '$49.00',
        },
        {
            id: 7,
            title: 'Oil & Maslas',
            url: require('../../assets/icons/oils.png'),
            price: '$49.00',
        },
        {
            id: 7,
            title: 'Staples',
            url: require('../../assets/icons/eggs.png'),
            price: '$49.00',
        },
        {
            id: 7,
            title: 'Tea & Coffee',
            url: require('../../assets/icons/Tea.png'),
            price: '$49.00',
        },
        {
            id: 7,
            title: 'Baby Care',
            url: require('../../assets/icons/babycare.png'),
            product: '245 Products'
        },
        {
            id: 7,
            title: 'Packaged food',
            url: require('../../assets/icons/PakegedFood.png'),
            price: '$49.00',
        },
        {
            id: 7,
            title: 'Tea & Coffee',
            url: require('../../assets/icons/Tea.png'),
            product: '245 Products'
        },
        {
            id: 7,
            title: 'Baby Care',
            url: require('../../assets/icons/babycare.png'),
            price: '$49.00',
        },
        {
            id: 7,
            title: 'Packaged food',
            url: require('../../assets/icons/PakegedFood.png'),
            price: '$49.00',
        },


    ];
    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <ChatHeader
                backbutton
                title={title}
                navigation={navigation}
            />
            <View style={{ marginTop: 10, marginHorizontal: 12 }}>
                {ItemList.length > 0 ?
                    <FlatList
                        data={ItemList}
                        // key={'_'}
                        keyExtractor={(item, index) => 'key' + index}
                        // horizontal={false}
                        numColumns={2}
                        style={{ height: '90%' }}
                        renderItem={({ item }) => {
                            return (
                                <View style={{
                                    margin: 0,
                                    padding: 5,
                                }}>
                                    <TouchableOpacity onPress={() => navigation.navigate(routeName.ITEM_DETAIL, { item: item })}>
                                        <Card style={{
                                            width: wp(40),
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: wp(55)
                                        }}>
                                            <Icon
                                                // tintColor={colors.primary}
                                                margin={[20, 0, 0, 0]}
                                                size={80}
                                                source={{ uri: item.fullPath }}
                                            >
                                            </Icon>
                                            <ResponsiveText
                                                weight={'bold'}
                                                textAlign={'center'}
                                                margin={[0, 0, 0, 0]}
                                                color={colors.black1}
                                            >{item.title}
                                            </ResponsiveText>
                                            <View style={{ flexDirection: 'row' }}>
                                                <ResponsiveText
                                                    cutText={item.objPackage[0]?.discoutedPrice ? 'line-through' : undefined}
                                                    margin={[2, 0, 0, 0]}
                                                    color={colors.grey1}
                                                    textAlign={'center'}
                                                >Rs {item.objPackage[0]?.price}
                                                </ResponsiveText>
                                                {item.objPackage[0]?.discoutedPrice ?
                                                    <ResponsiveText
                                                        weight={'bold'}
                                                        margin={[2, 0, 0, 10]}
                                                        color={colors.grey1}
                                                        textAlign={'center'}
                                                    >Rs {item.objPackage[0]?.discoutedPrice}
                                                    </ResponsiveText>
                                                    : null}
                                            </View>
                                            {item.objPackage[0]?.discountPercent ?
                                                <View style={{
                                                    marginHorizontal: 0,
                                                    backgroundColor: colors.red,
                                                    paddingHorizontal: 15,
                                                    paddingVertical: 6,
                                                    marginBottom: 5,
                                                    borderRadius: 20,
                                                }}>
                                                    <ResponsiveText weight={'bold'} color={colors.white} size={2.9}>
                                                        {item.objPackage[0]?.discountPercent}% OFF
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
                    /> : (loading == false ?
                        <RecordNotFound />
                        : null
                    )}

            </View>
            {loading ? <Loader /> : null}

        </SafeAreaView>

    )
}

export default CategoryList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: colors.secondary,
    },
})