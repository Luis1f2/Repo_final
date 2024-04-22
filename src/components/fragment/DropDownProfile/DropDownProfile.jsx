import React, { useContext } from "react";
import './DropDownProfile.scss'; // Simplificado si el CSS está en el mismo directorio
import { ThemeContext } from "../../../api/Theme";
import HoverButton from "../HoverButton/HoverButton";
import { AccountBox, ExitToApp, Delete } from "@material-ui/icons";
import { useNavigate } from "react-router-dom"; // useNavigate es el reemplazo de useHistory en React Router v6

const DropDownProfile = () => {
    const style = useContext(ThemeContext); // Renombrado para evitar confusión (useStyle parece un hook)
    const navigate = useNavigate(); // Actualizado para usar useNavigate

    const handleLogout = () => {
        localStorage.removeItem("userSession");
        navigate("/login2"); // Actualizado para usar navigate
    };

    const handleDeleteAccount = () => {
        localStorage.clear();
        navigate("/"); // Actualizado para usar navigate
    };

    return (
        <div style={style.component} className="dropdown-profile">
            <HoverButton Icon={AccountBox} variant="text" text="Profile" />
            <HoverButton Icon={ExitToApp} onClick={handleLogout} text="Cerrar sesión" />
            <HoverButton Icon={Delete} onClick={handleDeleteAccount} text="Eliminar cuenta" />
        </div>
    );
};

export default DropDownProfile;