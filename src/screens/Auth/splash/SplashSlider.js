import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar, Image,
  Text, TouchableOpacity
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import { StackActions } from "@react-navigation/native";
// import Screen from "../../../components/Screen";
// import {SliderImages} from '../../../constants/mock'
import { colors } from "../../../constants/colorsPallet";
import { routeName } from "../../../constants/routeName";
import { globalPath } from "../../../constants/globalPath";
import { hp, wp } from "../../../helpers/Responsiveness";
import Fonts from "../../../helpers/Fonts";
import RnText from "../../../components/RnText";
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image'
import Icon from "../../../components/Icon";
import AppIntroSlider from 'react-native-app-intro-slider';
const SplashSlider = ({ navigation }) => {
  // const [showRealApp, setshowRealApp] = useState(false)
  const Data = [
    {
      id: 1,
      url: require('../../../assets/icons/Veg1.png'),
      title: 'Find Your Nearby Grocery Store',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      bg: colors.white,
    },

    {
      id: 2,
       url: require('../../../assets/icons/Veg2.jpeg'),
      title: 'Offers Fresh & Quality Groceries For You',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      bg: colors.white,
    },
    {
      id: 3,
       url: require('../../../assets/icons/Veg3.png'),
      title: 'Quick Deliver at your Doorstep',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      bg: colors.white,
    },


  ];
  const NextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          source={globalPath.ForwardArrow}
          size={24}
        />
      </View>
    );
  };
  const DoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={{fontSize:11,fontWeight:'bold'}}>Done</Text>
      </View>
    );
  };
  return (

    <View style={styles.container}>
      <AppIntroSlider
        data={Data}
        onDone={() => navigation.navigate(routeName.LOGIN)}
        renderDoneButton={DoneButton}
        renderNextButton={NextButton}
        renderItem={({ item }) => {
          return (
            <View
              style={[
                styles.slide,
                {
                  backgroundColor: item.bg,
                },
              ]}
            >
              <Image source={item.url} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.text}>{item.text}</Text>
            </View>
          );
        }}
      //  renderNextButton={this._renderNextButton}
      />
      <View style={styles.Text1}>
        <TouchableOpacity
        //  onPress={()=>navigation.navigate(routeName.LOGIN)}
        >
          {/* <View style={styles.Text}>
       <Icon margin={[0, 7, 0, 0]}
       tintColor={colors.white}
        size={30}
        source={globalPath.backarrow}>
        </Icon>
        </View> */}
          {/* <Text style={styles.Text}>Skip</Text> */}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SplashSlider
const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: colors.white
  },
  slide: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#59b2ab',
  },
  image: {
    width: hp(37),
    height: hp(35),
    marginVertical: 10,
  },
  text: {
    color: colors.black,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 20,
  },
  title: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    color: colors.primary
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
