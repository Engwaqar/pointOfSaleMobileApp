import {
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../../components/HomeHeader";
import { colors } from "../../constants/colorsPallet";
import { globalPath } from "../../constants/globalPath";
import { ScrollView } from "react-native-gesture-handler";
import ResponsiveText from "../../components/RnText";
import { hp, wp } from "../../helpers/Responsiveness";
import Icon from "../../components/Icon";
import { routeName } from "../../constants/routeName";
import PaymentCard from "../../components/PaymentCard";
import Loader from "../../components/Loader";
import OrderCard from "../../components/OrderCard";
import ChatHeader from "../../components/ChatHeader";
import { _toast } from "../../constants/Index";
import RnButton from "../../components/RnButton";
import Steps from "../../components/Steps";

const ConfirmOrder = ({ navigation, route }) => {
    const { item } = route.params;
    console.log('confirm Order', item)

    return (
        <SafeAreaView
            style={{ flex: 1 }}
            edges={['bottom', "left", "right"]}
        >
            <ChatHeader
                title={'Order Completed'}
            />

            <View style={{ backgroundColor: colors.white, flex: 1, }}>
                <Steps first second third />
                <ScrollView>
                    <View style={styles.advertisementBanner}>
                        {/* <Swiper data={StateLife} /> */}
                        <ResponsiveText color={colors.black} size={5}>
                            Order Placed Successfully
                        </ResponsiveText>
                        <View style={{ marginTop: 0 }}>
                            <Icon
                                size={330}
                                source={globalPath.OrderPlacedIcon}
                            >
                            </Icon>
                        </View>
                        <ResponsiveText color={colors.black} size={6}>
                            Thank you!
                        </ResponsiveText>
                        <ResponsiveText textAlign={'center'} color={colors.black} size={5}>
                            Your order has been {'\n'}confirmed
                        </ResponsiveText>
                        <View style={{ flexDirection: 'row' }}>
                            <ResponsiveText textAlign={'center'} weight={'bold'} color={colors.black} size={5}>
                                Order#
                            </ResponsiveText>
                            <ResponsiveText textAlign={'center'} weight={'bold'} color={colors.black} size={5}>
                                {' '}{item.objCartDetailDto[0].orderId}
                            </ResponsiveText>
                        </View>
                        {/* <TouchableOpacity onPress={() => navigation.navigate(routeName.BOTTOM_TABS)}>
                        <RnButton btnStyle={{width:wp(50),marginTop:hp(5)}} title={'More Buy'}/>
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            onPress={() => navigation.navigate(routeName.BOTTOM_TABS)}
                            style={{
                                marginTop: hp(5),
                                backgroundColor: colors.primary,
                                height: 45,
                                width: wp(45),
                                justifyContent: "center",
                                paddingHorizontal: 15,
                                borderRadius: 15,
                            }}
                        >
                            <ResponsiveText textAlign={'center'} color={colors.white} size={5}>
                                More Buy
                            </ResponsiveText>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default ConfirmOrder;

const styles = StyleSheet.create({
    advertisementBanner: {
        marginTop: 5,
        alignItems: "center",

    },

});

