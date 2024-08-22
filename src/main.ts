import ml from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import '@/styles/index.css';

declare global {
  interface Window {
    map: ml.Map;
  }
}

const mapStyle: ml.StyleSpecification = {
  version: 8,
  glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
  sources: {
    'osm-tiles': {
      type: 'raster',
      tiles: [
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      ],
      tileSize: 256,
      attribution: '© OpenStreetMap contributors',
    },
  },
  layers: [
    {
      id: 'osm-tiles-layer',
      type: 'raster',
      source: 'osm-tiles',
      minzoom: 0,
      maxzoom: 19,
    },
  ],
};

const map = new ml.Map({
  container: 'dev-map',
  style: mapStyle,
  center: [0, 47],
  zoom: 5,
  fadeDuration: 50,
});

map.on('load', () => {
  window.map = map;
  console.log('Map loaded');
});
