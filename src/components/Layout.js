import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Fonts from "../helpers/Fonts";
import { colors } from "../constants/colorsPallet";
import { _toast } from "../constants/Index";

import { hp, wp } from "../helpers/Responsiveness";
import ResponsiveText from "./RnText";
import { globalPath } from "../constants/globalPath";
import { isImage } from "../constants/Index";
import Icon from "./Icon";
import ImagePicker from "react-native-image-crop-picker";
import urls from "../redux/lib/urls";
import Api from "../redux/lib/api";
import { useSelector } from "react-redux";
import { getUserProfile } from "../redux/actions/user.actions";
const Layout = (props) => {
  const [Loading, setLoading] = useState(false);

  const ProfileData = useSelector(
    (state) => state.userReducers.getProfileData.data
  );
  const [image, setImage] = useState(null);
  const addPhoto = async (image) => {
    var formData = new FormData();
    formData.append(
      "ImageData",
      image == null
        ? null
        : {
            uri: image.path,
            type: "image/jpeg",
            name: "photo.jpg",
          }
    );
    console.log("found data", formData);

    // setLoading(true);
    const res = await Api.put(urls.ADD_PROFILE_PIC + ProfileData.id, formData);
    console.log("res", res);
    if (res && res.success == true) {
      dispatch(getUserProfile());
      _toast("profile update successfully");
      // setLoading(false);
    } else {
      _toast("Something went wrong");

      // setLoading(false);
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
  const takephotofromgallary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      addPhoto(image);
      setImage(image);
      console.log(image, "image working");
    });
  };
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={{ backgroundColor: colors.white, flex: 1 }}>
        <View style={styles.screeninfo}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              marginLeft: 30,
            }}
          >
            {props.backbutton ? (
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Icon
                  size={18}
                  margin={[5, 0, 0, 0]}
                  source={globalPath.backArrow}
                />
              </TouchableOpacity>
            ) : null}
            <ResponsiveText
              fontFamily={Fonts.Bold}
              margin={[0, 0, 0,0]}
              size={props.titleSize ? props.titleSize : 8}
              color={colors.white}
            >
              {props.title}
            </ResponsiveText>
            <TouchableOpacity
              disabled={!props.disabled ? props.disabled : true}
              onPress={props.onPress}
            >
              <Image
                source={props.source}
                style={{
                  height: wp(7),
                  width: wp(18),
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row'}}>
          {props.location?
          <Icon
              size={20}
              margin={[5, 4, 0, 25]}
              source={props.location}
            />
          :null}
          {props.address ? (
            <ResponsiveText
              margin={[5, 0, 0,0]}
              fontFamily={Fonts.Bold}
              size={3.5}
              color={colors.white}
            >
              {/* {props.address} */}
              FabIntel International lahore, pakistan
            </ResponsiveText>
          ) : null}
          </View>
          
          {props.profile ? (
            <View>
              <View
                style={{
                  alignItems: "flex-end",
                  alignSelf: "center",
                  marginTop: 10,
                }}
              >
                {props.camera ? (
                  <TouchableOpacity
                    style={{
                      zIndex: 1,
                      position: "absolute",
                      borderRadius: 30,
                    }}
                    onPress={() => toggel()}
                  >
                    <Icon size={30} source={props.camera} />
                  </TouchableOpacity>
                ) : null}
                <Image
                  source={
                    image == null
                      ? props.userimg
                        ? { uri: props.userimg }
                        : globalPath.user
                      : { uri: image.path }
                  }
                  style={{
                    borderRadius: 70,
                    height: wp(30),
                    width: wp(30),
                    // resizeMode: "contain",
                    backgroundColor: colors.white,
                  }}
                />
                {/* <View style={styles.Onlinebadge}></View> */}
              </View>
              <ResponsiveText
                margin={[8, 0, 0, 14]}
                weight={"bold"}
                fontFamily={Fonts.Bold}
                size={3.7}
                color={colors.white}
                textAlign={"center"}
              >
                {props.username}
              </ResponsiveText>
              <ResponsiveText
                margin={[5, 0, 5, 0]}
                fontFamily={Fonts.Bold}
                size={3.5}
                textAlign={"center"}
                color={colors.white}
              >
                {props.Field}
              </ResponsiveText>
            </View>
          ) : null}
        </View>
        <View style={{ backgroundColor: colors.blue1, flex: 1 }}>
          <View style={styles.footer}>{props.children}</View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Layout;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue1,
  },
  footer: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopRightRadius: 30,
    padding: 10,
    // justifyContent:'center',
    // alignItems: "center",
    // paddingTop: "25%",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screeninfo: {
    // flex: 0.4,
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: colors.blue1,
    borderBottomLeftRadius: 35,
    paddingBottom: 10,
  },
  logo: {
    height: hp(20),
    width: wp(40),
    resizeMode: "contain",
    // marginBottom: 20,
    alignItems: "center",
  },
  Onlinebadge: {
    height: 15,
    width: 15,
    backgroundColor: colors.lightgreen,
    position: "absolute",
    borderRadius: 10,
    bottom: 20,
    right: 10,
  },
});
