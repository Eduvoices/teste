import React, {useState, useRef, useEffect} from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Toast } from 'primereact/toast'
import { Button } from 'primereact/button'
import { FileUpload } from 'primereact/fileupload'
import { Toolbar } from 'primereact/toolbar'
import { InputText } from 'primereact/inputtext'
import TitulosService from '../service/TitulosService'

const TitulosEmAberto = () => {

    const [titles, setTitles] = useState([])
    const [selectedTitles, setSelectedTitles] = useState(null)
    const [globalFilter, setGlobalFilter] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        const titleService = new TitulosService()
        titleService.getTitulos().then((data) => {
            setTitles(data)
            setIsLoading(false)
        })
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
                {rowData.Sacado}
            </>
        )
    }

    const valorBodyTemplate = (rowData) => {
        return (
            <>
                <span className='p-column-title'>Valor</span>
                {rowData.TituloReceber_ValorEmitido}
            </>
        )
    }

    const dataEmissaoBodyTemplate = (rowData) => {
        let rawDate = rowData.TituloReceber_Dataemissao
        let splitDate = rawDate.split('T')
        let individualDate = splitDate[0].split('-')
        let date = `${individualDate[2]}/${individualDate[1]}/${individualDate[0]}`

        return (
            <>
                <span className='p-column-title'>Data de Emissão</span>
                {date}
            </>
        )
    }

    const tipoBodyTemplate = (rowData) => {
        return (
            <>
                <span className='p-column-title'>Tipo</span>
                {rowData.TituloReceber_Tipo}
            </>
        )
    }

    const dataVencimentoBodyTemplate = (rowData) => {
        let rawDate = rowData.TituloReceber_DataVencimento
        let splitDate = rawDate.split('T')
        let individualDate = splitDate[0].split('-')
        let date = `${individualDate[2]}/${individualDate[1]}/${individualDate[0]}`

        return (
            <>
                <span className='p-column-title'>Data de Vencimento</span>
                {date}
            </>
        )
    }

    const ramoDireitoBodyTemplate = (rowData) => {
        return (
            <>
                <span className='p-column-title'></span>
                {rowData.RamoDireito_Descricao}
            </>
        )
    }

    const naturezaBodyTemplate = (rowData) => {
        return (
            <>
                <span className='p-column-title'></span>
                {rowData.Natureza_Descricao}
            </>
        )
    }

    const cidadeBodyTemplate = (rowData) => {
        return (
            <>
                <span className='p-column-title'></span>
                {rowData.Localidade_Nome}
            </>
        )
    }

    const parceiroBodyTemplate = (rowData) => {
        return (
        <>
            <span className='p-column-title'></span>
            {rowData.Parceiro}
        </>
        )
    }

    const anoBodyTemplate = (rowData) => {
        return (
            <>
                <span className='p-column-title'></span>
                {rowData.TituloReceber_Ano}
            </>
        )
    }

    const numeroBodyTemplate = (rowData) => {
        return (
            <>
                <span className='p-column-title'></span>
                {rowData.TituloReceber_Numero}
            </>
        )
    }

    const parcelaBodyTemplate = (rowData) => {
        return (
            <>
                <span className='p-column-title'></span>
                {rowData.TituloReceber_Parcela}
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

    let array2 = []

    function parse(data, i) {
        let ano = data[i].TituloReceber_Ano
        let parcela = data[i].TituloReceber_Parcela
        let numero = data[i].TituloReceber_Numero
        let id = `${ano}-${parcela}-${numero}`

        return {
            Sacado: data[i].Sacado,
            CPF: data[i].CPF,
            TituloReceber_ValorEmitido: data[i].TituloReceber_ValorEmitido,
            TituloReceber_Dataemissao: data[i].TituloReceber_Dataemissao,
            TituloReceber_DataVencimento: data[i].TituloReceber_DataVencimento,
            RamoDireito_Descricao: data[i].RamoDireito_Descricao,
            Natureza_Descricao: data[i].Natureza_Descricao,
            TituloReceber_Ano: data[i].TituloReceber_Ano,
            TituloReceber_Numero: data[i].TituloReceber_Numero,
            TituloReceber_Parcela: data[i].TituloReceber_Parcela,
            Localidade_Nome: data[i].Localidade_Nome,
            Parceiro: data[i].Parceiro,
            TituloReceber_Tipo: data[i].TituloReceber_Tipo,
            id: id
        }
    }

    function f() {
        for (let i = 0; i < titles.length; i++) {
            const elemental = parse(titles, i)
            array2 = [...array2, elemental]
        }
    }

    f()

    return (
        <div className='grid crud-demo'>
            <div className='col-12'>
                <div className='card'>
                    <Toast ref={toast}/>
                    <Toolbar className='mb-4' left={leftToolbarTemplate} right={rightToolbarTemplate}/>

                    <DataTable
                        style={{whiteSpace:'nowrap'}}
                        ref={dt}
                        value={array2}
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
                        emptyMessage={isLoading ? 'Carregando...' : 'Nenhum resultado encontrado.'}
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode='multiple' headerStyle={{width:'2rem'}}/>
                        <Column body={actionBodyTemplate}/>
                        <Column field='Sacado' header='Sacado' body={sacadoBodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}}/>
                        <Column field='TituloReceber_ValorEmitido' header='Valor' body={valorBodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}}/>
                        <Column field='TituloReceber_Dataemissao' header='Data de Emissão' body={dataEmissaoBodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}}/>
                        <Column field='TituloReceber_DataVencimento' header='Data de Vencimento' body={dataVencimentoBodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}}/>
                        <Column field='TituloReceber_Tipo' header='Tipo' body={tipoBodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}}/>
                        <Column field='Localidade_Nome' header='Cidade' body={cidadeBodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}} />
                        <Column field='TituloReceber_Ano' header='Ano' body={anoBodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}} />
                        <Column field='TituloReceber_Numero' header='Número' body={numeroBodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}} />
                        <Column field='TituloReceber_Parcela' header='Parcela' body={parcelaBodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}} />
                        <Column field='RamoDireito_Descricao' header='Ramo do Direito' body={ramoDireitoBodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}} />
                        <Column field='Natureza_Descricao' header='Natureza' body={naturezaBodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}} />
                        <Column field='Parceiro' header='Parceiro' body={parceiroBodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}} />
                    </DataTable>
                </div>
            </div>
        </div>
    )
}

export default TitulosEmAberto
