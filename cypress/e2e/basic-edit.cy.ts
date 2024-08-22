import ml from 'maplibre-gl';


describe('Create shapes', () => {
  const sourceId = 'main_source';
  const layerId = 'main_layer';

  beforeEach(() => {
    cy.visit('/');

    cy.getMaplibreInstance().then(({ map }) => {
      map.addSource(sourceId, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      });
      const source = map.getSource(sourceId) as ml.GeoJSONSource | null;
      expect(source).to.exist;
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
    });
  });

  it('Create shapes using source.setData', () => {
    cy.getMaplibreInstance().then(({ map }) => {
      const source = map.getSource(sourceId) as ml.GeoJSONSource | null;
      expect(source).to.exist;
      if (!source) {
        return;
      }

      cy.loadShapesFromFixtureSetData('common-shapes.json', sourceId).then(() => {
        cy.wait(1000);
        source.getData().then((data) => {
          console.log('Source data', data);
          expect(data)
            .exist
            .to.have.property('features')
            .that.is.an('array')
            .and.have.length.greaterThan(0);
        });
      });
    });
  });

  it('Create shapes using source.updateData', () => {
    cy.getMaplibreInstance().then(({ map }) => {
      const source = map.getSource(sourceId) as ml.GeoJSONSource | null;
      expect(source).to.exist;
      if (!source) {
        return;
      }

      cy.loadShapesFromFixtureUpdateData('common-shapes.json', sourceId).then(() => {
        cy.wait(1000);
        source.getData().then((data) => {
          console.log('Source data', data);
          expect(data)
            .exist
            .to.have.property('features')
            .that.is.an('array')
            .and.have.length.greaterThan(0);
        });
      });
    });
  });
});
