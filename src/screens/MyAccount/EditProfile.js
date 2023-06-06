import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    ImageBackground,
    Image,
    Platform,
    TouchableOpacity,
    Alert
} from "react-native";
import { hp, wp } from "../../helpers/Responsiveness";
import { colors } from "../../constants/colorsPallet";
import { loginUser } from "../../../redux/actions/user.actions";
import { useDispatch, useSelector } from "react-redux";
import ResponsiveText from "../../components/RnText";
import Input from "../../components/Input";
import { globalPath } from "../../constants/globalPath";
import RnButton from "../../components/RnButton";
import Fonts from "../../helpers/Fonts";
import Loader from "../../components/Loader";
import { routeName } from "../../constants/routeName";
import ChatHeader from "../../components/ChatHeader";
import Card from "../../components/Card";
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from "@react-native-community/async-storage";
import Icon from "../../components/Icon";
import { getProfile } from "../../redux/actions/user.actions";
import urls from "../../redux/lib/urls";
import Api from "../../redux/lib/api";
import { _toast } from "../../constants/Index";
import { ScrollView } from "react-native-gesture-handler";
const EditProfile = ({ navigation }) => {
    const dispatch = useDispatch();
    const GetUserData = useSelector(state => state.userReducers.profileData.data,);
    // const loading = useSelector(state => state.userReducers.profileData.refreshing);
    console.log('GetUserData', GetUserData)
    useEffect(() => {
        setUserName(GetUserData.userName)
        setFullName(GetUserData.fullName)
        setEmail(GetUserData.email)
        setAddress(GetUserData.address)
        setContactNumber(GetUserData.contactNumber)

    }, [])
    const [UserName, setUserName] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [address, setAddress] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState([]);

    const submitData = async () => {
        const formdata = new FormData();
        formdata.append("FullName", fullName);
        formdata.append("Username", UserName);
        formdata.append("ContactNumber", contactNumber);
        formdata.append("Email", email);
        formdata.append("Address", address);
        formdata.append("UserTypeId", 3);
        formdata.append(
            "ImageData",
            imageFile != null
                ? {
                    uri: imageFile.path,
                    type: "image/jpeg",
                    name: "filename.png",
                }
                : null
        );
        console.log("formdata", formdata);
        try {
            setLoading(true)
            const res = await Api.put(urls.EDIT_PROFILE + GetUserData.id, formdata);
            console.log("res", res);
            if (res.success == true) {
                dispatch(getProfile());
                _toast(res.message);
                navigation.goBack();
                setLoading(false);
            } else {
                _toast(res.message);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
        }
    };
    const toggel = () => {
        Alert.alert("Profile Image", "change profile Image", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
            },
            {
                text: "Select from gallary",
                onPress: async () => {
                    takephotofromgallary();
                },
            },
        ]);
    };
    const takephotofromgallary = async () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then((image) => {
            //   addPhoto(image);
            setImageFile(image);
            AsyncStorage.setItem('ProfileImage', JSON.stringify(image));
            console.log(image, "image working");
        });
    };
    return (
        <View style={styles.container}>

            <ChatHeader
                backbutton
                title={'Edit Profile'}
                navigation={navigation}
            />
            
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
                                <Icon
                                    tintColor={colors.grey1}
                                    margin={[40, 0, 0, 0]}
                                    size={22} source={globalPath.Camera} />
                            </TouchableOpacity>
                            <View style={{ alignSelf: 'center', marginTop: 0 }}>
                                <Image
                                    // source={
                                    //     globalPath.User
                                    // }
                                    defaultSource={globalPath.User}
                                    source={
                                        { uri: imageFile == null ? GetUserData.fullPath : imageFile.path }
                                    }
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
                        <View style={{ flex: 1 }} >
                            <View style={{ flexDirection: 'row' }}>
                                <ResponsiveText flex={1} margin={[0, 0, 0, 10]} weight={'bold'} color={colors.black} >{GetUserData? GetUserData.userName+" "+GetUserData.fullName: 'Jhon Deo'}</ResponsiveText>
                            </View>
                            <ResponsiveText margin={[5, 0, 0, 10]} weight={'bold'} color={colors.primary} >{GetUserData ? GetUserData.address : '133, Aurangzeb Block, New Garden Town, Lahore-54600, Pakistan'}</ResponsiveText>
                        </View>
                    </Card>
                </View>
                <ScrollView>
                    
                <Input
                    placeholder={"First Name"}
                    value={UserName}
                    height={hp(6.5)}
                    margin={[20, 0, 5, 0]}
                    onChnageText={(text) => setUserName(text)}
                    leftIcon={globalPath.Email}
                />
                <Input
                    placeholder={"Last Name"}
                    value={fullName}
                    height={hp(6.5)}
                    margin={[20, 0, 5, 0]}
                    onChnageText={(text) => setFullName(text)}
                    leftIcon={globalPath.Email}
                />
                <Input
                    placeholder={"Email"}
                    value={email}
                    height={hp(6.5)}
                    margin={[20, 0, 5, 0]}
                    onChnageText={(text) => setEmail(text)}
                />
                <Input
                    placeholder={"Address"}
                    value={address}
                    height={hp(6.5)}
                    margin={[20, 0, 5, 0]}
                    onChnageText={(text) => setAddress(text)}

                />
                <Input
                    maxLength={11}
                    placeholder={"0300-000000000"}
                    value={contactNumber}
                    height={hp(6.5)}
                    margin={[20, 0, 5, 0]}
                    // secureTextEntry
                    keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                    onChnageText={(text) => setContactNumber(text)}
                // leftIcon={globalPath.Lock}

                />
                {/* <ResponsiveText color={colors.red} margin={[20, 0, 0, 10]}>{errorString}</ResponsiveText> */}
                <RnButton
                    margin={[30, 0, 0, 15]}
                    title={"Update Profile"}
                    onPress={() => submitData()}
                />
                <View style={{height:hp(15)}}>

                </View>
            </ScrollView>
            {loading == true ?
                <Loader />
                :
                null
            }
        </View>
    );

}

export default EditProfile
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: colors.grey,
        justifyContent: "center",
        alignItems: 'center'
    },

    image: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    screeninfo: {
        flex: 0.4,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.primary,
        borderBottomLeftRadius: 35,
    },
    logo: {
        height: hp(30),
        width: wp(70),
        resizeMode: "contain",
        // marginBottom: 20,
        alignItems: "center",
    },
});