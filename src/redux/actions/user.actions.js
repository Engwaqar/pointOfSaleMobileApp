import types from "./types";
//LOGIN
export const loginUser = (data) => {
  return {
    type: types.LOGIN_USER_REQUEST,
    data: data,
  };
};
//GetCartList
export const getCartlist = (data) => {
  return {
    type: types.GET_CART_LIST_REQUEST,
    data: data,
  };
};
//GetAllOrder
export const getAllOrderlist = (data) => {
  return {
    type: types.GET_ALL_ORDER_LIST_REQUEST,
    data: data,
  };
};
//Favrite
export const getFavorite = (index, limit) => {
  // console.log('okokokokoko',data)
  return {
    type: types.GET_FAVORITE_REQUEST,
    
  };
};
//get Flash Sales
export const getFlashSales = (index, limit,id) => {
  //  console.log('okokokokoko',data)
  return {
    type: types.GET_FLASH_SALES_REQUEST,
    data: {
      index: index,
      limit: limit,
      id:id
    },
  };
};
//get Flash Sales
export const getBestSellingProducts = (index, limit,id) => {
  //  console.log('okokokokoko',data)
  return {
    type: types.GET_BEST_SELLING_PRODUCTS_REQUEST,
    data: {
      index: index,
      limit: limit,
      id:id
    },
  };
};
//Get profile
export const getProfile = () => {
  return {
    type: types.GET_PROFILE_REQUEST,
  };}
//LOGOUT
export const logoutUser = (data) => {
  return {
    type: types.LOGIN_LOGOUT_REQUEST,
    data: data,
  };
};
//CHECKLOGIN
export const checklogin = (data) => {
  return {
    type: types.CHECK_LOGIN_REQUEST,
    data: data,
  };
};



