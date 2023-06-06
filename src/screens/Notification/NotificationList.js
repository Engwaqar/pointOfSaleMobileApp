import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import moment from 'moment';
import { BarIndicator, DotIndicator } from 'react-native-indicators';
import urls from '../../redux/lib/urls'
import Api from '../../redux/lib/api';
// import moment from 'moment';
// import Loader from "../../components/loader";
// import { useDispatch, useSelector } from "react-redux";
// import { GetNotification } from '../../redux/actions/user.actions';
import Swipeout from "react-native-swipeout";
import { _toast } from '../../constants/Index'
import RnButton from '../../components/RnButton'
// import Modal from "react-native-modal";
import Input from "../../components/Input";

export default function NotifactionList({ navigation }) {
    // const dispatch = useDispatch();
    // const [loading, setLoading] = useState([]);
    // const [errorString, setErrorString] = React.useState("");
    // const Notification = useSelector(state => state.userReducers.notifactionData.data,);
    // const refreshing = useSelector(state => state.userReducers.notifactionData.refreshing);
    // const [isModalVisible, setModalVisible] = useState(false);
    // const [ComplaintsText, setComplaintsText] = useState('');
    // // const toggleModal = (id) => {
    //     setModalVisible(!isModalVisible);
    //     // setSelectedComplainid(id)
    // };
    // const Delete_Notification = (id) => {
    //     Alert.alert(
    //         'Notifaction',
    //         'Do you want to remove this notifaction ?',
    //         [
    //             {
    //                 text: 'Cancel',
    //                 onPress: () => { },
    //                 style: 'cancel',
    //             },
    //             {
    //                 text: 'OK',

    //                 onPress: async () => {
    //                     console.log(id, "iddddd")
    //                     // if(item.statusName === 'PreOrder'){
    //                     try {
    //                         setLoading(true);
    //                         const res = await Api.put(urls.Delete_Notification_ALL + id);
    //                         if (res && res.success == true) {
    //                             setLoading(false);
    //                             console.log('response', res)
    //                             dispatch(GetNotification());
    //                             _toast("Notifaction delete successfully")
    //                             // navigation.navigate.goBack()
    //                         } else {
    //                             setLoading(false);
    //                             setErrorString(res.message)
    //                         }
    //                     } catch (error) { }
    //                 },
    //             },
    //         ],
    //     );
    // };
    const button_style = (
        <View style={{ justifyContent: 'center', flex: 1 }} >
            <View
                style={{
                    alignSelf: 'center',
                    backgroundColor: colors.red,
                    height: hp(5),
                    width: hp(5),
                    borderRadius: 30,
                    marginRight: 10,
                    justifyContent: 'center',
                    // marginTop: '40%',
                    alignItems: 'center',
                    alignContent: 'center',
                    // top: 40

                }}
            >
                <Icon source={globalPath.DeleteIcon} tintColor={colors.white} />
            </View>
        </View>
    );
    // console.log('Notification', Notification)
    // useEffect(() => {
    //     dispatch(GetNotification());
    // }, [])
    // const read = async (id) => {
    //     try {
    //         setLoading(true);
    //         const res = await Api.put(urls.UPDATE_NOTIFICATIONS + id);
    //         console.log('NotificationUpdate', res);
    //         if (res && res.success == true) {
    //             setLoading(false);
    //             dispatch(GetNotification());
    //         } else {
    //             setLoading(false);
    //             setErrorString(res.message)
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
    // const ComplaintStatus = async (id, status,statusUpdate) => {
    //     var obj = {
    //         "isFixed": status,
    //         "UserNoMeassage": ComplaintsText,
    //         "AssignedComplainStatus":statusUpdate,
    //     }
    //     console.log('obj of complaint', obj)
    //     try {
    //         setLoading(true);
    //         const res = await Api.put(urls.COMPLAIN_CONFIRMATION_USER + id, obj);
    //         console.log('ComplaintUpdate', res);
    //         if (res && res.success == true) {
    //             setLoading(false);
    //             dispatch(GetNotification());
    //             props.navigation.goBack()
    //             _toast("Thanks For Giving Remarks")
    //             setComplaintsText('')

    //             // navigation.goBack()
    //             // GetWorkerComplaints()

    //         } else {
    //             setLoading(false);
    //             setErrorString(res.message)
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
    const Data2 = [
        {
            title: 'Fruits & Veg',
            id: 1,
            Date: '26-Jun-2022',
            Time: '01:30 PM',
            TicketNum: '5262562-53636',
            des: 'Lorem Impsum dolor ',
            statusName: 'Inprocess'
        },
        {
            title: 'Beverages',
            id: 1,
            Date: '26-Jun-2022',
            Time: '01:30 PM',
            TicketNum: '5262562-53636',
            des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
            statusName: 'Done'
        },
        {
            title: 'Household',
            id: 1,
            Date: '26-Jun-2022',
            Time: '01:30 PM',
            TicketNum: '5262562-53636',
            des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
            statusName: 'Pending'
        },
        {
            title: 'Personal Care',
            id: 1,
            Date: '26-Jun-2022',
            Time: '01:30 PM',
            TicketNum: '5262562-53636',
            des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
            statusName: 'Inprocess'
        },
        {
            title: 'Branded Foods',
            id: 1,
            Date: '26-Jun-2022',
            Time: '01:30 PM',
            TicketNum: '5262562-53636',
            des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
            statusName: 'Done'
        },
        {
            title: 'Bakery',
            id: 1,
            Date: '26-Jun-2022',
            Time: '01:30 PM',
            TicketNum: '5262562-53636',
            des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
            statusName: 'Done'
        },
        {
            title: 'Eggs & Meat',
            id: 1,
            Date: '26-Jun-2022',
            Time: '01:30 PM',
            TicketNum: '5262562-53636',
            des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
            statusName: 'Done'
        },
        {
            title: 'Oil & Maslas',
            id: 1,
            Date: '26-Jun-2022',
            Time: '01:30 PM',
            TicketNum: '5262562-53636',
            des: 'Lorem Impsum dolor sit amet, conseceutur adipis cing elit maunis',
            statusName: 'Done'
        },

    ];
    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <ChatHeader
                backbutton
                title={'Notification'}
                navigation={navigation}
            />
            <View style={{ flexDirection: 'row' }}>
                <ResponsiveText
                    margin={[15, 0, 5, 15]}
                    color={colors.black}
                    weight={'bold'}
                    size={4}
                >Notification List
                </ResponsiveText>


            </View>
            <View style={styles.footer}>
                <ScrollView>
                    {Data2.length > 0 ?
                        Data2.map((item) => {
                            return (

                                <Swipeout
                                    autoClose={true}
                                    style={{
                                        marginHorizontal: wp(0),

                                        marginTop: 10,
                                        // backgroundColor: colors.white,
                                        marginHorizontal: 18,
                                        borderRadius: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flex:1
                                    }}
                                    right={[
                                        {
                                            component: button_style,
                                            autoClose: true,
                                            backgroundColor: colors.grey1,
                                            // onPress: () => Delete_Notification(item.id)
                                        },
                                    ]}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            width:wp(90),
                                            backgroundColor: colors.white,
                                            padding:10
                                        }}
                                    >
                                        {/* <TouchableOpacity
                                            onPress={() => read(item.id)}
                                            style={{
                                                backgroundColor: item.isRead == false ? colors.lighterGrey : colors.white,
                                                // borderRadius: 5,
                                                // marginBottom: 5,
                                                // padding: 7,
                                                paddingVertical: 10,
                                                flexDirection: 'row',
                                                // overflow: 'hidden',
                                                // marginTop: 5,
                                                // elevation: 2,
                                            }}> */}

                                        {/* <Icon source={item.url} borderRadius={7} size={60} /> */}
                                        <View style={{  marginLeft: 10, justifyContent: 'center',flex:1 }}>
                                                <ResponsiveText size={3.5} weight={'bold'} color={colors.primary}>
                                                    {item.title}
                                                </ResponsiveText>
                                                 
                                                <ResponsiveText flex={1}  size={2.7} weight={'bold'}
                                                    color={colors.black}
                                                //  color={item.remarks == 'Cancled' ? colors.red1 : item.remarks == 'Paid' ? colors.blue1 : item.remarks == 'InProcess' ? colors.green1 : item.remarks == 'Delivered' ? colors.yellow : item.remarks == 'Served' ? colors.yellow : item.remarks == 'Billed' ? colors.green1 : colors.white}
                                                >
                                                    {item.des}
                                                </ResponsiveText>
                                           
                                            <ResponsiveText color={colors.grey1} size={2.7}>
                                                Date Time: {moment(item.Date).format("D-M-yyyy  LTS")}
                                            </ResponsiveText>
                                            <View style={{ flexDirection: 'row' }}>
                                                <ResponsiveText margin={[0, 0, 0, 5]} weight={'bold'} color={colors.blue3} flex={0}>TicketNo:</ResponsiveText>

                                                <ResponsiveText margin={[0, 0, 0, 5]} color={colors.blue3} flex={1}>{item.TicketNum}</ResponsiveText>
                                            </View>
                                            {/* <View
                                                    style={{
                                                        width: '30%',
                                                        justifyContent: 'flex-start',
                                                        overflow: 'hidden',
                                                    }}>
                                                    <ResponsiveText
                                                        size={2.5}
                                                        margin={[0, 0, 0, 0]}
                                                        color={item.isRead == false ? colors.black : colors.grey1}>
                                                        {item.ticketNO}
                                                    </ResponsiveText>

                                                </View> */}

                                        </View>

                                        {/* </TouchableOpacity> */}
                                    </View>
                                </Swipeout>

                            )
                        })
                        : null
                        // (loading == false || refreshing == false ?
                        //     <View style={{ width: wp(100), marginTop: 100, alignItems: 'center', alignSelf: 'center' }}>
                        //         <Icon borderColor={colors.yellow} borderWidth={0} borderRadius={0} size={250} source={require('../../assets/icons/norecordfound.png')} />
                        //     </View> : null
                        // )
                    }
                    <View style={{ height:hp(10) }}>

                    </View>
                </ScrollView>

            </View>
            {/* {
                loading == true || refreshing == true ?
                    <Loader />
                    :
                    null
            } */}

        </SafeAreaView >

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondary,
    },
    footer: {
        flex: 1,
        backgroundColor: colors.lightWhite,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        // justifyContent:'flex-end'

    },
})
