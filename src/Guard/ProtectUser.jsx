import React from 'react'
import { Navigate } from 'react-router'

export function ProtectUser(props) {
     if(localStorage.getItem("token")){
        return props.children
     }else{
        return <Navigate to="/login"/>
     }
}
