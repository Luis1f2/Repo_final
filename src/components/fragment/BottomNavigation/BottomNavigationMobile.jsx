import React, {useState} from "react";
import '../BottomNavigation/BottomNavigation.scss';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import SearchIcon from '@material-ui/icons/Search';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import { Add } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

function BottomNavigationMobile() {
    const [menuItems] = useState([
        {
            id: 0,
            icon: <HomeOutlinedIcon/>,
            href: "/home",
            label: "Inicio"
        },
        {
            id: 1,
            icon: <SearchIcon/>,
            href: "/home/search",
            label: "Buscar"
        },
        {
            id: 2,
            icon: <AccountCircleOutlinedIcon/>,
            href: "/home/profile",
            label: "Perfil"
        },
        {
            id: 3,
            icon: <ExploreOutlinedIcon/>,
            href: "/home/about",
            label: "Nosotros"
        },
        {
            id: 4,
            icon: <Add/>,
            href: "/home/add",
            label: "Agregar"
        }
    ]);
    let currPath = window.location.pathname;
    return (
        <div className="bottom-navigation">
            {
                menuItems.map(({id, icon, href, label}) => (
                    <Link className={"bottom-navigation-link"} key={id} to={href}>
                        <Button className={`${currPath === href ? "BottomNavAction active" : "BottomNavAction"}`}
                                    style={{borderRadius: 0}}>
                            {icon}
                        </Button>
                        <span className="label">
                                {
                                    label
                                }
                            </span>
                    </Link>
                ))
            }
        </div>
    );
}

export default BottomNavigationMobile;