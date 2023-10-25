import { useEffect, useState } from "react";
import { fetchCitiesByState, parseCities } from "../service/HelperIbge";

const SelectCity = ({id, name, city, state, uf, onChange=()=>{}}) => {
    const [cities, setCities] = useState([])

    useEffect(()=>{
        fetchCitiesByState(state || uf).then(parseCities).then((cities)=>{
            setCities(cities)
        })
    }, [state, uf])

    return (
        <div>
            <select id={id || name} name={name || id} onChange={onChange} title="select de cidades" required>
                {city ? (
                    <option value={city}>{city}</option>
                ) : (<option value=''>Cidades</option>)}

                {cities.map((city)=>{
                    const {value, label} = city
                    return <option key={value} value={city}>{label}</option>
                })}
            </select>
        </div>
    )
}

export default SelectCity
