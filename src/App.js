import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import projects from './projects.json';

import './App.css';

function App() {
  const defaultMarkerCoordinates = [52.23210346936886, 21.024108900043892];

  return (
    <>
      <div className="container">
          <div className="columns">
              {projects.map((project, idx) => <div key={idx} className="column is-half">
                  <div className="box">
                      <figure className="image is-1by1">
                          <img src={project.fotos[0]} alt="foto" />
                      </figure>
                      <h1 className="subtitle">{project.tytul}</h1>
                  </div>
              </div>)}
          </div>
      </div>
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
    </>);
}

export default App;
