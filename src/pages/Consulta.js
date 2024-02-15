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
        Pessoa_Codigo: '',
        Pessoa_NomeRazaoSocial: '',
        Pessoa_CPF_CNPJ: '',
        Pessoa_RG_IE: '',
        Pessoa_Rua: '',
        Pessoa_Nro: '',
        Pessoa_Complemento: '',
        Pessoa_Bairro: '',
        Pessoa_CEP: '',
        UF_Sigla: '',
        Localidade_Nome: '',
        Pessoa_DataNascimento: '',
        Pessoa_FoneResidencial: '',
        Pessoa_FoneComercial: '',
        Pessoa_FoneCelular: '',
        Pessoa_EMail: '',
        Pessoa_Obs: '',
        Pessoa_DataCad: dataAtual()
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
    const [uf, setUf] = useState('')
    const [city, setCity] = useState('')
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        const productService = new ProductService();
        productService.getProducts().then((data) => setProducts(data));
    }, []);

    function dataEdit(product) {
        let rawDate = product.Pessoa_DataCad
        let dateSplit = rawDate.split('T')
        let individualDate = dateSplit[0].split('-')
        let date = `${individualDate[2]}/${individualDate[1]}/${individualDate[0]}`

        return date
    }


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
        setBlock('')
        setStreet('')
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

        if (product.Pessoa_NomeRazaoSocial.trim()) {
            let _products = [...products];
            let _product = { ...product };
            if (product.Pessoa_Codigo) {
                const index = findIndexById(product.Pessoa_Codigo);

                _products[index] = _product;
                toast.current.show({ severity: 'success', summary: 'Sucesso !', detail: 'Cadastro atualizado', life: 3000 });
            } else {
                _product.Pessoa_Codigo = createId();
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
        let _products = products.filter((val) => val.Pessoa_Codigo !== product.Pessoa_Codigo);
        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Cadastro removido', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].Pessoa_Codigo === id) {
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
                {rowData.Pessoa_Codigo}
            </>
        );
    };

    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.Pessoa_NomeRazaoSocial}
            </>
        );
    };

    const imageBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Image</span>
                <span width="100" >{rowData.Pessoa_CPF_CNPJ}</span>
            </>
        );
    };

    const rgBodyTemplate = (rowData) => {
        return (
            <>
                <span className='p-column-title'>RG</span>
                <span width='100'>{rowData.Pessoa_RG_IE}</span>
            </>
        )
    }

    const priceBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Price</span>
                {rowData.Pessoa_Rua || street}
            </>
        );
    };

    const categoryBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Número</span>
                {rowData.Pessoa_Nro}
            </>
        );
    };

    const ratingBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Bairro</span>
                <span>{rowData.Pessoa_Bairro || block}</span>
            </>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Complemento</span>
                <span>{rowData.Pessoa_Complemento}</span>
            </>
        );
    };

    const cepBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">CEP</span>
                <span>{rowData.Pessoa_CEP}</span>
            </>
        )
    }

    const ufBodyTemplate = (rowData) => {
        return (
            <>
                <span className='p-column-title'>UF</span>
                <span>{rowData.UF_Sigla}</span>
            </>
        )
    }

    const cidadeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Cidade</span>
                <span>{rowData.Localidade_Nome}</span>
            </>
        )
    }

    const nascimentoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nascimento</span><span></span>
                <span>{rowData.Pessoa_DataNascimento}</span>
            </>
        )
    }

    const tel1BodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Tel 1</span>
                <span>{rowData.Pessoa_FoneResidencial}</span>
            </>
        )
    }

    const tel2BodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Tel 2</span>
                <span>{rowData.Pessoa_FoneComercial}</span>
            </>
        )
    }

    const tel3BodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Tel 3</span>
                <span>{rowData.Pessoa_FoneCelular}</span>
            </>
        )
    }

    const emailBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Email</span>
                <span>{rowData.Pessoa_EMail}</span>
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
                <span>{rowData.Pessoa_Obs}</span>
            </>
        )
    }

    const dataCadastroBodyTemplate = (rowData) => {
        // let rawDate = rowData.Pessoa_DataCad
        // let splitDate = rawDate.split('T')
        // let individualDate = splitDate[0].split('-')
        // let date = `${individualDate[2]}/${individualDate[1]}/${individualDate[0]}`

        return (
            <>
                <span className="p-column-title">Tel 1</span>
                <span>{rowData.Pessoa_DataCad}</span>
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
            <h5 className="m-0">Pessoa Física</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    function enable() {
        if (product.cep && product.name && product.cidade && product.uf && (product.endereço || street) && (product.bairro || block) && product.rg && product.tel1 && cpfValido) {
            return false
        } else {
            return true
        }
    }

    const productDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" className="p-button-text" onClick={saveProduct} disabled={enable()}/>
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
                        dataKey="Pessoa_Codigo"
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
                        <Column field="Pessoa_DataCad" header="Data cadastro" body={dataCadastroBodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}}></Column>
                        <Column field="code" header="Código" sortable body={codeBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="Pessoa_NomeRazaoSocial" header="Nome" sortable body={nameBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field='Pessoa_CPF_CNPJ' header="CPF" body={imageBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field='Pessoa_RG_IE' header="RG" body={rgBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="Pessoa_Rua" header="Endereço" body={priceBodyTemplate} headerStyle={{ width: '14%', minWidth: '8rem' }}></Column>
                        <Column field="Pessoa_Nro" header="Número" sortable body={categoryBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="Pessoa_Bairro" header="Bairro" body={ratingBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="Pessoa_Complemento" header="Complemento" body={statusBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field='UF_Sigla' header="UF" body={ufBodyTemplate} headerStyle={{width: '14%', minWidth:'10rem'}} ></Column>
                        <Column field="Pessoa_CEP" header="CEP" body={cepBodyTemplate} headerStyle={{width: '14%', minWidth:'10rem'}}></Column>
                        <Column field="Localidade_Nome" header="Cidade" body={cidadeBodyTemplate} headerStyle={{width: '14%', minWidth:'10rem'}}></Column>
                        <Column field="Pessoa_DataNascimento" header="Nascimento" body={nascimentoBodyTemplate} headerStyle={{width: '14%', minWidth:'10rem'}}></Column>
                        <Column field="Pessoa_FoneResidencial" header="Tel 1" body={tel1BodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}}></Column>
                        <Column field="Pessoa_FoneComercial" header="Tel 2" body={tel2BodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}}></Column>
                        <Column field="Pessoa_FoneCelular" header="Tel 3" body={tel3BodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}}></Column>
                        <Column field="Pessoa_EMail" header="Email" body={emailBodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}}></Column>
                        <Column field="responsável" header="Responsável" body={responsávelBodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}}></Column>
                        <Column field="social" header="Social" body={socialBodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}}></Column>
                        <Column field="como" header="Como" body={comoBodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}}></Column>
                        <Column field="Pessoa_Obs" header="Obs" body={obsBodyTemplate} headerStyle={{width:'14%', minWidth:'10rem'}}></Column>
                    </DataTable>

                    <Dialog visible={productDialog} style={{ width: '600px' }} header="Dados cadastrais" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        {product.image && <img src={`assets/demo/images/product/${product.image}`} alt={product.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
                        <form>

                            <div className="field">
                                <label htmlFor="name">Nome</label>
                                <InputText id="name" value={product.Pessoa_NomeRazaoSocial} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'Pessoa_NomeRazaoSocial')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                                {submitted && !product.Pessoa_NomeRazaoSocial && <small className="p-invalid">Nome é obrigatório.</small>}
                            </div>

                            <div className='formgrid grid'>
                                <div className="field col">
                                    <label htmlFor="cpf">CPF</label>
                                    <InputText maxLength={11} id="cpf" value={product.Pessoa_CPF_CNPJ} onBlur={(e)=> setCPF(e.target.value)} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'Pessoa_CPF_CNPJ')} required className={classNames({ 'p-invalid': (submitted && !product.cpf) || (!cpfValido && cpf !== '' )})}/>
                                    {submitted && !product.Pessoa_CPF_CNPJ && <small className="p-invalid">CPF é obrigatório</small>}
                                    {cpfValido === true ||  cpf.length === 11 || cpf === '' ? (
                                        <span id='valid'></span>
                                    ) : (
                                        <small id='invalid' style={{color: 'red'}}>CPF inválido</small>
                                    )}
                                </div>

                                <div className="field col">
                                    <label htmlFor="rg">RG</label>
                                    <InputMask mask='99.999.999-9' id="rg" value={product.Pessoa_RG_IE} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'Pessoa_RG_IE')} required className={classNames({ 'p-invalid': submitted && !product.Pessoa_RG_IE })} />
                                    {submitted && !product.Pessoa_RG_IE && <small className="p-invalid">RG é obrigatório</small>}
                                </div>
                            </div>

                            <div className='formgrid grid'>
                                <div className="field col">
                                    <label htmlFor="cep">CEP</label>
                                    <InputText id="cep" value={product.Pessoa_CEP} onBlur={checkCEP} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'Pessoa_CEP')} required className={classNames({ 'p-invalid': submitted && !product.cep })} />
                                    {submitted && !product.Pessoa_CEP && <small className="p-invalid">CEP é obrigatório</small>}
                                </div>

                                <div className="field col">
                                    <label htmlFor="endereço">Endereço</label>
                                    <InputText id="endereço" value={product.Pessoa_Rua || street} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'Pessoa_Rua')} required className={classNames({ 'p-invalid': submitted && !product.endereço })} />
                                    {submitted && !product.Pessoa_Rua && <small className="p-invalid">Endereço é obrigatório</small>}
                                </div>
                            </div>

                            <div className='formgrid grid'>
                                <div className="field col">
                                    <label htmlFor="número">Número</label>
                                    <InputText id="número" value={product.Pessoa_Nro} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'Pessoa_Nro')} required className={classNames({ 'p-invalid': submitted && !product.número })} />
                                    {submitted && !product.Pessoa_Nro && <small className="p-invalid">Número é obrigatório</small>}
                                </div>

                                <div className="field col">
                                    <label htmlFor="bairro">Bairro</label>
                                    <InputText id="bairro" value={product.Pessoa_Bairro || block} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'Pessoa_Bairro')} required className={classNames({ 'p-invalid': submitted && !product.bairro })} />
                                    {submitted && !product.Pessoa_Bairro && <small className="p-invalid">Bairro é obrigatório</small>}
                                </div>
                            </div>

                            <div className='formgrid grid'>
                                <div className="field col">
                                    <label htmlFor="complemento">Complemento</label>
                                    <InputText id="complemento" value={product.Pessoa_Complemento} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'Pessoa_Complemento')} />
                                </div>


                                <div className="field col">
                                    <label htmlFor="uf">UF</label>
                                    <SelectUf id="uf" value={uf} onChange={handleInputChange} uf={product.UF_Sigla || uf} onBlur={(e) => onInputChange(e, 'uf')} required />
                                </div>
                            </div>

                            <div className='formgrid grid'>
                                <div className="field col">
                                    <label htmlFor="cidade">Cidade</label>
                                    <SelectCity id="cidade" value={product.Localidade_Nome} state={formValue.states || product.UF_Sigla} city={city || product.Localidade_Nome} onChange={handleCityChange}  onBlur={(e) => onInputChange(e, 'Localidade_Nome')} required />
                                </div>

                                <div className="field col">
                                    <label htmlFor="nascimento">Nascimento</label>
                                    <InputMask mask='99/99/9999' id="nascimento" value={product.Pessoa_DataNascimento} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'Pessoa_DataNascimento')} required className={classNames({ 'p-invalid': submitted && !product.nascimento })} />
                                    {submitted && !product.Pessoa_DataNascimento && <small className="p-invalid"></small>}
                                </div>
                            </div>

                            <div className='formgrid grid'>
                                <div className="field col">
                                    <label htmlFor="tel1">Tel1</label>
                                    <InputMask mask='(99) 99999-9999' id="tel1" value={product.Pessoa_FoneResidencial} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'Pessoa_FoneResidencial')} required className={classNames({ 'p-invalid': submitted && !product.tel1 })} />
                                    {submitted && !product.Pessoa_FoneResidencial && <small className="p-invalid">Tel1 é obrigatório</small>}
                                </div>

                                <div className="field col">
                                    <label htmlFor="tel2">Tel2</label>
                                    <InputMask mask='(99) 99999-9999' id="tel2" value={product.Pessoa_FoneComercial} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'Pessoa_FoneComercial')}   />
                                </div>
                            </div>

                            <div className='formgrid grid'>
                                <div className="field col">
                                    <label htmlFor="tel3">Tel3</label>
                                    <InputMask mask='(99) 99999-9999' id="tel3" value={product.Pessoa_FoneCelular} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'Pessoa_FoneCelular')} />
                                </div>

                                <div className="field col">
                                    <label htmlFor="email">Email</label>
                                    <InputText id="email" value={product.Pessoa_EMail} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'Pessoa_EMail')} />
                                </div>
                            </div>

                            <div className='formgrid grid'>
                            <div className="field col">
                                    <label htmlFor="dataCadastro">Data de cadastro</label>
                                    <InputText id="dataCadastro" value={product.Pessoa_DataCad === dataAtual() ? dataAtual() : dataEdit(product)} />
                                </div>

                                <div className="field col">
                                    <label htmlFor="social">Rede Social</label>
                                    <InputText id="social" value={product.social} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'social')} />
                                </div>
                            </div>

                            <div className='formgrid grid'>
                                <div className="field col">
                                    <label htmlFor="obs">Obs</label>
                                    <InputText id="obs" value={product.Pessoa_Obs} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'Pessoa_Obs')} />
                                </div>

                                <div className="field col">
                                    <label htmlFor="responsável">Responsável</label>
                                    <InputText id="responsável" value={product.responsável} onKeyUp={handleEnter} onChange={(e) => onInputChange(e, 'responsável')} />
                                </div>
                            </div>

                        </form>

                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && (
                                <span>
                                    Tem certeza de que quer deletar o cadastro de <b>{product.Pessoa_NomeRazaoSocial}</b>?
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
