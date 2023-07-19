const https = require('https')

class Service {
    async makeRequest(url) {
        return new Promise((resolve, reject) => {
            https.get(url, (response) => {
                response.on("data", data => resolve(JSON.parse(data)))
                response.on("error", reject)
            })
        })
    }
    async getPlanet(url) {
        const planet = await this.makeRequest(url)
        return {
            name: planet.name,
            climate: planet.climate,
            appearedIn: planet.films.length
        }

    }
}

module.exports = Service