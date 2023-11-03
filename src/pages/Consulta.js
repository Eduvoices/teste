import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import ProductService from '../service/ProductService';
import { InputMask } from 'primereact/inputmask';
import SelectUf from '../components/SelectUF'
import SelectCity from '../components/SelectCities'

const Consulta = () => {
    let emptyProduct = {
        id: '',
        code: '',
        name: '',
        cpf: '',
        rg: '',
        endereço: '',
        número: '',
        complemento: '',
        bairro: '',
        cep: '',
        uf: '',
        cidade: '',
        nascimento: '',
        tel1: '',
        tel2: '',
        tel3: '',
        email: '',
        responsável: '',
        social: '',
        como: '',
        obs: '',
        dataCadastro: dataAtual()
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [street, setStreet] = useState('')
    const [block, setBlock] = useState('')
    const [cpf, setCPF] = useState('')
    const [formValue, setFormValue] = useState({})
    const [cepState, setCepState] = useState('')
    const [uf, setUf] = useState('')
    const [city, setCity] = useState('')
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        const productService = new ProductService();
        productService.getProducts().then((data) => setProducts(data));
    }, []);


    function validarPrimeiroDigito(cpf) {
        let sum = 0;
        for (let i = 0; i < 9; i++) {
          sum += cpf[i] * (10 - i);
        }
        const resto = (sum * 10) % 11;
        if (resto < 10) {
            // eslint-disable-next-line eqeqeq
            return cpf[9] == resto;
        }
        // eslint-disable-next-line eqeqeq
        return cpf[9] == 0;
        }

        function validarSegundoDigito(cpf) {
        let sum = 0;
        for (let i = 0; i < 10; i++) {
          sum += cpf[i] * (11 - i);
        }
        const resto = (sum * 10) % 11;
        if (resto < 10) {
            // eslint-disable-next-line eqeqeq
            return cpf[10] == resto;
        }
        // eslint-disable-next-line eqeqeq
        return cpf[10] == 0;
        }

        function validarRepetido(cpf) {
        const primeiro = cpf[0];
        let diferente = false;
        for(let i = 1; i < cpf.length; i++) {
            // eslint-disable-next-line eqeqeq
            if(cpf[i] != primeiro) {
            diferente = true;
            }
        }
        return diferente;
        }

        function validarCpf(cpf) {
            // eslint-disable-next-line eqeqeq
            if (cpf.length != 11) {
            return false;
            }
            if(!validarRepetido(cpf)) {
            return false;
            }
            if (!validarPrimeiroDigito(cpf)) {
            return false;
            }
            if (!validarSegundoDigito(cpf)) {
            return false;
            }
            return true;
        }

        const cpfValido = validarCpf(cpf)

    let cep = ''

    const checkCEP = (e) => {
        setCepState(e.target.value)
        if (!e.target.value) return
        cep = e.target.value.replace(/\D/g, '')
        fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
            setStreet(data.logradouro)
            setBlock(data.bairro)
            setUf(data.uf)
            setCity(data.localidade)
        }).catch((err) => console.log(err))
    }

    function handleEnter(event) {
        if (event.keyCode === 13) {
            const form = event.target.form
            const index = Array.prototype.indexOf.call(form, event.target)
            form.elements[index + 1].focus()
            event.preventDefault()
        }
    }

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
        setCity('')
        setUf('')
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);

        if (product.name.trim()) {
            let _products = [...products];
            let _product = { ...product };
            if (product.id) {
                const index = findIndexById(product.id);

                _products[index] = _product;
                toast.current.show({ severity: 'success', summary: 'Sucesso !', detail: 'Cadastro atualizado', life: 3000 });
            } else {
                _product.id = createId();
                _products.push(_product);
                toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Cadastro criado', life: 3000 });
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    };

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        let _products = products.filter((val) => val.id !== product.id);
        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Cadastro removido', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Cadastro deletado', life: 3000 });
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
            _product[`${name}`] = val;

        setProduct(_product);

        if (name === 'endereço') {
            console.log(e.target.value)
        }
    };

    const handleInputChange = (e) => {
        e.preventDefault()
        const {value, name} = e.target
        setFormValue({...formValue, [name]: value})
        setUf(value)
    }

    const handleCityChange = (e) => {
        e.preventDefault()
        const {value, name} = e.target
        setFormValue({...formValue, [name] : value})
        setCity(value)
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Novo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    <Button label="Deletar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
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

    const codeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Code</span>
                {rowData.code}
            </>
        );
    };

    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        );
    };

    const imageBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Image</span>
                <span width="100" >{rowData.cpf}</span>
            </>
        );
    };

    const rgBodyTemplate = (rowData) => {
        return (
            <>
                <span className='p-column-title'>RG</span>
                <span width='100'>{rowData.rg}</span>
            </>
        )
    }

    const priceBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Price</span>
                {rowData.endereço || street}
            </>
        );
    };

    const categoryBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Category</span>
                {rowData.número}
            </>
        );
    };

    const ratingBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Reviews</span>
                <span>{rowData.bairro || block}</span>
            </>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                <span>{rowData.complemento}</span>
            </>
        );
    };

    const cepBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">CEP</span>
                <span>{rowData.cep}</span>
            </>
        )
    }

    const ufBodyTemplate = (rowData) => {
        return (
            <>
                <span className='p-column-title'>UF</span>
                <span>{rowData.uf}</span>
            </>
        )
    }

    const cidadeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Cidade</span>
                <span>{rowData.cidade}</span>
            </>
        )
    }

    const nascimentoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nascimento</span><span></span>
                <span>{rowData.nascimento}</span>
            </>
        )
    }

    const tel1BodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Tel 1</span>
                <span>{rowData.tel1}</span>
            </>
        )
    }

    const tel2BodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Tel 2</span>
                <span>{rowData.tel2}</span>
            </>
        )
    }

    const tel3BodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Tel 3</span>
                <span>{rowData.tel3}</span>
            </>
        )
    }

    const emailBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Email</span>
                <span>{rowData.email}</span>
            </>
        )
    }

    const responsávelBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Responsável</span>
                <span>{rowData.responsável}</span>
            </>
        )
    }

    const socialBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Tel 1</span>
                <span>{rowData.social}</span>
            </>
        )
    }

    const comoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Tel 1</span>
                <span>{rowData.como}</span>
            </>
        )
    }

    const obsBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Tel 1</span>
                <span>{rowData.obs}</span>
            </>
        )
    }

    const dataCadastroBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Tel 1</span>
                <span>{rowData.dataCadastro}</span>
            </>
        )
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
            </div>
        );
    };

    function dataAtual() {
        let data = new Date()
        let day = data.getDate().toString().padStart(2, '0')
        let month = String(data.getMonth() + 1).padStart(2, '0')
        return `${day}/${month}/${data.getFullYear()}`
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Consulta</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const productDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </>
    );
    const deleteProductDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </>
    );
    const deleteProductsDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        style={{whiteSpace:'nowrap'}}
                        ref={dt}
                        value={products}
                        selection={selectedProducts}
                        onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} cadastros"
                        globalFilter={globalFilter}
                        emptyMessage="Nenhum resultado encontrado."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                        <Column field="code" header="Código" sortable body={codeBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="name" header="Nome" sortable body={nameBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field='cpf' header="CPF" body={imageBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field='rg' header="RG" body={rgBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="endereço" header="Endereço" body={priceBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '8rem' }}></Column>
                        <Column field="número" header="Número" sortable body={categoryBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="bairro" header="Bairro" body={ratingBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="complemento" header="Complemento" body={statusBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field='uf' header="UF" body={ufBodyTemplate} sortable headerStyle={{width: '14%', minWidth:'10rem'}} ></Column>
                        <Column field="cep" header="CEP" body={cepBodyTemplate} sortable headerStyle={{width: '14%', minWidth:'10rem'}}></Column>
                        <Column field="cidade" header="Cidade" body={cidadeBodyTemplate} sortable headerStyle={{width: '14%', minWidth:'10rem'}}></Column>
                        <Column field="nascimento" header="Nascimento" body={nascimentoBodyTemplate} sortable headerStyle={{width: '14%', minWidth:'10rem'}}></Column>
                        <Column field="tel1" header="Tel 1" body={tel1BodyTemplate} sortable headerStyle={{width:'14%', minWidth:'10rem'}}></Column>
                        <Column field="tel2" header="Tel 2" body={tel2BodyTemplate} sortable headerStyle={{width:'14%', minWidth:'10rem'}}></Column>
                        <Column field="tel3" header="Tel 3" body={tel3BodyTemplate} sortable headerStyle={{width:'14%', minWidth:'10rem'}}></Column>
                        <Column field="email" header="Email" body={emailBodyTemplate} sortable headerStyle={{width:'14%', minWidth:'10rem'}}></Column>
                        <Column field="responsável" header="Responsável" body={responsávelBodyTemplate} sortable headerStyle={{width:'14%', minWidth:'10rem'}}></Column>
                        <Column field="social" header="Social" body={socialBodyTemplate} sortable headerStyle={{width:'14%', minWidth:'10rem'}}></Column>
                        <Column field="como" header="Como" body={comoBodyTemplate} sortable headerStyle={{width:'14%', minWidth:'10rem'}}></Column>
                        <Column field="obs" header="Obs" body={obsBodyTemplate} sortable headerStyle={{width:'14%', minWidth:'10rem'}}></Column>
                        <Column field="dataCadastro" header="Data cadastro" body={dataCadastroBodyTemplate} sortable headerStyle={{width:'14%', minWidth:'10rem'}}></Column>
                    </DataTable>

                    <Dialog visible={productDialog} style={{ width: '600px' }} header="Dados cadastrais" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        {product.image && <img src={`assets/demo/images/product/${product.image}`} alt={product.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
                        <form>

                            <div className="field">
                                <label htmlFor="name">Nome</label>
                                <InputText id="name" value={product.name} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                                {submitted && !product.name && <small className="p-invalid">Nome é obrigatório.</small>}
                            </div>

                            <div className='formgrid grid'>
                                <div className="field col">
                                    <label htmlFor="cpf">CPF</label>
                                    <InputText id="cpf" value={product.cpf} onBlur={(e)=> setCPF(e.target.value)} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'cpf')} required className={classNames({ 'p-invalid': (submitted && !product.cpf) || (!cpfValido && cpf !== '' )})}/>
                                    {submitted && !product.cpf && <small className="p-invalid">CPF é obrigatório</small>}
                                    {cpfValido === true ||  cpf.length === 11 || cpf === '' ? (
                                        <span id='valid'></span>
                                    ) : (
                                        <small id='invalid' style={{color: 'red'}}>CPF inválido</small>
                                    )}
                                </div>

                                <div className="field col">
                                    <label htmlFor="rg">RG</label>
                                    <InputMask mask='99.999.999-9' id="rg" value={product.rg} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'rg')} required className={classNames({ 'p-invalid': submitted && !product.rg })} />
                                    {submitted && !product.rg && <small className="p-invalid">RG é obrigatório</small>}
                                </div>
                            </div>

                            <div className='formgrid grid'>
                                <div className="field col">
                                    <label htmlFor="cep">CEP</label>
                                    <InputText id="cep" value={product.cep} onBlur={checkCEP} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'cep')} required className={classNames({ 'p-invalid': submitted && !product.cep })} />
                                    {submitted && !product.cep && <small className="p-invalid">CEP é obrigatório</small>}
                                </div>

                                <div className="field col">
                                    <label htmlFor="endereço">Endereço</label>
                                    <InputText id="endereço" value={product.endereço} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'endereço')} required className={classNames({ 'p-invalid': submitted && !product.endereço })} />
                                    {submitted && !product.endereço && <small className="p-invalid">Endereço é obrigatório</small>}
                                </div>
                            </div>

                            <div className='formgrid grid'>
                                <div className="field col">
                                    <label htmlFor="número">Número</label>
                                    <InputText id="número" value={product.número} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'número')} required className={classNames({ 'p-invalid': submitted && !product.número })} />
                                    {submitted && !product.número && <small className="p-invalid">Número é obrigatório</small>}
                                </div>

                                <div className="field col">
                                    <label htmlFor="bairro">Bairro</label>
                                    <InputText id="bairro" value={product.bairro} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'bairro')} required className={classNames({ 'p-invalid': submitted && !product.bairro })} />
                                    {submitted && !product.bairro && <small className="p-invalid">Bairro é obrigatório</small>}
                                </div>
                            </div>

                            <div className='formgrid grid'>
                                <div className="field col">
                                    <label htmlFor="complemento">Complemento</label>
                                    <InputText id="complemento" value={product.complemento} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'complemento')} />
                                </div>


                                <div className="field col">
                                    <label htmlFor="uf">UF</label>
                                    <SelectUf id="uf" value={uf} onChange={handleInputChange} uf={product.uf || uf} onBlur={(e) => onInputChange(e, 'uf')} required className={classNames({ 'p-invalid': submitted && !product.uf })}/>
                                    {submitted && !product.uf && <small className="p-invalid">UF é obrigatório</small>}
                                </div>
                            </div>

                            <div className='formgrid grid'>
                                <div className="field col">
                                    <label htmlFor="cidade">Cidade</label>
                                    <SelectCity id="cidade" value={product.cidade} state={formValue.states || product.uf} city={city || product.cidade} onChange={handleCityChange}  onBlur={(e) => onInputChange(e, 'cidade')} required className={classNames({ 'p-invalid': submitted && !product.cidade })} />
                                    {submitted && !product.cidade && <small className="p-invalid">Cidade é obrigatório</small>}
                                </div>

                                <div className="field col">
                                    <label htmlFor="nascimento">Nascimento</label>
                                    <InputMask mask='99/99/9999' id="nascimento" value={product.nascimento} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'nascimento')} required className={classNames({ 'p-invalid': submitted && !product.nascimento })} />
                                    {submitted && !product.nascimento && <small className="p-invalid"></small>}
                                </div>
                            </div>

                            <div className='formgrid grid'>
                                <div className="field col">
                                    <label htmlFor="tel1">Tel1</label>
                                    <InputMask mask='(99) 99999-9999' id="tel1" value={product.tel1} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'tel1')} required className={classNames({ 'p-invalid': submitted && !product.tel1 })} />
                                    {submitted && !product.tel1 && <small className="p-invalid">Tel1 é obrigatório</small>}
                                </div>

                                <div className="field col">
                                    <label htmlFor="tel2">Tel2</label>
                                    <InputMask mask='(99) 99999-9999' id="tel2" value={product.tel2} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'tel2')}   />
                                </div>
                            </div>

                            <div className='formgrid grid'>
                                <div className="field col">
                                    <label htmlFor="tel3">Tel3</label>
                                    <InputMask mask='(99) 99999-9999' id="tel3" value={product.tel3} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'tel3')} />
                                </div>

                                <div className="field col">
                                    <label htmlFor="email">Email</label>
                                    <InputText id="email" value={product.email} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'email')} />
                                </div>
                            </div>

                            <div className='formgrid grid'>
                                <div className="field col">
                                    <label htmlFor="responsável">Responsável</label>
                                    <InputText id="responsável" value={product.responsável} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'responsável')} />
                                </div>

                                <div className="field col">
                                    <label htmlFor="social">Rede Social</label>
                                    <InputText id="social" value={product.social} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'social')} />
                                </div>
                            </div>

                            <div className='formgrid grid'>
                                <div className="field col">
                                    <label htmlFor="obs">Obs</label>
                                    <InputText id="obs" value={product.obs} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'obs')} />
                                </div>

                                <div className="field col">
                                    <label htmlFor="dataCadastro">Data de cadastro</label>
                                    <InputText id="dataCadastro" value={dataAtual()} disabled />
                                </div>
                            </div>

                        </form>

                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && (
                                <span>
                                    Tem certeza de que quer deletar o cadastro de <b>{product.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && <span>Tem certeza de que quer deletar os cadastros selecionados?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Consulta;
