console.log('Client side js file')

const weatherFrom = document.querySelector('form')
const search = document.querySelector('input')

const weather = document.querySelector('#weather')
const weatherSuccess = document.querySelector('#weather-success')



weatherFrom.addEventListener('submit', (e) => {
    e.preventDefault()
    weather.textContent = 'Loading...'
    fetch('http://localhost:3000/weather?city=' + search.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                weather.textContent = data.error
            } else {
                weather.textContent = `It's ${data.description} in ${data.city} with a temperature of ${data.temperature} degrees, feels like ${data.feelslike} degrees outside`
            }
        })
    })
})