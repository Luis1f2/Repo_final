import React, { useContext, useRef, useState } from 'react';
import '../AddMusic/AddMusic.scss';
import { Button } from "@material-ui/core";
import { Add, Image, MusicNoteTwoTone } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../api/Theme";
import musicDB from "../../../db/music";

function AddMusic() {
    const style = useContext(ThemeContext);
    const imageRef = useRef();
    const musicRef = useRef();
    const navigate = useNavigate();
    const [music, setMusic] = useState({imagePreview: '', musicPreview: '', name: '', artist: '', language: '0'});
    
    const handleFileChange = (type) => (event) => {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onloadend = () => {
            setMusic(prev => ({ ...prev, [type]: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { imagePreview, musicPreview, name, artist, language } = music;
        
        if (!name || !artist || language === '0') {
            alert('Please fill all fields and select language');
            return;
        }

        try {
            const response = await fetch('http://localhost:3030/api/V3/song/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ name, artist, language, image: imagePreview, music: musicPreview })
            });

            if (!response.ok) throw new Error('Failed to upload song');
            alert('Song added successfully');
            navigate('/home');
        } catch (error) {
            console.error('Error:', error);
            alert('Error uploading song');
        }
    };

    return (
        <div style={style.component} className="AddMusic">
            <form onSubmit={handleSubmit}>
                <Button component="label" style={{backgroundColor: style.subTheme}}>
                    Upload Image
                    <input type="file" hidden onChange={handleFileChange('imagePreview')} accept="image/*" />
                </Button>
                <Button component="label" style={{backgroundColor: style.subTheme}}>
                    Upload Music
                    <input type="file" hidden onChange={handleFileChange('musicPreview')} accept="audio/*" />
                </Button>
                <input placeholder="Name" value={music.name} onChange={e => setMusic({...music, name: e.target.value})} />
                <input placeholder="Artist" value={music.artist} onChange={e => setMusic({...music, artist: e.target.value})} />
                <select value={music.language} onChange={e => setMusic({...music, language: e.target.value})}>
                    <option value="0">Select Language</option>
                    <option value="1">English</option>
                    <option value="2">Spanish</option>
                </select>
                <Button type="submit">Submit</Button>
            </form>
            {music.imagePreview && <img src={music.imagePreview} alt="Preview" />}
            {music.musicPreview && <audio controls src={music.musicPreview} />}
        </div>
    );
}

export default AddMusic;