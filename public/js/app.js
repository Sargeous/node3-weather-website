console.log('Client side js file')

const weatherFrom = document.querySelector('form')
const search = document.querySelector('input')

const weather = document.querySelector('#weather')
const cityinfo = document.querySelector('#cityinfo')



weatherFrom.addEventListener('submit', (e) => {
    e.preventDefault()
    weather.textContent = 'Loading...'
    fetch('/weather?city=' + search.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                weather.textContent = data.error
            } else {
                cityinfo.textContent = `It's ${data.description} in ${data.city}.`
                weather.textContent = `Temperatures of ${data.temperature} degrees, feeling like ${data.feelslike} degrees outside.`
                humidity.textContent = `With ${data.humidity}% humidity`
            }
        })
    })
})