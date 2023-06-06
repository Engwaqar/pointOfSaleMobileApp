import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Platform, TouchableOpacity
} from "react-native";
import { hp, wp } from "../../../helpers/Responsiveness";
import { colors } from "../../../constants/colorsPallet";
import { loginUser } from "../../../redux/actions/user.actions";
import { useDispatch, useSelector } from "react-redux";
import ResponsiveText from "../../../components/RnText";
import DropDown from "../../../components/DropDown";
import Input from "../../../components/Input";
import { globalPath } from "../../../constants/globalPath";
import RnButton from "../../../components/RnButton";
import Api from "../../../redux/lib/api";
import urls from "../../../redux/lib/urls";
import Fonts from "../../../helpers/Fonts";
import Loader from "../../../components/Loader";
import { _toast } from "../../../constants/Index";

import { routeName } from "../../../constants/routeName";
import { ScrollView } from "react-native-gesture-handler";
const Register = ({ navigation }) => {
  const [errorString, setErrorString] = React.useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState([]);

  const expressions = {
    email: /^\w+([+.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  };

  const register = async () => {
    var obj = {
      fullName: fullName,
      contactNumber: contactNumber,
      UserTypeId: 3,
      password: Password,
      email: email,
      address: address,

    };
    console.log('obj', obj)
    try {
      setLoading(true)
      const res = await Api.post(urls.REGISTER, obj);
      console.log("res", res);
      if (res.success == true) {
        _toast(res.message);
         navigation.navigate(routeName.LOGIN);
        setLoading(false);
      } else {
        _toast(res.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const Validation = (item) => {
    // setErrorString("Please Enter Username and
    // navigation.replace(routeName.BOTTOM_TABS);

    // setErrorString("Please Enter Username and Password to proceed");
    setErrorString("");
    if (fullName === "") {
      _toast("Full name is missing");
    } else if (contactNumber === "") {
      _toast("Mobile number is missing");
    } else if (email === "") {
      _toast("Email is missing");
    } else if (address === "") {
      _toast("Address is missing");
    } else if (Password === "") {
      _toast("Password is missing");
    } else {
      register();
      // setErrorString("");
    }
  };
  // function removeEmojis (string) {
  //   var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
  //   return string.replace(regex, '');
  // }
  return (
    <ScrollView style={{ marginTop: hp(5) }}>
      <View style={styles.container}>

        <Image style={styles.logo} source={globalPath.logo} />
        <View>
          <ResponsiveText
            //   textAlign={'center'}
            fontFamily={Fonts.Bold}
            size={6}
            color={colors.black}
            weight={'bold'}
          >
            Create New Account
          </ResponsiveText>
          <ResponsiveText
            alignItems={'center'}
            fontFamily={Fonts.Bold}
            margin={[10, 0, 0, 0]}
            size={4}
            color={colors.grey1}
          >
            Enter your details to create account.
          </ResponsiveText>
        </View>
        <Input
          placeholder={"Full Name"}
          height={hp(6.5)}
          margin={[20, 0, 5, 0]}
          onChnageText={(text) => setFullName(text)}
          leftIcon={globalPath.Email}
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
        <Input
          placeholder={"Email"}
          height={hp(6.5)}
          margin={[20, 0, 5, 0]}
          onChnageText={(text) => setEmail(text)}
          leftIcon={globalPath.Email}
        />
        <Input
          placeholder={"Address"}
          value={address}
          height={hp(6.5)}
          margin={[20, 0, 5, 0]}
          onChnageText={(text) => setAddress(text)}

        />
        <Input
          placeholder={"Password"}
          // value={removeEmojis(password)}
          height={hp(6.5)}
          margin={[20, 0, 5, 0]}
          secureTextEntry
          // keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
          onChnageText={(text) => setPassword(text)}
          leftIcon={globalPath.Lock}
        />
        <ResponsiveText color={colors.red} margin={[20, 0, 0, 10]}>{errorString}</ResponsiveText>
        <RnButton
          margin={[50, 0, 0, 0]}
          title={"Sign up"}
          onPress={() => Validation()}
        // onPress={() => navigation.replace(routeName.BOTTOM_TABS)}
        />
        <ResponsiveText
          alignItems={'center'}
          fontFamily={Fonts.Bold}
          margin={[30, 0, 0, 0]}
          size={4.5}
          color={colors.grey1}
        >
          Don't have an account yet?
          <TouchableOpacity onPress={() => navigation.replace(routeName.LOGIN)}>
            <ResponsiveText size={4.5} margin={[0, 0, 0, 0]} color={colors.primary}> Login</ResponsiveText>
          </TouchableOpacity>
        </ResponsiveText>

      </View>
      {loading == true ?
        <Loader />
        :
        null
      }
    </ScrollView>
  );
};
export default Register;
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: wp(60),
    resizeMode: "contain",
    // marginBottom: 20,
    alignItems: "center",
  },
});
