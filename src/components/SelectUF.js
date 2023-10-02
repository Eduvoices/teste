import { useEffect, useState } from "react";
import { fetchUF, parseStates } from "../service/HelperIbge";

const SelectUf = ({id, uf, name, onChange = () => {}}) => {
    const [states, setStates] = useState([])

    useEffect(() => {
        fetchUF().then(parseStates).then(setStates)
    }, [])

    return (
        <div>
            <select id={id || name} name={name || id} onChange={onChange} title="select de estados(UF)" required>
                {uf ? (
                    <option value={uf}>{uf}</option>
                ) : (<option value=''>UF</option>)}
                {states.map((state)=>{
                    const {value} = state
                    return <option key={value} value={value}>{value}</option>
                })}
            </select>
        </div>
    )
}

export default SelectUf
