import AsyncStorage from "@react-native-community/async-storage";
import { takeLatest, put, select } from "redux-saga/effects";
import { routeName } from "../../constants/routeName";
// import { parseCats } from "../../helpers/cat.helpers";
import types from "../actions/types";
import Api from "../lib/api";
import urls from "../lib/urls";
import { StackActions } from "@react-navigation/native";
import { _toast } from "../../constants/Index";
//LOGIN
export function* loginUserSaga() {
  console.log("saga function Works");
  yield takeLatest(types.LOGIN_USER_REQUEST, loginUserApi);
}
function* loginUserApi(data, response) {
  console.log(data, "action in saga");
  let { params, navigation } = data.data;
  try {
    const response = yield Api.post(urls.LOGIN, params);
    console.log(response, "response");
    if (response && response.data != null) {
      yield AsyncStorage.setItem("@token", response.data.token);
      yield AsyncStorage.setItem("@UserTypeId", response.data.loggedInUserTypeId);
      yield AsyncStorage.setItem("@companyId", response.data.companyId);
      yield AsyncStorage.setItem("@UserId", response.data.loggedInUserId);
      yield put({ type: types.LOGIN_USER_SUCCESS, payload: response });
      if (response.data.loggedInUserTypeId == 3) {
        navigation.replace(routeName.BOTTOM_TABS);
        _toast(response.message);
      }
      else if (response.data.loggedInUserTypeId == 1) {
        navigation.navigate(routeName.ADMIN_HOME);
        _toast(response.message);

      }
    } else {
      yield put({ type: types.LOGIN_USER_FAILURE, payload: response });
    }
  } catch (error) {
    console.log("error", error);
    yield put({ type: types.LOGIN_USER_FAILURE, error: error });
  }
}
//GetCartList
export function* CartlistSaga() {
  yield takeLatest(types.GET_CART_LIST_REQUEST, CartlistApi);
}
function* CartlistApi(data) {
  // let { params, navigation } = data.data;
  try {
    const response = yield Api.get(urls.GET_CART_LIST);
    console.log(response, "responsesagaaaa");
    if (response && response.data != null) {
      yield put({ type: types.GET_CART_LIST_SUCCESS, payload: response.data });
    } else {
      yield put({ type: types.GET_CART_LIST_FAILURE, payload: {} });
    }
  } catch (error) {
    yield put({ type: types.GET_CART_LIST_FAILURE, error: error });
  }
}
//GetAllOrder
export function* AllOrderlistSaga() {
  yield takeLatest(types.GET_ALL_ORDER_LIST_REQUEST, AllOrderlistApi);
}
function* AllOrderlistApi(data) {
  // let { params, navigation } = data.data;
  try {
    const response = yield Api.get(urls.GET_ALL_ORDER);
    console.log(response, "response");
    if (response && response.data != null) {
      yield put({ type: types.GET_ALL_ORDER_LIST_SUCCESS, payload: response.data });
    } else {
      yield put({ type: types.GET_ALL_ORDER_LIST_FAILURE, payload: {} });
    }
  } catch (error) {
    yield put({ type: types.GET_ALL_ORDER_LIST_FAILURE, error: error });
  }
}
///FAVORITES
export function* getFavoritesSaga() {
  yield takeLatest(types.GET_FAVORITE_REQUEST, getFavoritesSagaApi);
}
function* getFavoritesSagaApi(data) {

  try {
    const response = yield Api.get(urls.GET_ALL_FAVORITE);
    console.log('fav resssss', response);

    if (response && response.data != null) {
      yield put({
        type: types.GET_FAVORITE_SUCCESS,
        payload: response.data,
      });
      // navigation.navigate(routeName.Categories,{data:response.data});
    } else {
      yield put({ type: types.GET_FAVORITE_FAILURE, payload: [] });
    }

    // dispatch a success action to the store with the new data object
  } catch (error) {
    yield put({ type: types.GET_FAVORITE_FAILURE, payload: [] });
  }
}
//get Flash Sales
export function* getFlashSalesSaga() {
  yield takeLatest(types.GET_FLASH_SALES_REQUEST, getFlashSalesSagaApi);
}
function* getFlashSalesSagaApi(data) {
  const limit = data.data.limit;
  const index = data.data.index;
  console.log('limit', limit)
  const id = data.data.id;
  try {
    const url = urls.FLASH_SALES + '/' + '1' + '/' + index + '/' + limit;
    const response = yield Api.get(url);
    console.log('FlashSales resssss', response);

    if (response && response.data != null) {
      yield put({
        type: types.GET_FLASH_SALES_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({ type: types.GET_FLASH_SALES_FAILURE, payload: [] });
    }
    // dispatch a success action to the store with the new data object
  } catch (error) {
    yield put({ type: types.GET_FLASH_SALES_FAILURE, payload: [] });
  }
}
//get Best Salling Products
export function* getBestSellingProductsSaga() {
  yield takeLatest(types.GET_BEST_SELLING_PRODUCTS_REQUEST, getBestSellingProductsSagaApi);
}
function* getBestSellingProductsSagaApi(data) {
  const limit = data.data.limit;
  const index = data.data.index;
  console.log('limit', limit)
  const id = data.data.id;
  try {
    const url = urls.BEST_SELLING_PRODUCTS + '/' + '1' + '/' + index + '/' + limit;
    const response = yield Api.get(url);
    console.log('BestSelling resssss', response);

    if (response && response.data != null) {
      yield put({
        type: types.GET_BEST_SELLING_PRODUCTS_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({ type: types.GET_BEST_SELLING_PRODUCTS_FAILURE, payload: [] });
    }
    // dispatch a success action to the store with the new data object
  } catch (error) {
    yield put({ type: types.GET_BEST_SELLING_PRODUCTS_FAILURE, payload: [] });
  }
}
//Get profile
export function* getProfileDataSaga() {
  yield takeLatest(types.GET_PROFILE_REQUEST, getProfileDataSagaApi);
}
function* getProfileDataSagaApi(data) {
  // let { params, navigation } = data.data;
  const userType = yield AsyncStorage.getItem("@loggedInUserTypeId");

  try {

    const response = yield Api.get(urls.GET_USER);
    console.log(response, "response");
    if (response && response.data != null) {
      yield put({ type: types.GET_PROFILE_SUCCESS, payload: response.data });
    } else {
      yield put({ type: types.GET_PROFILE_FAILURE, error: error });
    }
  } catch (error) {
    yield put({ type: types.GET_PROFILE_FAILURE, error: error });
  }
}
//check login
export function* checkloginSaga() {
  yield takeLatest(types.CHECK_LOGIN_REQUEST, checkloginSagaApi);
}
function* checkloginSagaApi(data) {
  // let { params, navigation } = data.data;
  
  try {
    const isloggedin = yield AsyncStorage.getItem("@token");

    console.log(isloggedin, "isloggedin");
    if (isloggedin) {
      yield put({ type: types.CHECK_LOGIN_SUCCESS, payload: true });
    } else {
      yield put({ type: types.CHECK_LOGIN_SUCCESS, payload: false });
    }
  } catch (error) {
    // yield put({ type: types.GET_PROFILE_FAILURE, error: error });
  }
}
//logout
export function* logoutUserSaga() {
  yield takeLatest(types.LOGIN_LOGOUT_REQUEST, logoutUserApi);
}
function* logoutUserApi(data, response) {
  // let { params, navigation } = data.data;
  yield put({ type: types.LOGIN_LOGOUT_SUCCESS });
}





