import { useState } from "react"

export const AppClima = () => {

    const urlBase = `https://api.openweathermap.org/data/2.5/weather`

    const APY_KEY = `005bfd3b81b2d6d5a926320d6106e602`

    const [ciudad, setCiudad] = useState('')

    const [dataClima, setDataClima] = useState(null)

    const cambioCiudad = (e) => {
        setCiudad(e.target.value)

    }

    const submit = (e) => {
        e.preventDefault()
        if (ciudad.length > 0) fetchClima()
    }

    const fetchClima = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${APY_KEY}`)
            const data = await response.json()
            setDataClima(data)

        } catch (error) {
            console.error('Ha ocurrido un error: ', error)
        }
    }

    const difKelvin = 273.15


    return (
        <div className="container">

            <h1>Aplicacion del Clima</h1>

            <form onSubmit={submit}>
                <input
                    type="text"
                    value={ciudad}
                    onChange={cambioCiudad}
                />
                <button type="submit">Buscar Ciudad</button>
            </form>
            {
                dataClima && (
                    <div>
                        <p>{parseInt(dataClima.main.temp-difKelvin)}°</p>
                        <h2>{dataClima.name}</h2>
                        <h3>{parseInt(dataClima.main.temp_max-difKelvin)}°/{parseInt(dataClima.main.temp_min-difKelvin)}° Sensación térmica: {parseInt(dataClima.main.feels_like-difKelvin)}° </h3>
                        <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} />
                    </div>
                )
            }
        </div>
    )
}
