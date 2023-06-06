// live hosts

export default urls = {
  HOST: "https://pointofsale.egreatminds.com/WebApis/",
  BASE_URL: "https://pointofsale.egreatminds.com/WebApis/",

  //Login
  LOGIN: "api/Auth/Login",
  REGISTER: "api/Auth/Register",
  CATEGORIES: 'api/Category/GetAllCategories/1',
  ITEM_LIST: 'api/Item/GetAllItems/',
  ADD_TO_CART: 'api/Cart/AddToCart',
  GET_CART_LIST: 'api/Cart/GetCartList',
  ORDER_DELETE: 'api/Cart/DeleteOrderDetail/',
  GET_SLIDER_SHOW: 'api/SlideShow/GetAllSlideShows/1',
  UPDATE_COUNT: 'api/Cart/UpdateCart',
  ORDER_PROCEED: 'api/Cart/ProcessOrder',
  GET_ALL_ORDER:'api/Cart/GetAllOrder/1',
  FLASH_SALES:'api/FlashSale/GetAllSalesItem',
  BEST_SELLING_PRODUCTS:'api/Item/GetTopSalingItems',
  SEARCH_ITEMS:'api/Item/GetItemByTitle/',
  ADD_FAVORITE_PRODUCT:'api/Item/AddFavourite',
  GET_ALL_FAVORITE:'api/Item/GetAllFavourite/1/1/3',
  GET_USER:'api/Auth/GetProfileData',
  EDIT_PROFILE:'api/Auth/EditUser/',
  GET_ADMIN_ORDERS:'api/Cart/GetOrdersForAdmin/1',
  UPDATE_ADMIN_STATUS:'api/Cart/OrderStatusByAdmin',
  UPDATE_ORDER_STATUS:'api/Cart/SeenOrdersByUser',
  RAPEAT_ORDERS:'api/Cart/RapeatOrder'

};
