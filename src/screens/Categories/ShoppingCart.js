import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { colors } from '../../constants/colorsPallet'
import ChatHeader from '../../components/ChatHeader'
import ResponsiveText from '../../components/RnText'
import Card from '../../components/Card'
import TextProfile from '../../components/TextProfile'
import Icon from '../../components/Icon'
import { globalPath } from '../../constants/globalPath'
import Fonts from '../../helpers/Fonts'
import { hp, wp } from '../../helpers/Responsiveness'
import { routeName } from '../../constants/routeName'
import { ScrollView } from 'react-native-gesture-handler'
import urls from '../../redux/lib/urls'
import Api from '../../redux/lib/api'
import { _toast } from "../../constants/Index";
// import Loader from "../../components/Loader";
import moment from 'moment';
// import Loader from "../../components/loader";
import Swipeout from "react-native-swipeout";
import { useDispatch, useSelector } from "react-redux";
import { getCartlist } from '../../redux/actions/user.actions'
import RecordNotFound from '../../components/RecordnotFound'
import Steps from '../../components/Steps'
const ShoppingCart = ({ navigation, route }) => {
    const [count, setCount] = useState(1);
    const [Qunatity, setQunatity] = useState(1);
    const dispatch = useDispatch();
    const [Loading, setLoading] = useState(false);
    const Cartlist = useSelector(state => state.userReducers.Cartlist.data,);
    const refreshing = useSelector(state => state.userReducers.Cartlist.refreshing);
    console.log('Cartlist', Cartlist)
    useEffect(() => {
        dispatch(getCartlist());
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
            "companyId": 1,
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
            title: 'Pepsi Soda,12 oz Cans,24 Count'
        },

        {
            id: 2,
            url: require('../../assets/icons/bannnarImage.jpeg'),
            price: '$ 7.48 $8.48 2.6/floz',
            title: 'Pepsi Soda,12 oz Cans,24 Count'
        },
        {
            id: 3,
            url: require('../../assets/icons/bannnarImage.jpeg'),
            price: '$ 7.48 $8.48 2.6/floz',
            title: 'Fruits & Veg'
        },



    ];
    return (

        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <ChatHeader
                backbutton
                title={'Cart List'}
                navigation={navigation}
            />
            {Object.keys(Cartlist).length > 0 ?
                <Steps first />
                : null}
            <ScrollView>
                {Object.keys(Cartlist).length > 0 ?
                    Cartlist.objCartDetailDto.map((item) => {
                        return (
                            <View style={{ marginTop: 6, justifyContent: 'center', alignItems: 'center' }}>
                                <Card flexDirection='row' style={{ width: wp(90), marginHorizontal: 10, height: hp(18) }}>
                                    <Icon
                                        size={80}
                                        source={{ uri: item.fullPath }}>
                                    </Icon>
                                    <View style={{ flex: 1 }} >
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <ResponsiveText margin={[0, 0, 0, 10]} flex={1} weight={'bold'} color={colors.black}>{item.title}</ResponsiveText>
                                            <ResponsiveText margin={[0, 0, 0, 10]} weight={'bold'} color={colors.black} >Payable Rs: {item.price * item.quantity}</ResponsiveText>
                                        </View>
                                        <ResponsiveText margin={[0, 0, 0, 10]} weight={'bold'} color={colors.black} >Price: {item.price}</ResponsiveText>
                                        {/* <ResponsiveText margin={[0, 0, 0, 10]} weight={'bold'} color={colors.primary} >{item.description}</ResponsiveText> */}
                                        <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 5 }}>
                                            <TouchableOpacity
                                                onPress={() => updateCount("Dec", item.quantity, item)}
                                            >
                                                <View style={{ backgroundColor: colors.primary, paddingHorizontal: 12, marginLeft: 5, borderRadius: 5 }}>
                                                    <ResponsiveText weight={'bold'} color={colors.white} size={6}>
                                                        -
                                                    </ResponsiveText>
                                                </View>
                                            </TouchableOpacity>
                                            <View
                                                style={styles.Count}
                                            >
                                                <ResponsiveText color={colors.black} size={6}>
                                                    {item.quantity}
                                                </ResponsiveText>
                                            </View>
                                            <TouchableOpacity
                                                onPress={() => updateCount("Inc", item.quantity, item)}
                                            >
                                                <View style={{ backgroundColor: colors.primary, paddingHorizontal: 5, paddingHorizontal: 10, borderRadius: 5 }}>
                                                    <ResponsiveText weight={'bold'} color={colors.white} size={6}>
                                                        +
                                                    </ResponsiveText>

                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => {
                                                Alert.alert(
                                                    "",
                                                    "Do you want to " +
                                                    item.title +
                                                    " " +
                                                    "order?",
                                                    [
                                                        {
                                                            text: "Cancel",
                                                            onPress: () => { },
                                                            style: "cancel",
                                                        },
                                                        {
                                                            text: "OK",
                                                            onPress: () => {
                                                                Delete_Order(item.id);
                                                            },
                                                        },
                                                    ]
                                                );
                                            }}
                                                style={{ justifyContent: 'center', flex: 1, marginLeft: 30 }}>
                                                <View
                                                    style={styles.DelIcon}
                                                >
                                                    <Icon source={globalPath.DeleteIcon} tintColor={colors.white} />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </Card>
                            </View>
                        )
                    }) : null}

                {Cartlist.objCartDetailDto?.length > 0 ?
                    <View>
                        <Card style={{ width: wp(90), marginLeft: 18, marginTop: 20, height: hp(25), }}>
                            <View style={{ flexDirection: 'row', marginTop: 5, borderBottomWidth: 1, borderBottomColor: colors.lightWhite, }}>
                                <ResponsiveText flex={0.9} size={4.5} margin={[5, 0, 0, 0]} weight={'bold'} color={colors.grey5} >{'Price Details'}</ResponsiveText>
                            </View>
                            <View style={styles.Text}>
                                <ResponsiveText size={4} flex={0.9} margin={[0, 0, 0, 0]} weight={'bold'} color={colors.black} >{'Sub Total'}</ResponsiveText>
                                <ResponsiveText margin={[0, 0, 0, 0]} weight={'bold'} color={colors.black} >{Cartlist.subTotal}</ResponsiveText>
                            </View>
                            <View style={styles.Text}>
                                <ResponsiveText size={4} flex={0.9} margin={[0, 0, 0, 0]} weight={'bold'} color={colors.black} >{'Delivery Fee'}</ResponsiveText>
                                <ResponsiveText margin={[0, 0, 0, 0]} weight={'bold'} color={colors.primary} >{'Free'}</ResponsiveText>
                            </View>
                            <View style={styles.Text}>
                                <ResponsiveText size={4} flex={0.9} margin={[0, 0, 0, 0]} weight={'bold'} color={colors.black} >{'Amount Payable'}</ResponsiveText>
                                <ResponsiveText margin={[0, 0, 0, 0]} weight={'bold'} color={colors.black} >{Cartlist.subTotal + Cartlist.deliveryCharges}</ResponsiveText>
                            </View>
                            <View style={styles.Text}>
                                <ResponsiveText size={3} flex={0.9} margin={[0, 0, 0, 0]} weight={'bold'} color={colors.primary} >{'You will save $4.00 on this order'}</ResponsiveText>
                            </View>
                        </Card>
                        <Card style={{ width: wp(90), marginLeft: 18, marginTop: 15, height: hp(10), }}>
                            <View style={{ flexDirection: 'row', borderBottomColor: colors.lightWhite, alignItems: 'center' }}>
                                <ResponsiveText size={5} flex={0.9} margin={[0, 0, 0, 0]} weight={'bold'} color={colors.black} >Payable:{' '}{Cartlist.subTotal + Cartlist.deliveryCharges}</ResponsiveText>
                                <TouchableOpacity onPress={() => navigation.navigate(routeName.PAYMENT_METHOD, { item: Cartlist })}>
                                    <View style={{ backgroundColor: colors.primary, height: hp(6), width: wp(30), borderRadius: 3 }}>
                                        <ResponsiveText margin={[10, 0, 0, 0]} textAlign={'center'} weight={'bold'} color={colors.white} size={4}>
                                            Check Out
                                        </ResponsiveText>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </Card>
                    </View>
                    : <RecordNotFound />}
            </ScrollView >
            <View style={{ height: hp(0) }}>

            </View>
            {/* {Loading ? <Loader /> : undefined} */}
        </SafeAreaView >

    )
}

export default ShoppingCart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: colors.secondary,
    },
    Text: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 0,
        borderBottomColor: colors.lightWhite,
        flex: 1,
    },
    DelIcon: {
        alignSelf: 'center',
        backgroundColor: colors.red,
        height: hp(5),
        width: hp(5),
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    Count: {
        // backgroundColor: colors.primary,
        height: wp(7),
        width: wp(10),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 45,
    }
})