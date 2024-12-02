import  {configureStore} from '@reduxjs/toolkit'
import userreducer from "./UserSlice"
import adminSlice from "./AdminSlice"


const store = configureStore({
    reducer:{
        user:userreducer,
        admin:adminSlice,
        

    }
})
export default store