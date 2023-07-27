import React, { useEffect } from "react";
import menuData from './menu.json'
import './menu.css'
import {FaArrowRight, FaArrowLeft} from 'react-icons/fa'
export const DynamicMenu = () =>{
    const [subMenuSelected, SetSubMenuSelected] = React.useState(false)
    const [menu, SetMenu] = React.useState([])
    const [menuTmp, SetMenuTmp] = React.useState([])
    useEffect(() => {
        SetMenu(menuData)
      }, []);
    return(
        <ul>
            {subMenuSelected && <li onClick={()=>{
                SetMenu(menuTmp[menuTmp.length - 1][0]);
                SetMenuTmp(menuTmp.filter(e=>e!==menuTmp[menuTmp.length - 1]));
                if(menuTmp.length === 1 && subMenuSelected){
                    SetMenuTmp([])
                    SetSubMenuSelected(false);
                }
                }}><FaArrowLeft/></li>}
            {menu.map(m=>{
                return <li key={`${m.label}_${Math.random()}`}>{m.label}{m?.children?.length && <span style={{float:"right"}} onClick={()=>{
                    let newArray = [...menuTmp]
                    if(newArray[0] === []){
                        newArray[0] = [menu]
                    }else{
                        newArray[newArray.length] = [menu]
                    }
                    SetMenuTmp(newArray);   
                    SetMenu(m.children);
                    SetSubMenuSelected(true);
                    }}><FaArrowRight/></span>}</li>
            })}
        </ul>
    )
}