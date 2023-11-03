import { useEffect, useState } from "react";
import { fetchCitiesByState, parseCities } from "../service/HelperIbge";

const SelectCity = ({id, name, value, city, state, uf, onBlur = () => {}, onChange=()=>{}}) => {
    const [cities, setCities] = useState([])

    useEffect(()=>{
        fetchCitiesByState(state || uf).then(parseCities).then((cities)=>{
            setCities(cities)
        })
    }, [state, uf])

    return (
        <div>
            <select id={id || name} name={name || id} onChange={onChange} onBlur={onBlur} title="select de cidades" className="p-fluid p-inputtext" style={{appearance:'auto'}} required>
                {city ? (
                    <option value={value || city}>{value || city}</option>
                ) : (<option value=''>Cidades</option>)}

                {cities.map((city)=>{
                    const {value, label} = city
                    return <option key={value} value={label}>{label}</option>
                })}
            </select>
        </div>
    )
}

export default SelectCity
