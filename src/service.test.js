const sinon = require('sinon');
const { deepStrictEqual } = require('assert');
const Service = require('./service');

const mocks = {
  tanooine: require('./mocks/tanooine.json'),
  alderaan: require('./mocks/alderaan.json'),
}
const BASE_URL_1 = 'https://swapi.dev/api/planets/1';
const BASE_URL_2 = 'https://swapi.dev/api/planets/2';


;
(async () => {
  const service = new Service();
  // const withoutStub = await service.makeRequest(BASE_URL_2);
  const stub = sinon.stub(service, service.makeRequest.name)

  stub.withArgs(BASE_URL_1).resolves(mocks.tanooine)
  stub.withArgs(BASE_URL_2).resolves(mocks.alderaan)

  {
    const expected = {
      "name": "Tatooine",
      "surfaceWater": "1",
      "appearedIn": 5
    }

    const response = await service.getPlanets(BASE_URL_1);

    deepStrictEqual(response, expected)
  }

  {
    const expected = {
      "name": "Alderaan",
      "surfaceWater": "40",
      "appearedIn": 2
    }
    const response = await service.getPlanets(BASE_URL_2);

    deepStrictEqual(response, expected)
  }
})()