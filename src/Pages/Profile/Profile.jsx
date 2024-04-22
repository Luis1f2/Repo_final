import React, { useEffect, useState } from 'react';
import './Profile.scss';
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import MusicCard from "../../components/fragment/MusicCard/MusicCard";
import Container from "../../components/fragment/Container/Container";
import Grade from 'grade-js';
import SideBarOptions from "../../components/fragment/SideBarOptions/SideBarOptions";
import { PlaylistPlay, Favorite } from "@material-ui/icons";

function Profile() {
    const { playlists } = useSelector(state => state.musicReducer);
    const [mostPlayed, setMostPlayed] = useState([]);

    function sortByProperty(property) {
        return function (a, b) {
            if (a[property] > b[property])
                return 1;
            else if (a[property] < b[property])
                return -1;

            return 0;
        }
    }

    useEffect(() => {
        setMostPlayed(playlists.sort(sortByProperty("timesPlayed")));
    }, [playlists]);

    useEffect(() => {
        Grade(document.querySelectorAll('.gradient-wrap'))
    });

    return (
        <Container>
            <div className={"Profile"}>
                <div className="top-profile">
                    <Avatar variant={"rounded"} src={require("../../assets/img/avatar2.jpg")}
                        style={{ width: "150px", height: "150px" }}>
                        VS
                    </Avatar>
                    <div className="profile-detail">
                        <h3>{userName}</h3>
                        <span className={"profile-playlist"}>
                            <SideBarOptions className={"lib-sub"} Icon={PlaylistPlay}
                                href={"/home/playlist/trap"} title={"Trap"} />
                            <SideBarOptions className={"lib-sub"} Icon={PlaylistPlay} href={"/home/playlist/pop"}
                                title={"Pop"} />
                            <SideBarOptions className={"lib-sub"} Icon={PlaylistPlay}
                                href={"/home/playlist/reggaeton"} title={"Reggaeton"} />
                        </span>
                    </div>
                </div>
                <div className="bottom-profile">
                    {favoriteSongs.length > 0 ? (
                        <div>
                            <h3>Favoritos <Favorite /> </h3>
                            <div className="most-played">
                                {favoriteSongs.map((item) => (
                                    <MusicCard key={item.id} music={item} />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="empty-favorites">
                            <h3>Bienvenido a Haimusic!</h3>
                            <p>¡Gracias por elegirnos como tu plataforma de música favorita! Sumérgete en nuestro catálogo y disfruta de una experiencia musical única.</p>                        </div>
                    )}
                </div>

            </div>
        </Container>
    );
}

export default Profile;