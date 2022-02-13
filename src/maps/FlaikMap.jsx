import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";
import L from "leaflet";
import "leaflet-draw";

import { debounce } from "./debounce";
import { getGeoLocation } from "./getGeoLocation";

const FlaikMap = (prop) => {
  const [search, setSearch] = useState("");
  const mapRef = useRef(null);

  useEffect(() => {
    let map = L.map("map").setView([-27.4689682, 153.0234991], 13);

    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // FeatureGroup is to store editable layers
    let drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    let drawControl = new L.Control.Draw({
      draw: {
        polygon: true,
        marker: false,
        circlemarker: false,
        rectangle: false,
        circle: false,
      },
      edit: {
        featureGroup: drawnItems,
        edit: prop.isEditable,
      },
    });
    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, function (e) {
      var type = e.layerType,
        layer = e.layer,
        target = e.target;
      console.log(e, type, layer);

      //L.Util.setOptions(this, { draggable: true });
      drawnItems.addLayer(layer);

      //let draggable = new L.Draggable(layer);
      //draggable.enable();
    });

    /*  map.on(L.Draggable.finishDrag, function (e) {
      var type = e.layerType,
        layer = e.layer;
      console.log(type, layer);
      //map.setLatLng(e.latlng);
    }); */

    mapRef.current = map;
  }, [prop.isEditable]);

  const seachCallback = useMemo(
    () =>
      debounce((val) => {
        getGeoLocation(val).then((res) => {
          mapRef.current.flyTo(new L.LatLng(...res));
        });
      }, 1000),
    []
  );

  const handleSearch = (event) => {
    const text = event.currentTarget.value;
    setSearch(text);
    seachCallback(text);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleSearch}
      />
      <div ref={mapRef} id="map"></div>
    </>
  );
};

export default FlaikMap;
