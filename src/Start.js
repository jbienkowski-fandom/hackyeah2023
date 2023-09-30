import React from "react";
import { Link } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

function Start() {
    const defaultMarkerCoordinates = [52.23210346936886, 21.024108900043892];

    return (
        <section className="hero is-fullheight is-info">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <p className="title">
                        EUfunds title
                    </p>
                    <p className="subtitle">
                        <Link to={'/vote'}>Głosuj</Link>
                    </p>
                    <MapContainer id="map" center={defaultMarkerCoordinates} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={defaultMarkerCoordinates}>
                            <Popup>
                                <h3>Rearanżacja stałej ekspozycji Galerii Sztuki Starożytnej Muzeum Narodowego w Warszawie</h3>
                                <p>Wartość projektu: 19 153 240,47 zł</p>
                                <p>Dofinansowanie UE: 9 777 078,62 zł</p>
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </section>
    )
}

export default Start;
