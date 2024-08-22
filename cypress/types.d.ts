import ml from 'maplibre-gl';

export type WindowWithMap = Cypress.AUTWindow & { map: ml.Map };
