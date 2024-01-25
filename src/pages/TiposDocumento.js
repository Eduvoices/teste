import React, { useState, useEffect, useRef} from "react"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Toast } from "primereact/toast"
import { FileUpload } from "primereact/fileupload"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Toolbar } from "primereact/toolbar"
import DocTypeService from "../service/DocTypeService"

const TiposDocumento = () => {
    const [docs, setDocs] = useState(null)
    const [selectedDocs, setSelectedDocs] = useState(null)
    const [globalFilter, setGlobalFilter] = useState(null)
    const toast = useRef(null)
    const dt = useRef(null)

    useEffect(() => {
        const docService = new DocTypeService()
        docService.getDocs().then((data) => setDocs(data))
    }, [])

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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning"/>
            </div>
        )
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Tipos de documento</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    )

    return (
        <div className='grid crud-demo'>
        <div className='col-12'>
            <div className='card'>
                <Toast ref={toast}/>
                <Toolbar className='mb-4' left={leftToolbarTemplate} right={rightToolbarTemplate}/>

                <DataTable
                    style={{whiteSpace:'nowrap'}}
                    ref={dt}
                    value={docs}
                    selection={selectedDocs}
                    onSelectionChange={(e) => setSelectedDocs(e.value)}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    className="datatable-responsive"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} documentos"
                    globalFilter={globalFilter}
                    emptyMessage="Nenhum resultado encontrado."
                    header={header}
                    responsiveLayout="scroll"
                >
                    <Column selectionMode='multiple' headerStyle={{width:'2rem'}}/>
                    <Column body={actionBodyTemplate}/>
                    <Column field='descricao' header='Descrição' body={descricaoBodyTemplate} headerStyle={{width:'40%', minWidth:'10rem'}}/>
                    <Column field='obs' header='Observação' body={obsBodyTemplate} headerStyle={{width:'40%', minWidth:'10rem'}}/>
                </DataTable>
            </div>
        </div>
    </div>
    )
}

export default TiposDocumento
