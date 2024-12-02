import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminAuth =({children})=>
{
    const info = useSelector(state=>state.admin?.admin)

    if(!info)
    {
        return <Navigate to={"/adminlogin"}/>
    }
    return children
}
export default AdminAuth