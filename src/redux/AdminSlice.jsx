import { createSlice } from "@reduxjs/toolkit";


const isValidJson = (str) => {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
};

const adminSlice = createSlice({
    name: "admin",
    initialState: {
       
        admin: isValidJson(localStorage.getItem('adminKey')) 
            ? JSON.parse(localStorage.getItem('adminKey')) 
            : null,
    },
    reducers: {
        addAdmin: (state, action) => {
            state.admin = action.payload;

            
            const { token, ...adminData } = action.payload;

        
            localStorage.setItem('adminKey', JSON.stringify(adminData));
        },
        logoutAdmin: (state) => {
            state.admin = null;
            localStorage.removeItem('adminKey');
        }
    }
});

export const { addAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
