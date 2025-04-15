// @ts-nocheck
import { createSelector, createSlice, current } from '@reduxjs/toolkit'
import { bookingApi } from '../apiSlices/bookingApi'

const initialState = {
   bikesConfig: {
      bikeSizeList: [],
      typeList: [],
      rangeList: [],
      segmentList: [],
   },
   isLoadingPage: false,
   isLoadingData: false,

   // server: false,
}

export const appConfigSlice = createSlice({
   name: 'appConfig',
   initialState,
   reducers: {
      appConfigLoaded: (state, action) =>
         /*  
     //console.log(
            'databaseInfoSlice ACTION PAYLOAD --------------------->>> ',
            action.payload
         ) ||
         */
         action.payload,

      appBikesConfigLoaded: (state, action) => {
         state.bikesConfig = action.payload
      },
      appIsloadingPage: (state, action) => {
         state.isLoadingPage = action.payload
      },
      appIsloadingData: (state, action) => {
         state.isLoadingData = action.payload
      },
   },
   extraReducers: (builder) => {
      builder
         .addMatcher(
            bookingApi.endpoints.updateBooking.matchPending,
            //CLAVE: payload es la query/data que mandas en la mutación!!
            //Cuando
            (state, action) => {
               console.log('matchPending action **************', action)
               console.log('matchPending state **************', state)
               state.isLoadingData = true
               //originalArgs= {from,to}
               //   const { originalArgs } = action.meta.arg
               // console.log('matchPending originalArgs', originalArgs)
               //state.dateRange = originalArgs
            }
         )
         .addMatcher(
            bookingApi.endpoints.updateBooking.matchFulfilled ||
               bookingApi.endpoints.updateBooking.matchRejected,
            //CLAVE: payload es la query/data que mandas en la mutación!!
            //Cuando
            (state, action) => {
               console.log('matchFulfilled action **************', action)
               console.log('matchFulfilled state **************', state)
               state.isLoadingData = false
               //originalArgs= {from,to}
               //   const { originalArgs } = action.meta.arg
               // console.log('matchFulfilled originalArgs', originalArgs)
               //state.dateRange = originalArgs
            }
         )
   },
})

export const {
   appConfigLoaded,
   appBikesConfigLoaded,
   appIsloadingPage,
   appIsloadingData,
} = appConfigSlice.actions

export default appConfigSlice.reducer

const selectAppConfig = (state) => state.appConfig

export const selectAppBikesConfig = createSelector(
   [selectAppConfig],
   (appConfig) =>
      //console.log('---------', databaseInfo.segmentList) ||
      appConfig.bikesConfig
)
export const selectAppIsLoadingPage = createSelector(
   [selectAppConfig],
   (appConfig) =>
      //console.log('---------', databaseInfo.segmentList) ||
      appConfig.isLoadingPage
)
export const selectAppIsLoadingData = createSelector(
   [selectAppConfig],
   (appConfig) =>
      //console.log('---------', databaseInfo.segmentList) ||
      appConfig.isLoadingData
)
/*
export const selectDatabaseInfoSegmentList = createSelector(
   [selectDatabaseInfo],
   (databaseInfo) =>
      //console.log('---------', databaseInfo.segmentList) ||
      databaseInfo.segmentList
)
*/
