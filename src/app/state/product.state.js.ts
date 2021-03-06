export enum DataStateEnum {
  LOADING,
  LOADED,
  ERROR

}
export interface AppDataState<T> {
  dataState?:DataStateEnum,
  data?:T,
  errorMessage?:string
}

export enum ProductActionsTypes {
  GET_ALL_PRODUCTS="[Product] Get All products",
  GET_SELECTED_PRODUCTS="[Product] Get Selected products",
  GET_AVAILABLE_PRODUCTS="[Product] Get Available products",
  SEARCH_PRODUCTS="[Product] Search products",
  NEW_PRODUCT="[Product] New products",
  Edit_PRODUCT="[Product] edit product",
  Delete_PRODUCT="[Product] delete product",
  Selected_PRODUCT ="[Product] selected product"

}
export interface ActionEvent{
  type: ProductActionsTypes,
  payload : any
}
