import { useEffect, useState,useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


function Map({ accidents, height }) {
 const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!accidents || accidents.length === 0) return;

    mapboxgl.accessToken =
      'pk.eyJ1IjoibXVnZW4yNDciLCJhIjoiY2t6YXc1d3ZtMWp5cDJvczhtaHNzNng5ZiJ9.ChuFB5ls73656qlh1alvwA';

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [accidents[0].longitude, accidents[0].latitude],
      zoom: 10,
    });

    // Add controls
    map.current.addControl(new mapboxgl.NavigationControl());

    const bounds = new mapboxgl.LngLatBounds();

    // Add accident markers
    accidents.forEach((accident) => {
      if (accident.latitude && accident.longitude) {
        const coords = [accident.longitude, accident.latitude];
        bounds.extend(coords);

        new mapboxgl.Marker({ color: 'red' })
          .setLngLat(coords)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(`
              <div>
                <strong>${accident.accident_type}</strong><br/>
                <small>${accident.date_time?.split('T')[0]}</small><br/>
                <span>${accident.weather || 'No weather data'}</span><br/>
                <em>${accident.severity}</em>
              </div>
            `)
          )
          .addTo(map.current);
      }
    });

    // Fit map to markers
    if (!bounds.isEmpty()) {
      map.current.fitBounds(bounds, { padding: 50 });
    }

    return () => {
      if (map.current) map.current.remove();
    };
  }, [accidents]);

  return <div ref={mapContainer} style={{ height: `${height}vh`, width: '100%' }} />;
}

export default Map;
