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
// import Loader from "../../components/loader";
const ItemDetail = ({ navigation, route }) => {
    const [count, setCount] = useState(1);
    const dispatch = useDispatch();
    const { item } = route.params
    const [loading, setLoading] = useState([]);
    const [selectUnitMethod, setselectUnitMethod] = useState(item.objPackage[0]?.id);
    const Cartlist = useSelector(state => state.userReducers.Cartlist.data,);
    const refreshing = useSelector(state => state.userReducers.Cartlist.refreshing);
    // const itemObj=item.objPackage[0]
     console.log('titlekkkkk', item)
    // console.log('count', count)
    useEffect(() => {
        setCount(count);
        // setslectedTopping(slectedTopping);
    }, [count]);
    const updateCount = (type) => {
        if (type == "Inc") {
            setCount(count + 1);
        } else {
            setCount(count > 1 ? count - 1 : 1);
        }
    };
    // function getIndex(id) {
    //     return item.objPackage.findIndex(obj => obj.id === item.id);
    //   }
    //   console.log('getIndex', getIndex('id'))
    const Submit = async () => {
        // setErrorString("");

        // if (productName == "") {
        //     setErrorString("Product name is required!");
        //     return false;
        // }  

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
                // dispatch(getSellerProducts());
                _toast(res.message)
            } else {
                setLoading(false);
                _toast(res.message)
            }
        } catch (error) {
            setLoading(false);
            //   setErrorString(error);
        }
    };
    return (

        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <ChatHeader
                backbutton
                // title={title}
                navigation={navigation}
            />
            <ScrollView>
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
                            <ResponsiveText margin={[5, 0, 0, 0]} weight={'bold'} color={colors.grey1}>
                               Rs {item.objPackage[0].price}
                            </ResponsiveText>
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
                            <TouchableOpacity onPress={() => Submit()}>
                                <View style={styles.AddToCartBtn}>
                                    <ResponsiveText weight={'bold'} color={colors.white} size={2.9}>
                                        Add To Cart
                                    </ResponsiveText>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {/* <ResponsiveText
                            weight={'bold'}
                            // textAlign={'center'}
                            margin={[0, 0, 0, 0]}
                            color={colors.black1}
                        >{item.description}
                        </ResponsiveText> */}
                    </Card>
                </View>
                <View style={{ backgroundColor: colors.white, borderRadius: 5, marginHorizontal: 12, marginTop: 5, paddingVertical: hp(2) }}>
                    <ResponsiveText margin={[10, 0, 0, 20]} weight={'bold'} color={colors.black} size={4}>Product Description</ResponsiveText>
                    <ResponsiveText margin={[10, 0, 0, 20]} color={colors.black} size={3}>{item.description}</ResponsiveText>
                    <ResponsiveText margin={[10, 0, 0, 20]} weight={'bold'} color={colors.black} size={4}>About the product</ResponsiveText>
                    <ResponsiveText margin={[10, 0, 0, 20]} color={colors.black} size={3}>{item.description}</ResponsiveText>


                </View>
                <View style={{ height: hp(10) }}>

                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default ItemDetail

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
        backgroundColor: colors.yellow,
        paddingHorizontal: 20,
        paddingVertical: 12,
        marginBottom: 20,
        borderRadius: 20,
    }
})