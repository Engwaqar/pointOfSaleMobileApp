import React, { useEffect } from "react";
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
// import Loader from "../../../components/loader";
import AsyncStorage from "@react-native-community/async-storage";
import { routeName } from "../../../constants/routeName";
import Loader from "../../../components/Loader";
import { ScrollView } from "react-native-gesture-handler";
const Login = ({ navigation }) => {
  const loading = useSelector(
    (state) => state.userReducers.loginScreen.refreshing
  );
  const loginResponse = useSelector(
    (state) => state.userReducers.loginScreen.data
  );
  const loginNetworkErr = useSelector(
    (state) => state.userReducers.loginScreen.errorMsg
  );
  const [errorString, setErrorString] = React.useState("");
  const [ContactNo, setContactNo] = React.useState("");
  const [password, setPassword] = React.useState("");
  //Redux Action Called
  const dispatch = useDispatch();
  const userLogin = async () => {
    var userId = await AsyncStorage.getItem("@UserTypeId");
    console.log('firstuserType', userId)
    dispatch(
      loginUser({
        params: {
          contactNumber: ContactNo,
          password: password,
          userType: userId ? 3 : 1,
        },
        navigation: navigation,
      })
    );
  };

  useEffect(() => {
    loginResponse ? setErrorString(loginResponse.message) : null;
    loginNetworkErr ? setErrorString(loginNetworkErr.message) : null;
  }, [loginResponse, loginNetworkErr]);

  // console.log(loginResponse, "LOgin screen error");
  // console.log(loginNetworkErr, "LOgin network error");

  const Validation = (item) => {
    // setErrorString("Please Enter Username and
    // navigation.replace(routeName.BOTTOM_TABS);

    // setErrorString("Please Enter Username and Password to proceed");
    setErrorString("");
    if (ContactNo === "" && password === "") {
      setErrorString("All fields are required");
    } else if (ContactNo === "" || ContactNo === null) {
      setErrorString("ContactNo is missing");
    } else if (password === "") {
      setErrorString("Password is missing");
    }
    //  else if (company === "") {
    //   setErrorString("Please select school");
    // }
    else {
      // console.log("ErrorMessage:yhyuu ");
      userLogin();
      setErrorString("");
    }
  };
  function removeEmojis(string) {
    var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    return string.replace(regex, '');
  }
  return (
    <ScrollView>
    <View style={styles.container}>
    
      <Image style={styles.logo} source={globalPath.logo} />
      <View>
        <ResponsiveText
          textAlign={'center'}
          fontFamily={Fonts.Bold}
          size={6}
          color={colors.black}
        // weight={'bold'}
        >
          ONLINE STORE
        </ResponsiveText>
        <ResponsiveText
          alignItems={'center'}
          fontFamily={Fonts.Bold}
          margin={[10, 0, 0, 0]}
          size={3}
          color={colors.grey1}
        >
          Enter your phone number or Email address for sign in.
        </ResponsiveText>
      </View>

      <Input
        placeholder={"Contact Number"}
        height={hp(6.5)}
        margin={[20, 0, 5, 0]}
        onChnageText={(text) => setContactNo(text)}
        maxLength={11}
      />

      <Input
        placeholder={"Password"}
        value={removeEmojis(password)}
        height={hp(6.5)}
        margin={[20, 0, 5, 0]}
        secureTextEntry
        // keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
        onChnageText={(text) => setPassword(text)}
        leftIcon={globalPath.Lock}
      />
      <ResponsiveText
        margin={[10, 0, 5, 0]}
        textAlign={'center'}
        fontFamily={Fonts.Bold}
        size={4}
        color={colors.black}
      // weight={'bold'}
      >
        Forgot Password
      </ResponsiveText>
      <ResponsiveText color={colors.red} margin={[20, 0, 0, 10]}>{errorString}</ResponsiveText>
      <RnButton
        margin={[0, 0, 0, 0]}
        title={"Login"}
        onPress={() => Validation()}
      />
      <ResponsiveText
        alignItems={'center'}
        fontFamily={Fonts.Bold}
        margin={[20, 0, 0, 0]}
        size={4.5}
        color={colors.grey1}
      >
        Don't have an account yet?
        <TouchableOpacity onPress={() => navigation.replace(routeName.REGISTER)}>
          <ResponsiveText size={4.5} margin={[5, 0, 0, 0]} color={colors.yellow1}> Sign In</ResponsiveText>
        </TouchableOpacity>
      </ResponsiveText>
   
      
      {loading ? <Loader /> : undefined}
    </View>
    <View style={{height:hp(20)}}>

    </View>
    </ScrollView>
  );
};
export default Login;
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
    height: hp(40),
    width: wp(60),
    resizeMode: "contain",
    // marginBottom: 20,
    alignItems: "center",
  },
});
