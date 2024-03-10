document.addEventListener("DOMContentLoaded", function() {
    fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(countries => {
            const countryCardsContainer = document.getElementById("countryCards");
            countries.forEach(country => {
                const card = createCountryCard(country);
                countryCardsContainer.appendChild(card);
            });
        })
        .catch(error => console.error("Error fetching countries:", error));
});

function createCountryCard(country) {
    const card = document.createElement("div");
    card.classList.add("col-md-4", "mb-4");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card", "h-100");

    const cardContent = `
        <div class="card-header">${country.name.common}</div>
        <div class="card-body">
            <h5 class="card-title">Capital: ${country.capital}</h5>
            <p class="card-text">Lat/Long: ${country.latlng.join(", ")}</p>
            <p class="card-text">Region: ${country.region}</p>
            <img src="${country.flags.png}" class="card-img-top" alt="${country.name.common} Flag">
            <button type="button" class="btn btn-primary mt-3" onclick="fetchWeather('${country.name.common}')">Get Weather</button>
            <div class="mt-3" id="${country.name.common}-weather"></div>
        </div>
    `;

    cardBody.innerHTML = cardContent;
    card.appendChild(cardBody);

    return card;
}

function fetchWeather(countryName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=5334f2075e30d52ff74e2ab758a7f255`)
        .then(response => response.json())
        .then(weatherData => {
            const weatherContainer = document.getElementById(`${countryName}-weather`);
            const temperature = Math.round(weatherData.main.temp - 273.15); // Convert temperature from Kelvin to Celsius
            weatherContainer.innerHTML = `<p>Temperature: ${temperature}°C</p>`;
        })
        .catch(error => console.error("Error fetching weather:", error));
}
