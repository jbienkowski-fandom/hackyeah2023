import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import {icon} from 'leaflet';
import {MapContainer, Marker, Popup, TileLayer, useMap} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import {useStore} from "./store";

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

const ProjectsSummary = () => {
    const visibleProjects = useStore(state => state.visibleProjects);

    return (
        <>
            <div className="big orange">Polska</div>
            <div className="margin-top">liczba projektów</div>
            <div className="medium">{visibleProjects.length}</div>
            <div className="margin-top">wartość projektów</div>
            <div className="medium">1 204 569 431 193,50 zł</div>
            <div className="margin-top">dofinansowanie z Unii Europejskiej</div>
            <div className="orange medium bold">713 568 304 336,66 zł</div>
        </>
    );
}

const VisibleProjects = () => {
    const map = useMap();
    const projects = useStore(state => state.projects);
    const visibleProjects = useStore(state => state.visibleProjects);
    const setVisibleProjects = useStore(state => state.setVisibleProjects);
    const customIcon = icon({
                                iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
                            });

    useEffect(() => {
        // Updates markers after map initially renders
        updateVisibleProjects();

        map.on('dragend', function () {
            // Updates markers after user drags the map to change position
            updateVisibleProjects();
        });
        map.on('zoomend', function () {
            // Updates markers after user zooms in/out
            updateVisibleProjects();
        });
    }, [map]);

    const updateVisibleProjects = () => {
        const bounds = map.getBounds();
        const newVisibleProjects = [];
        for (let project of projects) {
            if (bounds.contains([project.coords.lat, project.coords.long])) {
                newVisibleProjects.push(project);
            }
        }
        setVisibleProjects(newVisibleProjects);
    };

    return (
        visibleProjects.map((project, idx) =>
                                <Marker key={idx}
                                        position={[project.coords.lat, project.coords.long]}
                                        icon={customIcon}>
                                    <Popup>
                                        <h3>{project.tytul}</h3>
                                        <p>Wartość projektu: {project.wartosc}</p>
                                        <p>Dofinansowanie UE: {project.dofinansowanie}</p>
                                    </Popup>
                                </Marker>)
    );
}

function Start() {
    const defaultMarkerCoordinates = [52.23210346936886, 21.024108900043892];

    return (
        <section className="hero is-fullheight is-info">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <Menu/>
                    <div className="columns">
                        <div className="column is-half aligned-left">
                            <ProjectsSummary/>
                        </div>
                        <MapContainer id="map" className="column is-half" center={defaultMarkerCoordinates} zoom={13}
                                      scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <MarkerClusterGroup chunkedLoading>
                                <VisibleProjects/>
                            </MarkerClusterGroup>
                        </MapContainer>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Start;
