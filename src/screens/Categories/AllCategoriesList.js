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
import Loader from "../../components/Loader";
const AllCategoriesList = ({ navigation }) => {
    const [ItemCategories, setItemCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        Categories();
    }, []);
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

    const Data = [
        {
            id: 1,
            title: 'Fruits & Veg',
            url: require('../../assets/icons/F.png'),
            product: '245 Products'
        },

        {
            id: 2,
            title: 'Beverages',
            url: require('../../assets/icons/Beverage.png'),
            product: '245 Products'
        },
        {
            id: 3,
            title: 'Household',
            url: require('../../assets/icons/cimage.png'),
            product: '245 Products'
        },
        {
            id: 4,
            title: 'Personal Care',
            url: require('../../assets/icons/PCare.png'),
            product: '245 Products'
        },
        {
            id: 5,
            title: 'Branded Foods',
            url: require('../../assets/icons/Food.png'),
            product: '245 Products'
        },


        {
            id: 6,
            title: 'Bakery',
            url: require('../../assets/icons/cake.png'),
            product: '245 Products'
        },
        {
            id: 7,
            title: 'Eggs & Meat',
            url: require('../../assets/icons/eggs.png'),
            product: '245 Products'
        },
        {
            id: 7,
            title: 'Oil & Maslas',
            url: require('../../assets/icons/oils.png'),
            product: '245 Products'
        },
        {
            id: 7,
            title: 'Staples',
            url: require('../../assets/icons/eggs.png'),
            product: '245 Products'
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
            product: '245 Products'
        },
        {
            id: 7,
            title: 'Packaged food',
            url: require('../../assets/icons/PakegedFood.png'),
            product: '245 Products'
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
            product: '245 Products'
        },
        {
            id: 7,
            title: 'Packaged food',
            url: require('../../assets/icons/PakegedFood.png'),
            product: '245 Products'
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
            product: '245 Products'
        },
        {
            id: 7,
            title: 'Packaged food',
            url: require('../../assets/icons/PakegedFood.png'),
            product: '245 Products'
        },

    ];
    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <ChatHeader
                title="Categories"
                navigation={navigation}

            />
            <View style={{ marginTop: 10, marginHorizontal: 12 }}>
                <FlatList
                    data={ItemCategories}
                    // key={'_'}
                    keyExtractor={(item, index) => 'key' + index}
                    // horizontal={false}
                    numColumns={3}
                    style={{ height: hp(83) }}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate(routeName.CATEGORY_LIST,
                                    { title: item.title,id:item.id }
                                )}
                            >
                                <Card>
                                    <Icon
                                        // tintColor={colors.primary}
                                        size={40}
                                        source={{uri:item.fullPath}}
                                    >
                                    </Icon>
                                    <ResponsiveText
                                    size={3}
                                        weight={'bold'}
                                        textAlign={'center'}
                                        margin={[5, 0, 0, 0]}
                                        color={colors.black}
                                    >{item.title}
                                    </ResponsiveText>
                                    <ResponsiveText
                                        margin={[0, 0, 0, 0]}
                                        color={colors.grey1}
                                        textAlign={'center'}
                                        size={2.5}
                                    >{item.quantity} Products
                                    </ResponsiveText>
                                </Card>
                            </TouchableOpacity>

                        )
                    }}
                />

            </View>
            {loading ? <Loader /> : null}
        </SafeAreaView>

    )
}

export default AllCategoriesList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: colors.secondary,
    },
})