import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { colors } from '../../constants/colorsPallet'
import ChatHeader from '../../components/ChatHeader'
import ResponsiveText from '../../components/RnText'
import Card from '../../components/Card'
import Icon from '../../components/Icon'
import { _toast } from "../../constants/Index";
import { globalPath } from '../../constants/globalPath'
import Fonts from '../../helpers/Fonts'
import { hp, wp } from '../../helpers/Responsiveness'
import { routeName } from '../../constants/routeName'
import { ScrollView } from 'react-native-gesture-handler'
import urls from '../../redux/lib/urls'
import Api from '../../redux/lib/api'
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { getCartlist } from '../../redux/actions/user.actions'
import RadioButton from '../../components/RadioButton'
import UnitRadioButton from '../../components/UnitRadioButton'
import AsyncStorage from "@react-native-community/async-storage";

// import Loader from "../../components/loader";
const ProductDetail = ({ navigation, route }) => {
    const [count, setCount] = useState(1);
    const dispatch = useDispatch();
    const { item } = route.params
    const [loading, setLoading] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const Cartlist = useSelector(state => state.userReducers.Cartlist.data,);
    const refreshing = useSelector(state => state.userReducers.Cartlist.refreshing);
    const isloggedIn = useSelector(state => state.userReducers.loginScreen.isloggedIn)
    useEffect(() => {
        setCount(count);
    }, [count]);
    const updateCount = (type) => {
        if (type == "Inc") {
            setCount(count + 1);
        } else {
            setCount(count > 1 ? count - 1 : 1);
        }
    };
    const loginVerification = async () => {
        if (isloggedIn === false) {
            navigation.navigate(routeName.LOGIN);
        } else {
            Submit();
        }
    };
    const Submit = async () => {
        // setIsClicked(true);
        const obj = {
            "orderId": Cartlist.orderId ? Cartlist.orderId : 0,
            "orderType": 1,
            "CompanyId": 1,
            "objCartDetailDto": [
                {
                    "orderId": Cartlist.orderId ? Cartlist.orderId : 0,
                    "itemId": item.itemId
                        ? item.itemId
                        : item.id,
                    "ItemSizeId": item.objPackage[0]?.id,
                    "quantity": count,

                }
            ]
        }
        try {
            setLoading(true);
            const res = await Api.post(urls.ADD_TO_CART, obj);
            console.log("Obj", res);
            if (res && res.success == true) {
                navigation.navigate(routeName.SHOPPING_CART)
                setLoading(false);
                
                _toast(res.message)
            } else {
                setLoading(false);
                _toast(res.message)
            }
        } catch (error) {
            setLoading(false);
        }
    };
    const Data1 = [
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
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <ChatHeader
                backbutton
                 title={'Details Screen'}
                navigation={navigation}
            />
            <View style={{ marginTop: 10, marginHorizontal: 12, justifyContent: 'center', alignItems: 'center' }}>

                <Card style={{ width: wp(95), alignItems: 'center', justifyContent: 'center', height: hp(50), margin: 0, }}>
                    <Icon
                        // tintColor={colors.primary}
                        margin={[0, 0, 0, 0]}
                        size={110}
                        borderRadius={0}
                        resizeMode={'contain'}
                        source={{ uri: item.fullPath }}
                    >
                    </Icon>
                    <ResponsiveText
                        weight={'bold'}
                        // textAlign={'center'}
                        margin={[0, 0, 0, 0]}
                        color={colors.black1}
                    >{item.title}
                    </ResponsiveText>
                    <View style={{ flexDirection: 'row', }}>
                        <ResponsiveText weight={'bold'} flex={0.3} margin={[0, 20, 0, 2]} color={colors.black}>
                            Quantity:
                        </ResponsiveText>
                        <ResponsiveText flex={0} weight={'bold'} color={colors.grey1}>
                            {item.objPackage[0].unitQuantity}
                            <ResponsiveText weight={'bold'} color={colors.grey1}>
                                {item.objPackage[0].unitName}
                            </ResponsiveText>
                        </ResponsiveText>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <ResponsiveText weight={'bold'} flex={0.4} margin={[5, 0, 10, 18]} color={colors.black}>
                            Price:
                        </ResponsiveText>
                        {item.objPackage[0].discoutedPrice ?
                            <ResponsiveText margin={[5, 0, 0, 0]} weight={'bold'} color={colors.grey1}>
                                Rs {item.objPackage[0].discoutedPrice * count}
                            </ResponsiveText>
                            :
                            <ResponsiveText margin={[5, 0, 0, 0]} weight={'bold'} color={colors.grey1}>
                                Rs {item.objPackage[0].price * count}
                            </ResponsiveText>}
                    </View>
                    {/* {item.objPackage.map((item) => {
                        return (
                            <UnitRadioButton
                                Price={item.price}
                                unitQuantity={item.unitQuantity}
                                unitName={item.unitName}
                                active={selectUnitMethod == item.id}
                                onPress={() => setselectUnitMethod(item.id)}
                            />
                        );
                    })} */}
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{
                            flexDirection: 'row',
                            marginHorizontal: 0,
                            backgroundColor: colors.lightGrey,
                            paddingHorizontal: 25,
                            paddingVertical: 5,
                            marginBottom: 20,
                            borderRadius: 20,
                        }}>
                            <ResponsiveText margin={[5, 5, 0, 0]} weight={'bold'} color={colors.black} size={4}>
                                Quantity
                            </ResponsiveText>
                            <TouchableOpacity
                                onPress={() => updateCount("Dec")}
                            >
                                <View style={styles.CountBtn}>
                                    <ResponsiveText margin={[0, 0, 0, 2]} weight={'bold'} color={colors.white} size={5.2}>
                                        -
                                    </ResponsiveText>
                                </View>
                            </TouchableOpacity>
                            <View
                                style={{
                                    height: wp(8),
                                    width: wp(10),
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 45,
                                }}
                            >
                                <ResponsiveText color={colors.black} size={6}>
                                    {count}
                                </ResponsiveText>
                            </View>
                            <TouchableOpacity
                                onPress={() => updateCount("Inc")}
                            >
                                <View style={styles.CountBtn}>
                                    <ResponsiveText weight={'bold'} color={colors.white} size={5.2}>
                                        +
                                    </ResponsiveText>

                                </View>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity disabled={loading}
                            onPress={() => loginVerification()}>
                            <View style={[styles.AddToCartBtn, { backgroundColor: isClicked == true ? colors.grey1 : colors.yellow, }]}>
                                <ResponsiveText weight={'bold'} color={colors.white} size={2.9}>
                                    Add To Cart
                                </ResponsiveText>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <ResponsiveText
                        // weight={'bold'}
                        // textAlign={'center'}
                        margin={[0, 0, 0, 0]}
                        color={colors.black1}
                    >{item.description}
                    </ResponsiveText>
                </Card>
            </View>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <ResponsiveText margin={[10, 0, 0, 20]} textAlign={'center'} weight={'bold'} color={colors.black} size={4}>Exclusive Offer</ResponsiveText>
            </View>
            <View style={{ height: hp(30) }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                    {Data1.map((item) => {
                        return (
                            <View style={{
                                // flex: 1,
                                margin: 0,
                                padding: 10,
                                marginTop: 10
                                // borderRadius: 7,
                                //  flexDirection: 'row'
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
                    })}
                </ScrollView>
            </View>
        </SafeAreaView>

    )
}

export default ProductDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: colors.secondary,
    },
    CountBtn: {
        backgroundColor: colors.primary,
        paddingHorizontal: 0,
        paddingHorizontal: 10,
        marginTop: 2,
        borderRadius: 3
    },
    AddToCartBtn: {
        marginLeft: 5,
        paddingHorizontal: 20,
        paddingVertical: 12,
        marginBottom: 20,
        borderRadius: 20,
    }
})