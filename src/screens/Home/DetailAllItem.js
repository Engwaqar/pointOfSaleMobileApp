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

const DetailAllItem = ({ navigation, route }) => {
    const [activeAlphabet, setActiveAlphabet] = useState(null);
    const data = route.params.item;
    console.log('first', data)
    return (

        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <ChatHeader
                backbutton
                title={data.title}
                navigation={navigation}
            />
            {/* <FlatList
                // data={Data.filter((v) => v.title[0] == item.title[0])}
                data={data}
                keyExtractor={(item, index) => item + index}
                numColumns={3}
                renderItem={({ item }) => {
                    return ( */}
            <View style={{
                // flex: 1,
                margin: 0,
                padding: 10,
                marginTop: 10
                // borderRadius: 7,
                //  flexDirection: 'row'
            }}>
                <TouchableOpacity onPress={() => navigation.navigate(routeName.PRODUCT_DETAIL, { item: data })}>
                    <Card style={{
                        width: wp(40),
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: wp(46),
                        bottom: 12,
                        margin: 0,
                    }}>
                        <TouchableOpacity style={{ alignSelf: 'flex-end', top: 20 }}>
                            <Icon
                                // tintColor={colors.primary}
                                size={30}
                                margin={[0, 0, 0, 0]}
                                source={globalPath.FillHeart}
                            >
                            </Icon>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Icon
                                // tintColor={colors.primary}
                                size={80}
                                borderRadius={50}
                                source={data.url}
                            >
                            </Icon>

                        </View>
                        <ResponsiveText
                            weight={'bold'}
                            textAlign={'center'}
                            margin={[0, 0, 0, 0]}
                            color={colors.black1}
                        >{data.title}
                        </ResponsiveText>
                        <ResponsiveText

                            margin={[2, 0, 0, 0]}
                            color={colors.primary}
                            textAlign={'center'}
                        >{data.price}
                        </ResponsiveText>
                        <TouchableOpacity onPress={() => navigation.navigate(routeName.SHOPPING_CART)}>
                            <View style={{
                                marginHorizontal: 0,
                                backgroundColor: colors.yellow,
                                paddingHorizontal: 25,
                                paddingVertical: 6,
                                marginBottom: 25,
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
            {/* //         )
            //     }}
            // /> */}
        </SafeAreaView>
    )
}

export default DetailAllItem

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