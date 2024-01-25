import React, {useState, useRef, useEffect} from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'
import { FileUpload } from 'primereact/fileupload'
import { Toolbar } from 'primereact/toolbar'
import { InputText } from 'primereact/inputtext'
import TitulosService from '../service/TitulosService'
import axios from 'axios'

const TitulosEmAberto = () => {

    const [titles, setTitles] = useState(null)
    const [selectedTitles, setSelectedTitles] = useState(null)
    const [globalFilter, setGlobalFilter] = useState(null)
    const toast = useRef(null);
    const dt = useRef(null);

    // https://tecjusbackend.vercel.app/titulosemaberto

    useEffect(() => {
        // const titleService = new TitulosService()
        // titleService.getTitulos().then((data) => setTitles(data))

        // fetch(`http://tecjusbackend.vercel.app/titulosemaberto`)
        // .then(res => res.status).then(data => console.log(data))
        // .catch(err => console.log(err))

        const client = axios.create({
            baseURL: "http://tecjusbackend.vercel.app"
        })

        async function getData() {
            const response = await client.get("/titulosemaberto")
            console.log(response)
        }
        getData()
    }, [])

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className='my-2'>
                    <Button label='Novo' icon='pi pi-plus' className='p-button-success mr-2'/>
                    <Button label='Deletar' icon='pi pi-trash' className='p-button-danger'/>
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

    const sacadoBodyTemplate = (rowData) => {
        return (
            <>
                <span className='p-column-title'>Sacado</span>
                {rowData.sacado}
            </>
        )
    }

    const valorBodyTemplate = (rowData) => {
        return (
            <>
                <span className='p-column-title'>Valor</span>
                {rowData.valor}
            </>
        )
    }

    const dataEmissaoBodyTemplate = (rowData) => {
        return (
            <>
                <span className='p-column-title'>Data de Emissão</span>
                {rowData.dataEmissao}
            </>
        )
    }

    const tipoBodyTemplate = (rowData) => {
        return (
            <>
                <span className='p-column-title'>Tipo</span>
                {rowData.tipo}
            </>
        )
    }

    const dataVencimentoBodyTemplate = (rowData) => {
        return (
            <>
                <span className='p-column-title'>Data de Vencimento</span>
                {rowData.dataVencimento}
            </>
        )
    }

    const tituloBodyTemplate = (rowData) => {
        return (
            <>
                <span className='p-column-title'></span>
                {rowData.titulo}
            </>
        )
    }

    const ramoDireitoBodyTemplate = (rowData) => {
        return (
            <>
                <span className='p-column-title'></span>
                {rowData.ramoDireito}
            </>
        )
    }

    const naturezaBodyTemplate = (rowData) => {
        return (
            <>
                <span className='p-column-title'></span>
                {rowData.natureza}
            </>
        )
    }

    const cidadeBodyTemplate = (rowData) => {
        return (
            <>
                <span className='p-column-title'></span>
                {rowData.cidade}
            </>
        )
    }

    const parceiroBodyTemplate = (rowData) => {
        return (
        <>
            <span className='p-column-title'></span>
            {rowData.parceiro}
        </>
        )
    }

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className='p-column-title'></span>
                {rowData.status}
            </>
        )
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" />
            </div>
        )
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Tìtulos em aberto</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    )

    // titlesBackend()


    return (
        <div className='grid crud-demo'>
            <div className='col-12'>
                <div className='card'>
                    <Toast ref={toast}/>
                    <Toolbar className='mb-4' left={leftToolbarTemplate} right={rightToolbarTemplate}/>

                    <DataTable
                        style={{whiteSpace:'nowrap'}}
                        ref={dt}
                        value={titles}
                        selection={selectedTitles}
                        onSelectionChange={(e) => setSelectedTitles(e.value)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} títulos"
                        globalFilter={globalFilter}
                        emptyMessage="Nenhum resultado encontrado."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode='multiple' headerStyle={{width:'2rem'}}/>
                        <Column body={actionBodyTemplate}/>
                        <Column field='sacado' header='Sacado' body={sacadoBodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}}/>
                        <Column field='valor' header='Valor' body={valorBodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}}/>
                        <Column field='dataEmissao' header='Data de Emissão' body={dataEmissaoBodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}}/>
                        <Column field='dataVencimento' header='Data de Vencimento' body={dataVencimentoBodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}}/>
                        <Column field='tipo' header='Tipo' body={tipoBodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}}/>
                        <Column field='titulo' header='Título' body={tituloBodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}}/>
                        <Column field='ramoDireito' header='Ramo do Direito' body={ramoDireitoBodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}} />
                        <Column field='natureza' header='Natureza' body={naturezaBodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}} />
                        <Column field='cidade' header='Cidade' body={cidadeBodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}} />
                        <Column field='parceiro' header='Parceiro' body={parceiroBodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}} />
                        <Column field='status' header='Status' body={statusBodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}} />
                    </DataTable>
                </div>
            </div>
        </div>
    )
}

export default TitulosEmAberto
