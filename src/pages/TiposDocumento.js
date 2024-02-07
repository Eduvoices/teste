import React, { useState, useEffect, useRef} from "react"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Toast } from "primereact/toast"
import { FileUpload } from "primereact/fileupload"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Toolbar } from "primereact/toolbar"
import { Dialog } from "primereact/dialog"
import { classNames } from "primereact/utils"
import DocTypeService from "../service/DocTypeService"

const TiposDocumento = () => {
    let emptyDoc = {
        descricao: '',
        obs: ''
    }

    const [docs, setDocs] = useState(null)
    const [docDialog, setDocDialog] = useState(false)
    const [deletDocDialog, setDeleteDocDialog] = useState(false)
    const [deleteDocsDialog, setDeleteDocsDialog] = useState(false)
    const [doc, setDoc] = useState(emptyDoc)
    const [selectedDocs, setSelectedDocs] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const [globalFilter, setGlobalFilter] = useState(null)
    const toast = useRef(null)
    const dt = useRef(null)

    useEffect(() => {
        const docService = new DocTypeService()
        docService.getDocs().then((data) => setDocs(data))
    }, [])

    function handleEnter(event) {
        if (event.keyCode === 13) {
            const form = event.target.form
            const index = Array.prototype.indexOf.call(form, event.target)
            form.elements[index + 1].focus()
            event.preventDefault()
        }
    }

    const openNew = () => {
        setDoc(emptyDoc)
        setSubmitted(false)
        setDocDialog(true)
    }

    const hideDialog = () => {
        setSubmitted(false)
        setDocDialog(false)
    }

    const hideDeleteDocDialog = () => {
        setDeleteDocDialog(false)
    }

    const hideDeleteDocsDialog = () => {
        setDeleteDocsDialog(false)
    }

    const saveDoc = () => {
        setSubmitted(true);

        if (doc.descricao.trim()) {
            let _docs = [...docs];
            let _doc = { ...doc };
            if (doc.id) {
                const index = findIndexById(doc.id);

                _docs[index] = _doc;
                toast.current.show({ severity: 'success', summary: 'Sucesso !', detail: 'Cadastro atualizado', life: 3000 });
            } else {
                _doc.id = createId();
                _docs.push(_doc);
                toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Cadastro criado', life: 3000 });
            }

            setDocs(_docs);
            setDocDialog(false);
            setDoc(emptyDoc);
        }
    };

    const editDoc = (doc) => {
        setDoc({...doc})
        setDocDialog(true)
    }

    const confirmDeleteDoc = (doc) => {
        setDoc(doc)
        setDeleteDocDialog(true)
    }

    const deleteDoc = () => {
        let _docs = docs.filter((val) => val.id !== doc.id)
        setDocs(_docs)
        setDeleteDocDialog(false)
        setDoc(emptyDoc)
        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Cadastro removido', life: 3000 });
    }

    const findIndexById = (id) => {
        let index = -1
        for (let i = 0; i < docs.length; i++) {
            if (docs[i].id === id) {
                index = i
                break
            }
        }

        return index
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    const exportCSV = () => {
        dt.current.exportCSV()
    }

    const confirmDeleteSelected = () => {
        setDeleteDocsDialog(true)
    }

    const deleteSelectedDocs = () => {
        let _docs = docs.filter((val) => !selectedDocs.includes(val));
        setDocs(_docs);
        setDeleteDocsDialog(false);
        setSelectedDocs(null);
        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Cadastro deletado', life: 3000 });
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || ''
        let _doc = {...doc}
        _doc[`${name}`] = val

        setDoc(_doc)
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className='my-2'>
                    <Button label='Novo' icon='pi pi-plus' className='p-button-success mr-2' onClick={openNew}/>
                    <Button label='Deletar' icon='pi pi-thrash' className='p-button-danger' onClick={confirmDeleteSelected} disabled={!selectedDocs || !selectedDocs.length}/>
                </div>
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
        <React.Fragment>
            <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Importar" chooseLabel="Importar" className="mr-2 inline-block" />
            <Button label='Exportar' icon='pi pi-upload' className='p-button-help' onClick={exportCSV}/>
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

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editDoc(rowData)}/>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteDoc(rowData)}/>
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

    const productDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" className="p-button-text" onClick={saveDoc} />
        </>
    );
    const deleteProductDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={hideDeleteDocDialog} />
            <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={deleteDoc} />
        </>
    );
    const deleteProductsDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={hideDeleteDocsDialog} />
            <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedDocs} />
        </>
    );

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

                <Dialog visible={docDialog} style={{ width: '600px' }} header="Dados cadastrais" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        {doc.image && <img src={`assets/demo/images/product/${doc.image}`} alt={doc.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
                        <form>

                        <div className="field">
                                <label htmlFor="descricao">Descrição</label>
                                <InputText id="descricao" value={doc.descricao} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'descricao')} required autoFocus className={classNames({ 'p-invalid': submitted && !doc.name })} />
                                {submitted && !doc.descricao && <small className="p-invalid">Descrição é obrigatório.</small>}
                            </div>

                            <div className="field">
                                <label htmlFor="obs">Obs</label>
                                <InputText id="obs" value={doc.obs} onChange={(e) => onInputChange(e, 'obs')} required autoFocus className={classNames({ 'p-invalid': submitted && !doc.obs })} />
                                {submitted && !doc.obs && <small className="p-invalid">Descrição é obrigatório.</small>}
                            </div>

                        </form>

                    </Dialog>

                    <Dialog visible={deletDocDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteProductDialogFooter} onHide={hideDeleteDocDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {doc && (
                                <span>
                                    Tem certeza de que quer deletar o documento?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteDocsDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteProductsDialogFooter} onHide={hideDeleteDocsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {doc && <span>Tem certeza de que quer deletar os documentos selecionados?</span>}
                        </div>
                    </Dialog>
            </div>
        </div>
    </div>
    )
}

export default TiposDocumento
