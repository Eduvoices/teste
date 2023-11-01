import { useEffect, useState } from "react";
import { fetchUF, parseStates } from "../service/HelperIbge";

const SelectUf = ({id, uf, name, onBlur = () => {} ,onChange = () => {}}) => {
    const [states, setStates] = useState([])

    useEffect(() => {
        fetchUF().then(parseStates).then(setStates)
    }, [])

    return (
        <div>
            <select id={id || name} name={name || id} onChange={onChange} onBlur={onBlur} title="select de estados(UF)" className="p-fluid p-inputtext" style={{appearance:'auto'}}>
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
