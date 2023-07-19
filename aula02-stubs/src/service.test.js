const Service = require("./service");
const sinon = require('sinon')
const { deepStrictEqual } = require("assert")

const BASE_URL_1 = "https://swapi.dev/api/planets/1/"
const BASE_URL_2 = "https://swapi.dev/api/planets/2/"
const mocks = {
    tatooine: require('../mocks/tatooine.json'),
    alderaan: require('../mocks/alderaan.json')
}
;
(async () => {
    // bate na api
    // {
    //     const service = new Service()
    //     const withoutStub = await service.makeRequest(BASE_URL_2)
    //     console.log(JSON.stringify(withoutStub))
    // }
    const service = new Service()
    const stub = sinon.stub(service, service.makeRequest.name)

    stub
        .withArgs(BASE_URL_1)
        .resolves(mocks.tatooine)
    stub
        .withArgs(BASE_URL_2)
        .resolves(mocks.alderaan)
    {
        const expectedPlanet = {
            name: "Tatooine",
            climate: "arid",
            appearedIn: 5
        }
        const planet = await service.getPlanet(BASE_URL_1)
        deepStrictEqual(planet, expectedPlanet)
    }
    {
        const expectedPlanet = {
            name: "Alderaan",
            climate: "temperate",
            appearedIn: 2
        }
        const planet = await service.getPlanet(BASE_URL_2)
        deepStrictEqual(planet, expectedPlanet)
    }
})()

