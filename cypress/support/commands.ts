/// <reference types="cypress" />
import ml from 'maplibre-gl';
import type { WindowWithMap } from '../types.ts';
import type { Feature } from 'geojson';


declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      getMaplibreInstance(): Chainable<{ window: WindowWithMap; map: ml.Map }>;

      loadShapesFromFixtureSetData(fixtureName: string, sourceId: string): Chainable;

      loadShapesFromFixtureUpdateData(fixtureName: string, sourceId: string): Chainable;
    }
  }
}

Cypress.Commands.add('getMaplibreInstance', () => {
  return cy.window().then((win) => {
    return cy.wrap(win).should('have.property', 'map').then(() => {
      const window = win as WindowWithMap;
      expect(window.map).to.exist;
      return {
        window,
        map: window.map,
      };
    });
  });
});


Cypress.Commands.add('loadShapesFromFixtureSetData', (fixtureName: string, sourceId: string) => {
  return cy.getMaplibreInstance().then(({ map }) => {
    cy.fixture(fixtureName).then((data: Array<Feature>) => {
      const source = map.getSource(sourceId) as ml.GeoJSONSource | null;
      if (source) {
        // this works without troubles
        source.setData({
          type: 'FeatureCollection',
          features: data,
        });
      }
    });
  });
});

Cypress.Commands.add('loadShapesFromFixtureUpdateData', (fixtureName: string, sourceId: string) => {
  return cy.getMaplibreInstance().then(({ map }) => {
    cy.fixture(fixtureName).then((data: Array<Feature>) => {
      const source = map.getSource(sourceId) as ml.GeoJSONSource | null;
      if (source) {
        // this raises: "Error: can't serialize object of unregistered class Object"
        source.updateData({ add: data });
      }
    });
  });
});
