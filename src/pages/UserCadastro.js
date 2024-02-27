import React, { useState, useRef, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import UserService from '../service/UserService'

const UserCadastro = () => {
    let emptyUser = {
        nome: '',
        login: '',
        status: '',
        id: ''
    }

    const [radioValue, setRadioValue] = useState('')
    const [users, setUsers] = useState(null)
    const [userDialog, setUserDialog] = useState(false)
    const [deleteUserDialog, setDeletUserDialog] = useState(false)
    const [deleteUsersDialog, setDeleteUsersDialog] = useState(false)
    const [user, setUser] = useState(emptyUser)
    const [selectedUsers, setSelectedUsers] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const [globalFilter, setGlobalFilter] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const dt = useRef(null)
    const toast = useRef(null)

    useEffect(() => {
        const userService = new UserService()
        userService.getUsers().then((data)=> {
            setUsers(data)
            setIsLoading(false)
        })

    }, [])

    function openNew() {
        setUser(emptyUser)
        setSubmitted(false)
        setUserDialog(true)
    }

    function hideDialog() {
        setSubmitted(false)
        setUserDialog(false)
    }

    function hideDeleteUserDialog() {
        setDeletUserDialog(false)
    }

    function hideDeleteUsersDialog() {
        setDeleteUsersDialog(false)
    }

    function saveUser() {
        setSubmitted(true)

        if (user.nome.trim()) {
            let _users = [...users]
            let _user = {...user}
            if (user.id) {
                const index = findIndexById(user.id)

                _users[index] = _user
                toast.current.show({severity: 'success', summary: 'Sucesso', detail: 'Cadastro Atualixado', life: 3000})
            } else {
                _user.id = createId()
                _users.push(_user)
                toast.current.show({severity: 'success', summary: 'Sucesso', detail: 'Cadastro criado', life: 3000})
            }

            setUsers(_users)
            setUserDialog(false)
            setUser(emptyUser)
        }
    }

    function editUser(user) {
        setUser({...user})
        setUserDialog(true)
    }

    function confirmDeletUser(user) {
        setUser(user)
        setDeletUserDialog(true)
    }

    function deleteUser() {
        let _users = users.filter((val) => val.id !== user.id)
        setUsers(_users)
        setDeletUserDialog(false)
        setUser(emptyUser)
        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Cadastro removido', life: 3000 });
    }

    function handleEnter(event) {
        if (event.keyCode === 13) {
            const form = event.target.form
            const index = Array.prototype.indexOf.call(form, event.target)
            form.elements[index + 1].focus()
            event.preventDefault()
        }
    }

    function findIndexById(id) {
        let index = -1
        for (let i = 0; i < users.lenght; i++) {
            if (users[i].id === id) {
                index = i
                break
            }
        }
        return index
    }

    function createId() {
        let id = ''
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        return id
    }

    function exportCSV() {
        dt.current.exportCSV()
    }

    function confirmDeleteSelected() {
        setDeleteUsersDialog(true)
    }

    function deleteSelectedUsers() {
        let _users = users.filter((val) => !selectedUsers.includes(val))
        setUsers(_users)
        setDeleteUsersDialog(false)
        setSelectedUsers(null)
        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Usuário deletado', life: 3000 });
    }

    function onInputChange(e, name) {
        const val = (e.target && e.target.value) || '';
        let _user = { ...user };
            _user[`${name}`] = val;

        setUser(_user);
        console.log(_user)
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Novo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    <Button label="Deletar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedUsers || !selectedUsers.length} />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Importar" chooseLabel="Importar" className="mr-2 inline-block" />
                <Button label="Exportar" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        );
    };

    function nomeBodyTemplate(rowData) {
        return (
            <>
                <span className='p-column-title'>Nome</span>
                <span>{rowData.nome}</span>
            </>
        )
    }

    function loginBodyTemplate(rowData) {
        return (
            <>
                <span className='p-column-title'>Login</span>
                <span>{rowData.login}</span>
            </>
        )
    }

    function statusBodyTemplate(rowData) {
        return (
            <>
                <span className='p-column-title'>Status</span>
                <span>{rowData.status}</span>
            </>
        )
    }

    function actionBodyTemplate(rowData) {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editUser(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeletUser(rowData)} />
            </div>
        )
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
        <h5 className="m-0">Pessoa Física</h5>
        <span className="block mt-2 md:mt-0 p-input-icon-left">
            <i className="pi pi-search" />
            <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
        </span>
    </div>
    )

    const userDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" className="p-button-text" onClick={saveUser} disabled={enable()}/>
        </>
    );

    const deleteUserDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={hideDeleteUserDialog} />
            <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={deleteUser} />
        </>
    )

    const deleteUsersDialogFooter = (
        <>
        <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={hideDeleteUsersDialog} />
        <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedUsers} />
    </>
    )

    // function clear() {
    //     setConfirmPassword('')
    //     setEmail('')
    //     setPassword('')
    //     setRadioValue('')
    // }

    function enable() {
        if (user.nome && user.login && user.status) {
            return false
        } else {
            return true
        }
    }


    return (
        <div className='grid crud-demo'>
            <div className='col-12'>
                <div className='card'>
                    <Toast ref={toast} />
                    <Toolbar className='mb-4' left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        style={{whiteSpace:'nowrap'}}
                        ref={dt}
                        value={users}
                        selection={selectedUsers}
                        onSelectionChange={(e)=> setSelectedUsers(e.value)}
                        dataKey='id'
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5,10,25]}
                        className='datatable-responsive'
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate='Mostrando {first} a {last} de {totalRecords} usuários'
                        globalFilter={globalFilter}
                        emptyMessage={isLoading ? 'Carregando' : 'Nenhum usuário encontrado'}
                        header={header}
                        responsiveLayout='scroll'
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                        <Column field="nome" header="Nome" body={nomeBodyTemplate} headerStyle={{width:'25%', minWidth:'10rem'}}></Column>
                        <Column field="login" header="Login" body={loginBodyTemplate} headerStyle={{ width: '25%', minWidth: '10rem' }}></Column>
                        <Column field="status" header="Status" body={statusBodyTemplate} headerStyle={{ width: '25%', minWidth: '10rem' }}></Column>
                    </ DataTable>

                    <Dialog visible={userDialog} style={{ width: '600px' }} header="Dados cadastrais" modal className="p-fluid" footer={userDialogFooter} onHide={hideDialog}>
                        <form>

                            <div className="field">
                                <label htmlFor="name">Nome</label>
                                <InputText id="name" value={user.nome} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'nome')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.nome })} />
                                {submitted && !user.nome && <small className="p-invalid">Nome é obrigatório.</small>}
                            </div>

                            <div className="field">
                                <label htmlFor="login">Login</label>
                                <InputText id="login" value={user.login} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'login')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.login })} />
                                {submitted && !user.login && <small className="p-invalid">Nome é obrigatório.</small>}
                            </div>

                            {/* <div>
                                <input type="radio" id="ativo" name="status" value={user.status} checked={user.status === 'Ativo'}/>
                                <label for="ativo">Huey</label>
                            </div> */}

                        <div className="grid">
                        <div className="col-12 md:col-4">
                            <div className="field-radiobutton">
                                <RadioButton inputId="option1" name="option" value="Ativo" checked={user.status === 'Ativo'} onChange={(e) => onInputChange(e, 'status')} />
                                <label htmlFor="option1">Ativo</label>
                            </div>
                        </div>
                        <div className="col-12 md:col-4">
                            <div className="field-radiobutton">
                                <RadioButton inputId="option2" name="option" value="Cancelado" checked={user.status === 'Cancelado'} onChange={(e) => onInputChange(e, 'status')} />
                                <label htmlFor="option2">Cancelado</label>
                            </div>
                        </div>
                    </div>
                        </form>

                    </Dialog>

                    <Dialog visible={deleteUserDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteUserDialogFooter} onHide={hideDeleteUserDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {user && (
                                <span>
                                    Tem certeza de que quer deletar o cadastro de <b>{user.nome}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteUsersDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteUsersDialogFooter} onHide={hideDeleteUsersDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {user && <span>Tem certeza de que quer deletar os cadastros selecionados?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default UserCadastro;
