import types from "../actions/types";

//Get site data from url reducer
const initialState = {
  status: null,
  message: null,
  error: false,
  loginScreen: {
    refreshing: false,
    isloggedIn:false,
    data: {
      loggedInUserId: null,
      loggedInUserName: "",
      loggedInUserTypeId: "",
      message: null,
    },
  },
  Cartlist: {
    refreshing: false,
    data: {},
  },
AllOrderlist: {
  refreshing: false,
  data: [],
},
favorite: {
  refreshing: false,
  data: [],
},
flashSales: {
  refreshing: false,
  data: [],
},
bestSellingProducts: {
  refreshing: false,
  data: [],
},
profileData: {
  refreshing: false,
  data: [],
},
};

export const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_USER_REQUEST:
      console.log(action, "action in reducer");
      return {
        ...state,
        loginScreen: {
          ...state.loginScreen,
          refreshing: true,
        },
      };

    case types.LOGIN_USER_SUCCESS:
      console.log(action, "action in reducer");
      return {
        ...state,
        loginScreen: {
          ...state.loginScreen,
          data: action.payload,
          refreshing: false,
          isloggedIn:true
        },
      };
    case types.LOGIN_USER_FAILURE:
      console.log(action, "action in reducer");
      return {
        ...state,
        loginScreen: {
          ...state.loginScreen,
          refreshing: false,
          // data: action.payload,
          errorMsg: action.error,
        },
      };
      //Check login

      case types.CHECK_LOGIN_REQUEST:
        return {
          ...state,
          loginScreen: {
            ...state.loginScreen,
          },
        };
  
      case types.CHECK_LOGIN_SUCCESS:
        return {
          ...state,
          loginScreen: {
            ...state.loginScreen,
            isloggedIn:action.payload
          },
        };

    //GetCartList
    case types.GET_CART_LIST_REQUEST:
      return {
        ...state,
        Cartlist: {
          ...state.Cartlist,
          refreshing: true,
        },
      };
    case types.GET_CART_LIST_SUCCESS:

      return {
        ...state,
        Cartlist: {
          ...state.Cartlist,
          data: action.payload,
          refreshing: false,
        },
      };
    case types.GET_CART_LIST_FAILURE:
      return {
        ...state,
        Cartlist: {
          ...state.Cartlist,
          data: {},
          refreshing: false,
        },
      };
       //GetAllOrder
    case types.GET_ALL_ORDER_LIST_REQUEST:
      return {
        ...state,
        AllOrderlist: {
          ...state.AllOrderlist,
          refreshing: true,
        },
      };
    case types.GET_ALL_ORDER_LIST_SUCCESS:

      return {
        ...state,
        AllOrderlist: {
          ...state.AllOrderlist,
          data: action.payload,
          refreshing: false,
        },
      };
    case types.GET_ALL_ORDER_LIST_FAILURE:
      return {
        ...state,
        AllOrderlist: {
          ...state.AllOrderlist,
          data: {},
          refreshing: false,
        },
      };
      //GET FAVORITES
case types.GET_FAVORITE_REQUEST:
  return {
    ...state,
    favorite: {
      ...state.favorite,
      refreshing: true,
    },
  };
case types.GET_FAVORITE_SUCCESS:
  return {
    ...state,
    favorite: {
      ...state.favorite,
      // data: [...state.favorite.data, ...action.payload],
      data:action.payload,
      refreshing: false,
    },
  };
case types.GET_FAVORITE_FAILURE:
  return {
    ...state,
    favorite: {
      ...state.favorite,
      data:[],
      refreshing: false,
    },
  };
  //get Flash Sales
case types.GET_FLASH_SALES_REQUEST:
  return {
    ...state,
    flashSales: {
      ...state.flashSales,
      refreshing: true,
    },
  };
case types.GET_FLASH_SALES_SUCCESS:
  const keyy = 'id';
  const UniqueArryByKey = [...new Map([...state.flashSales.data, ...action.payload].map(item =>
    [item[keyy], item])).values()];
  return {
    ...state,
    flashSales: {
      ...state.flashSales,
       data: UniqueArryByKey,
      // data:action.payload,
      refreshing: false,
    },
  };
case types.GET_FLASH_SALES_FAILURE:
  return {
    ...state,
    flashSales: {
      ...state.flashSales,
      // data:[],
      refreshing: false,
    },
  };
 //get Best Salling Products
case types.GET_BEST_SELLING_PRODUCTS_REQUEST:
  return {
    ...state,
    bestSellingProducts: {
      ...state.bestSellingProducts,
      refreshing: true,
    },
  };
case types.GET_BEST_SELLING_PRODUCTS_SUCCESS:
  const key = 'id';
  const arrayUniqueByKey = [...new Map([...state.bestSellingProducts.data, ...action.payload].map(item =>
    [item[key], item])).values()];
  return {
    ...state,
    bestSellingProducts: {
      ...state.bestSellingProducts,
      data: arrayUniqueByKey,
      // data:action.payload,
      refreshing: false,
    },
  };
case types.GET_BEST_SELLING_PRODUCTS_FAILURE:
  return {
    ...state,
    bestSellingProducts: {
      ...state.bestSellingProducts,
      // data:[],
      refreshing: false,
    },
  };
  //get profile
case types.GET_PROFILE_REQUEST:
  return {
    ...state,
    profileData: {
      ...state.profileData,
      refreshing: true,

    },
  };
case types.GET_PROFILE_SUCCESS:

  return {
    ...state,
    profileData: {
      ...state.profileData,
      data: action.payload,
      refreshing: false,

    },
  };
case types.GET_PROFILE_FAILURE:
  return {
    ...state,
    profileData: {
      ...state.profileData,
      // data: action.payload,
      refreshing: false,
      error: action.error,

    },
  };
  case types.LOGIN_LOGOUT_REQUEST:
    // console.log(action, "action in reducer");
    return state;
  case types.LOGIN_LOGOUT_SUCCESS:
    return initialState;
    default:
      return state;
  }
};
