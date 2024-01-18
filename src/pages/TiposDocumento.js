import React, { useState, useEffect, useRef} from "react"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Toast } from "primereact/toast"
import { FileUpload } from "primereact/fileupload"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"

const TiposDocumento = () => {
    const [docs, setDocs] = useState(null)
    const [selectedDocs, setSelectedDocs] = useState(null)
    const [globalFilter, setGlobalFilter] = useState(null)
    const toast = useRef(null)
    const dt = useRef(null)

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className='my-2'>
                    <Button label='Novo' icon='pi pi-plus' className='p-button-success mr-2'/>
                    <Button label='Deletar' icon='pi pi-thrash' className='p-button-danger'/>
                </div>
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
        <React.Fragment>
            <FileUpload mode='basic' accept='image/*' maxFileSize={1000000} label='Importar' className='mr-2 inline-block'/>
            <Button label='Exportar' icon='pi pi-upload' className='p-button-help'/>
        </React.Fragment>
        )
    }

    const descricaoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Descrição</span>
                {rowData.descricao}
            </>
        )
    }

    const obsBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Observação</span>
                {rowData.obs}
            </>
        )
    }

    const actionBodyTemplate = () => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2"/>
                <Button icon="pi pi-thrash" className="p-button-rounded p-button-warning"/>
            </div>
        )
    }

    return (
        <div className="grid crud-demo">
            <div className="col-12">

            </div>
        </div>
    )
}

export default TiposDocumento
