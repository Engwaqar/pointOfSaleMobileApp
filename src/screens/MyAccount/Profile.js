import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { colors } from '../../constants/colorsPallet'
import { isImage } from '../../constants/Index'

import ChatHeader from '../../components/ChatHeader'
import ResponsiveText from '../../components/RnText'
import Card from '../../components/Card'
import Icon from '../../components/Icon'
import { globalPath } from '../../constants/globalPath'
import Fonts from '../../helpers/Fonts'
import { hp, wp } from '../../helpers/Responsiveness'
import { routeName } from '../../constants/routeName'
// import RadioButton from '../../components/RadioButton'
import Input from "../../components/Input";
import PaymentCard from '../../components/PaymentCard'
import Api from '../../redux/lib/api'
import urls from '../../redux/lib/urls'
import Loader from "../../components/Loader";
import { ScrollView } from 'react-native-gesture-handler'
import { IsDueDate } from '../../constants/Index'
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from "@react-native-community/async-storage";
import { StackActions } from "@react-navigation/native";
import { getProfile } from '../../redux/actions/user.actions'
import { useDispatch, useSelector } from 'react-redux'
import { TextProfile } from '../../components/TextProfile'
const Profile = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const GetUserData = useSelector(state => state.userReducers.profileData.data,);
    const loading = useSelector(state => state.userReducers.profileData.refreshing);
    useEffect(() => {
        dispatch(getProfile());
    }, [])
    console.log('User Profile', GetUserData)
    const logout = () => {
        Alert.alert("Logout", "Confirm Logout", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            {
                text: "OK",
                onPress: async () => {
                    // await AsyncStorage.removeItem('@token');
                    // await AsyncStorage.removeItem('@userId');
                    await AsyncStorage.clear();

                    navigation.dispatch(StackActions.replace("Auth"));
                },
            },
        ]);
    };

    // const [image, setImage] = useState(null);
    // const toggel = () => {
    //     Alert.alert("Profile Image", "change profile Image", [
    //         {
    //             text: "Cancel",
    //             onPress: () => console.log("Cancel Pressed"),
    //             style: "cancel",
    //         },
    //         {
    //             text: "Select from gallary",
    //             onPress: async () => {
    //                 takephotofromgallary();
    //             },
    //         },
    //     ]);
    // };
    // const takephotofromgallary = async () => {
    //     ImagePicker.openPicker({
    //         width: 300,
    //         height: 400,
    //         cropping: true,
    //     }).then((image) => {
    //         //   addPhoto(image);
    //         setImage(image);
    //         AsyncStorage.setItem('ProfileImage', JSON.stringify(image));
    //         console.log(image, "image working");
    //     });
    // };

    return (

        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <ChatHeader
                backbutton
                title={'Profile'}
                navigation={navigation}
            />
            <ScrollView>
                <View style={styles.footer}>
                    <View style={{ top: 10 }}>

                        <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Card flexDirection='row' style={{ width: wp(90), margin: 0, marginHorizontal: 10, top: 0, borderRadius: 0 }}>
                                <View style={{
                                    alignItems: "flex-end",
                                    alignSelf: "center",
                                }}>
                                    <TouchableOpacity
                                        style={{
                                            zIndex: 1,
                                            position: "absolute",
                                            // borderRadius: 30,
                                            marginTop: 15,
                                        }}
                                        onPress={() => toggel()}
                                    >
                                        {/* <Icon
                                            tintColor={colors.lighterGrey}
                                            margin={[40, 0, 0, 0]}
                                            size={22} source={globalPath.Camera} /> */}
                                    </TouchableOpacity>
                                    <View style={{ alignSelf: 'center', marginTop: 0 }}>
                                        <Image
                                            defaultSource={globalPath.User}
                                            source={isImage(GetUserData.fullPath)?{ uri: GetUserData.fullPath }:globalPath.User}
                                        
                                            // source={
                                            //     GetUserData.fullPath == null
                                            //         ? globalPath.User
                                            //         : { uri: GetUserData.fullPath }
                                            // }
                                            style={{
                                                borderRadius: 70,
                                                height: wp(22),
                                                width: wp(22),
                                                resizeMode: 'cover',
                                                backgroundColor: colors.lighterGrey,
                                            }}
                                        />
                                    </View>

                                </View>
                                {/* <Icon margin={[0, 0, 0, 0]}
                                    size={70}
                                    source={globalPath.User}>
                                </Icon> */}
                                <View style={{ flex: 1 }} >
                                    <View style={{ flexDirection: 'row' }}>
                                        <ResponsiveText flex={1} margin={[0, 0, 0, 10]} weight={'bold'} color={colors.black} >{GetUserData ? GetUserData.userName : 'Jhon Deo'}</ResponsiveText>
                                        <TouchableOpacity onPress={() => navigation.navigate(routeName.EDIT_PROFILE)}>
                                            <Icon margin={[0, 7, 0, 0]}
                                                size={30}
                                                source={globalPath.editProfile}>
                                            </Icon>
                                        </TouchableOpacity>
                                    </View>
                                    <ResponsiveText margin={[5, 0, 0, 10]} weight={'bold'} color={colors.primary} >{GetUserData ? GetUserData.address : '133, Aurangzeb Block, New Garden Town, Lahore-54600, Pakistan'}</ResponsiveText>
                                </View>
                            </Card>
                        </View>
                        <View style={styles.footer}>
                            <Card style={{ marginHorizontal: 20, width: wp(90), height: hp(50) }}>
                                <View style={{ flexDirection: 'row', marginTop: 20, }}>
                                    <View style={styles.Text}>
                                        <TextProfile

                                            Title='User Name'
                                            color={colors.black}
                                            size={4}
                                            weight={'bold'}

                                        />
                                    </View>
                                    <View style={styles.Text2}>
                                        <TextProfile

                                            Title={GetUserData ? GetUserData.userName +' '+GetUserData.fullName : 'userName'}
                                            color={colors.black}
                                            size={3.2}

                                        />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <View style={styles.Text}>
                                        <TextProfile

                                            Title='Father Name'
                                            color={colors.black}
                                            size={4}
                                            weight={'bold'}

                                        />
                                    </View>
                                    <View style={styles.Text2}>
                                        <TextProfile
                                            Title={GetUserData.fatherName ? GetUserData.fatherName : 'fatherName'}
                                            color={colors.black}
                                            size={3.2}
                                        />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={styles.Text}>
                                        <TextProfile

                                            Title='Email'
                                            color={colors.black}
                                            size={4}
                                            weight={'bold'}

                                        />
                                    </View>
                                    <View style={styles.Text2}>
                                        <TextProfile

                                            Title={GetUserData.email ? GetUserData.email : 'abc@gmail.com'}
                                            color={colors.black}
                                            size={3.2}
                                        />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <View style={styles.Text}>
                                        <TextProfile

                                            Title='Contact'
                                            color={colors.black}
                                            size={4}
                                            weight={'bold'}
                                        />
                                    </View>
                                    <View style={styles.Text2}>
                                        <TextProfile

                                            Title={GetUserData.contactNumber ? GetUserData.contactNumber : '03XX-XXXXXXX'}
                                            color={colors.black}
                                            size={3.2}
                                        />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <View style={styles.Text}>
                                        <TextProfile

                                            Title='Gender'
                                            color={colors.black}
                                            size={4}
                                            weight={'bold'}
                                        />
                                    </View>
                                    <View style={styles.Text2}>
                                        <TextProfile

                                            Title={GetUserData.gender ? GetUserData.gender : 'Gender'}
                                            color={colors.black}
                                            size={3.2}
                                        />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <View style={styles.Text}>
                                        <TextProfile

                                            Title='CNIC'
                                            color={colors.black}
                                            size={4}
                                            weight={'bold'}
                                        />
                                    </View>
                                    <View style={styles.Text2}>
                                        <TextProfile
                                            Title={GetUserData.cnic ? GetUserData.cnic : 'XXXXX-XXXXXXX-X'}
                                            color={colors.black}
                                            size={3.2}
                                        />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <View style={styles.Text}>
                                        <TextProfile

                                            Title='Address'
                                            color={colors.black}
                                            size={4}
                                            weight={'bold'}
                                        />
                                    </View>
                                    <View style={styles.Text2}>
                                        <TextProfile

                                            Title={GetUserData.address ? GetUserData.address : 'Lorem Ipsum'}
                                            color={colors.black}
                                            size={3.2}
                                        />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <View style={styles.Text}>
                                        <TextProfile

                                            Title='Country'
                                            color={colors.black}
                                            size={4}
                                            weight={'bold'}
                                        />
                                    </View>
                                    <View style={styles.Text2}>
                                        <TextProfile

                                            Title='Pakistan'
                                            color={colors.black}
                                            size={3.2}
                                        />
                                    </View>
                                </View>
                                {/* <View style={{ marginHorizontal: '25%', marginBottom: '5%' }}>
                            <RnButton
                                // onPress={() => submitData()}
                                // onPress={() => navigation.navigate(routeName.INVOICE_SUBMIT)}
                                backgroundColor={colors.primary}
                                margin={[20, 0, 0, 0]}
                                title={"Next"}
                            />
                        </View> */}
                            </Card>

                        </View>

                    </View>
                    <View style={{ height: hp(10) }}>

                    </View>
                </View>
                {loading == true ?
                    <Loader />
                    :
                    null
                }
            </ScrollView>
        </SafeAreaView>

    )
}

export default Profile
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    footer: {
        flex: 1,
        backgroundColor: colors.lightWhite,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        // justifyContent:'flex-end'
        top: 5
    },
    timestyle: {
        backgroundColor: colors.primary,
        borderRadius: 5,
        justifyContent: "center",
        height: hp(7),
        marginHorizontal: '25%',
        borderWidth: 1.5,
        borderColor: colors.secondary,
        marginBottom: 10,
        alignItems: 'center'
    },
    Text: {
        flex: 1,
        justifyContent: "center",
        paddingLeft: '10%',
        borderBottomWidth: 1,
        borderColor: colors.grey,
    },
    Text2:
    {
        flex: 1,
        justifyContent: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderColor: colors.grey,
    },

})