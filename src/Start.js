import React from "react";
import { Link } from 'react-router-dom';
import { icon } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

import projects from './projects.json';

const Menu = () => (
    <>
        <p className="title">
            EUfunds title
        </p>
        <p className="subtitle">
            <Link to={'/vote'}>Głosuj</Link>
        </p>
    </>
);

const ProjectsSummary = () => (
    <>
        <div className="big orange">Polska</div>
        <div className="margin-top">liczba projektów</div>
        <div className="medium">298957</div>
        <div className="margin-top">wartość projektów</div>
        <div className="medium">1 204 569 431 193,50 zł</div>
        <div className="margin-top">dofinansowanie z Unii Europejskiej</div>
        <div className="orange medium bold">713 568 304 336,66 zł</div>
    </>
);

function Start() {
    const defaultMarkerCoordinates = [52.23210346936886, 21.024108900043892];
    const customIcon = icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });

    return (
        <section className="hero is-fullheight is-info">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <Menu />
                    <div className="columns">
                        <div className="column is-half aligned-left">
                            <ProjectsSummary />
                        </div>
                        <MapContainer id="map" className="column is-half" center={defaultMarkerCoordinates} zoom={13} scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <MarkerClusterGroup chunkedLoading>
                            {projects.map((project, idx) => 
                                <Marker position={[project.coords.lat, project.coords.long]} icon={customIcon}>
                                    <Popup>
                                        <h3>{project.tytul}</h3>
                                        <p>Wartość projektu: {project.wartosc}</p>
                                        <p>Dofinansowanie UE: {project.dofinansowanie}</p>
                                    </Popup>
                                </Marker>)}
                            </MarkerClusterGroup>
                        </MapContainer>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Start;
