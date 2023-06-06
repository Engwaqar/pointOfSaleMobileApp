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
import moment from 'moment';
// import Loader from "../../components/loader";
import HomeHeader from '../../components/HomeHeader'
import Input2 from '../../components/Input2'
import Input from '../../components/Input';
import ChatHeader from '../../components/ChatHeader'

const ViewAllItemScreen = ({ navigation }) => {
    const [activeAlphabet, setActiveAlphabet] = useState(null);
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })
    const scrollRef = useRef(null)
    const Data = [
        {
            id: 1,
            url: require('../../assets/icons/bannnarImage.jpeg'),
            price: '$49.00',
            title: 'Fruits & Veg',
            name: 'Fruits & Veg',
        },

        {
            id: 2,
            url: require('../../assets/icons/bannnarImage.jpeg'),
            price: '$49.00',
            title: 'Beverages',
            name: 'Beverages',

        },
        {
            id: 3,
            url: require('../../assets/icons/bannnarImage.jpeg'),
            price: '$49.00',
            title: 'Household',
            name: 'Household',

        },
        {
            id: 4,
            url: require('../../assets/icons/bannnarImage.jpeg'),
            price: '$49.00',
            title: 'Personal Care',
            name: 'Personal Care',
        },



        {
            id: 7,
            url: require('../../assets/icons/bannnarImage.jpeg'),
            price: '$49.00',
            title: 'Eggs & Meat',
            name: 'Eggs & Meat',
        },

        {
            id: 8,
            url: require('../../assets/icons/bannnarImage.jpeg'),
            price: '$49.00',
            title: 'Oil & Maslas',
            name: 'Oil & Maslas',
        },
        {
            id: 9,
            url: require('../../assets/icons/bannnarImage.jpeg'),
            price: '$49.00',
            title: 'Staples',
            name: 'Staples',
        },
        {
            id: 10,
            url: require('../../assets/icons/bannnarImage.jpeg'),
            price: '$49.00',
            title: 'Tea & Coffee',
            name: 'Tea & Coffee',
        },
        {
            id: 10,
            url: require('../../assets/icons/cake.png'),
            price: '$49.00',
            title: 'Water Nestle',
            name: 'Water Nestle',
        },
    ];
    const newArray = [];
    Data.forEach(obj => {
        if (!newArray.some(o => o.title[0] === obj.title[0])) {
            newArray.push({ ...obj })
        }

    });
    const ScrollHandler = (item, index) => {
        setActiveAlphabet(item.title)
        console.log("Items>>>>", item, index)
        scrollRef?.current.scrollToIndex({ index, viewOffset: hp(22) })

    };
    return (

        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <ChatHeader
                backbutton
                // title={title}
                navigation={navigation}
            />
            <View style={{
                position: 'absolute',
                height: '85%',
                marginRight: 10,
                width: wp(5),
                backgroundColor: colors.lighterGrey,
                zIndex: 5000,
                right: 0,
                marginTop: hp(15),
                alignItems: 'center',
                borderRadius: 10,
                justifyContent: 'center'
            }}>
                {newArray.sort((a, b) => a.name.localeCompare(b.name)).map((item, index) => {
                    return (
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <TouchableOpacity style={{
                                marginBottom: 2,
                                backgroundColor: colors.grey,
                                height: 25,
                                width: 25,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 1000
                            }} onPress={() => ScrollHandler(item, index)}>
                                <ResponsiveText color={colors.black1}>{item.name[0]}</ResponsiveText>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
            <FlatList
                data={newArray}
                ref={scrollRef}
                keyExtractor={(item, index) => item + index}
                style={{ height: '89%' }}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <ResponsiveText margin={[10, 0, 0, 20]} weight={'bold'} >{item.title[0]}</ResponsiveText>
                            <FlatList
                                data={Data.filter((v) => v.title[0] == item.title[0])}
                                // ref={scrollRef}
                                keyExtractor={(item, index) => item + index}
                                numColumns={3}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{
                                            marginHorizontal: 2,
                                            marginTop: 5,
                                            flexDirection: 'row'
                                        }}>
                                            <View style={{ paddingLeft: 25, justifyContent: 'center', paddingVertical: 2 }}>
                                                <TouchableOpacity
                                                    onPress={() => navigation.navigate(routeName.DETAIL_ALL_ITEM, { item: item })}
                                                >
                                                    <View style={{ backgroundColor: colors.lightBlack, width: wp(82), borderRadius: 10 }}>
                                                        <ResponsiveText margin={[10, 0, 10, 10]} color={colors.white}>{item.title}</ResponsiveText>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            {/* <Card style={{ width: wp(30), alignItems: 'center', justifyContent: 'center', height: wp(40), margin: 0, }}>
                                                <Icon
                                                    // tintColor={colors.primary}
                                                    size={70}
                                                    source={item.url}
                                                >
                                                </Icon>
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
                                                    <View style={{ marginHorizontal: 0, backgroundColor: colors.yellow, paddingHorizontal: 15, paddingVertical: 5, marginBottom: 20, borderRadius: 20, }}>
                                                        <ResponsiveText weight={'bold'} color={colors.white} size={2}>
                                                            Add To Cart
                                                        </ResponsiveText>
                                                    </View>
                                                </TouchableOpacity>
                                            </Card> */}
                                        </View>
                                    )
                                }}
                            />

                        </View>)
                }}
            />
        </SafeAreaView>
    )
}

export default ViewAllItemScreen

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