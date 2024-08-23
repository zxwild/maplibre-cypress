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

map.on('load', async () => {
  const sourceId = 'main_source';
  const layerId = 'main_layer';

  window.map = map;
  console.log('Map loaded');

  map.addSource(sourceId, {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [],
    },
  });
  const source = map.getSource(sourceId) as ml.GeoJSONSource | null;
  if (!source) {
    return;
  }

  map.addLayer({
    id: layerId,
    source: sourceId,
    type: 'line',
    paint: {
      'line-color': '#008ee1',
      'line-opacity': 0.8,
      'line-width': 3,
    },
  });
  // const layer = map.getLayer(layerId);
  source.updateData({
    add: [{
      id: 1,
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [
          -7.064208984375142,
          54.908263583510376,
        ],
      },
    }],
  });

  source.getData().then((data) => {
    console.log('Source data', data);
  });
});
