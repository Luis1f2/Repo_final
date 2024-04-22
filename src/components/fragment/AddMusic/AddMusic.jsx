import React, { useContext, useEffect, useRef, useState } from 'react';
import '../AddMusic/AddMusic.scss';
import { Add, Image, MusicNoteTwoTone } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import { ThemeContext } from "../../../api/Theme";
import musicDB from "../../../db/music";

function AddMusic() {
    const useStyle = useContext(ThemeContext);
    const fileRef = useRef();
    const [selected, setSelected] = useState(null);
    const navigate = useNavigate();
    const selectImg = () => {
        fileRef.current.click()
    }
    useEffect(() => {
        fileRef.current.onchange = (e) => {
            setSelected(e.target.files[0].name)
        }
    })
    let id = musicDB[musicDB.length - 1].id + 1;

    const handleAddMusic = async () => {
        const name = document.getElementById("name").value;
        const artist = document.getElementById("artist").value;
        const language = document.getElementById("language").value;
    
        const data = {
            src: selected, // Supongo que 'selected' contiene la ruta al archivo de audio seleccionado
            name,
            artist,
            language
        };
    
        // Imprimir el token en consola
        const token = localStorage.getItem("token");
        console.log("Token:", token);
    
        try {
            const response = await fetch('http://localhost:3030/api/V3/song/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token // Agrega el token al encabezado
                },
                body: JSON.stringify(data)
            });
    
            if (response.ok) {
                navigate('/home');
            } else {
                throw new Error('Error al agregar la canción');
            }
        } catch (error) {
            console.error(error);
        }
    }
    


    return (
        <form style={useStyle.component} className={"AddMusic"}>
            <div className="add-music-sub-container">
                <div className="d1">
                    <Button onClick={selectImage} style={{ backgroundColor: useStyle.subTheme, width: "200px", height: "200px" }} variant={"contained"} >
                        {imagePreview ? (
                            <img src={imagePreview} alt="Music Cover" style={{ width: "100%", height: "100%" }} />
                        ) : (
                            <Image titleAccess={"Select a music cover"} style={{ color: "#f0f0f0", width: "150px", height: "150px" }} />
                        )}
                    </Button>
                    <input ref={imageRef} accept="image/*" type="file" hidden id={"music-img"} />
                    <Button onClick={selectMusic} style={{ backgroundColor: useStyle.subTheme, width: "200px", height: "200px" }} variant={"contained"} >
                        <MusicNoteTwoTone titleAccess={"Select a music"} style={{ color: "#f0f0f0", width: "150px", height: "150px" }} />
                    </Button>
                    <input ref={musicRef} accept="audio/*" type="file" hidden />
                    {musicPreview && (
                        <audio controls src={musicPreview} style={{ marginTop: '20px' }}>
                            Su navegador no soporta el elemento de audio.
                        </audio>
                    )}
                    <select onChange={(e) => setLanguage(e.target.value)}>
                        <option value="0">Selecciona el lenguaje</option>
                        <option value="1">Español</option>
                        <option value="2">Ingles</option>
                    </select>
                </div>
                <div className="d2">
                    <div>
                        <input type="text" value={"ID: " + id} disabled />
                        <input type="text" placeholder={"Nombre"} id={"name"} onChange={(e) => setNameMusic(e.target.value)} />
                        <input type="text" placeholder={"Nombre del cantante"} id={"artist"} onChange={(e) => setNameSinger(e.target.value)} />
                        <Button style={{ backgroundColor: useStyle.theme }} variant={"contained"} endIcon={<Add />} onClick={addMusic}>
                            Agregar
                        </Button>
                    </div>
                    <div className={"preview"}>
                        <h3>Vista previa</h3>
                        {selectedImage && <p>Imagen : {selectedImage}</p>}
                        {selectedMusic && <p>Música : {selectedMusic}</p>}
                        <p>Nombre de la música : {nameMusic}</p>
                        <p>Nombre del cantante : {nameSinger}</p>
                        <p>Lenguaje : {language === "0" ? "Selecciona el lenguaje" : language === "1" ? "Español" : "Inglés"}</p>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default AddMusic;

