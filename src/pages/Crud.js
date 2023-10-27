import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import ProductService from '../service/ProductService';

const CrudDemo = () => {
    let emptyProduct = {
        id: null,
        code: '',
        name: '',
        cpf: null,
        endereço: '',
        número: '',
        complemento: '',
        bairro: '',
        cep: '',
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
        dataCadastro: ''
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        const productService = new ProductService();
        productService.getProducts().then((data) => setProducts(data));
    }, []);


    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
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
                _product.cpf = '000.000.000-00';
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
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
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
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _product = { ...product };
        _product['category'] = e.value;
        setProduct(_product);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    };

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

    const priceBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Price</span>
                {rowData.endereço}
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
                <span>{rowData.bairro}</span>
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
                <span className="p-column-title">Nascimento</span>
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteProduct(rowData)} />
            </div>
        );
    };

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
                        <Column field="code" header="Código" sortable body={codeBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="name" header="Nome" sortable body={nameBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field='cpf' header="CPF" body={imageBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="endereço" header="Endereço" body={priceBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '8rem' }}></Column>
                        <Column field="número" header="Número" sortable body={categoryBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="bairro" header="Bairro" body={ratingBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="complemento" header="Complemento" body={statusBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
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
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={productDialog} style={{ width: '450px' }} header="Dados cadastrais" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        {product.image && <img src={`assets/demo/images/product/${product.image}`} alt={product.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
                        <div className="field">
                            <label htmlFor="name">Nome</label>
                            <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                            {submitted && !product.name && <small className="p-invalid">Nome é obrigatório.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="name">CPF</label>
                            <InputText id="name" value={product.cpf} onChange={(e) => onInputChange(e, 'cpf')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                            {submitted && !product.cpf && <small className="p-invalid">CPF é obrigatório</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="name">Endereço</label>
                            <InputText id="name" value={product.endereço} onChange={(e) => onInputChange(e, 'endereço')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                            {submitted && !product.endereço && <small className="p-invalid">Endereço é obrigatório</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="name">Número</label>
                            <InputText id="name" value={product.número} onChange={(e) => onInputChange(e, 'número')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                            {submitted && !product.número && <small className="p-invalid">Número é obrigatório</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="name">Bairro</label>
                            <InputText id="name" value={product.bairro} onChange={(e) => onInputChange(e, 'bairro')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                            {submitted && !product.bairro && <small className="p-invalid">Bairro é obrigatório</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="name">Complemento</label>
                            <InputText id="name" value={product.complemento} onChange={(e) => onInputChange(e, 'endereço')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                            {submitted && !product.complemento && <small className="p-invalid">Complemento é obrigatório</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="name">CEP</label>
                            <InputText id="name" value={product.cep} onChange={(e) => onInputChange(e, 'endereço')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                            {submitted && !product.cep && <small className="p-invalid">CEP é obrigatório</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="name">Cidade</label>
                            <InputText id="name" value={product.cidade} onChange={(e) => onInputChange(e, 'endereço')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                            {submitted && !product.cidade && <small className="p-invalid">Cidade é obrigatório</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="name">Nascimento</label>
                            <InputText id="name" value={product.nascimento} onChange={(e) => onInputChange(e, 'endereço')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                            {submitted && !product.nascimento && <small className="p-invalid">Nascimento é obrigatório</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="name">Tel1</label>
                            <InputText id="name" value={product.tel1} onChange={(e) => onInputChange(e, 'endereço')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                            {submitted && !product.tel2 && <small className="p-invalid">Tel1 é obrigatório</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="name">Tel2</label>
                            <InputText id="name" value={product.tel2} onChange={(e) => onInputChange(e, 'endereço')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                            {submitted && !product.tel2 && <small className="p-invalid">Tel2 é obrigatório</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="name">Tel3</label>
                            <InputText id="name" value={product.tel3} onChange={(e) => onInputChange(e, 'endereço')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                            {submitted && !product.tel3 && <small className="p-invalid">Tel3 é obrigatório</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="name">Email</label>
                            <InputText id="name" value={product.email} onChange={(e) => onInputChange(e, 'endereço')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                            {submitted && !product.email && <small className="p-invalid">Email é obrigatório</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="name">Responsável</label>
                            <InputText id="name" value={product.responsável} onChange={(e) => onInputChange(e, 'endereço')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                            {submitted && !product.responsável && <small className="p-invalid">Responsável é obrigatório</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="name">Rede Social</label>
                            <InputText id="name" value={product.social} onChange={(e) => onInputChange(e, 'endereço')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                            {submitted && !product.social && <small className="p-invalid">Rede social é obrigatório</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="name">Como</label>
                            <InputText id="name" value={product.como} onChange={(e) => onInputChange(e, 'endereço')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                            {submitted && !product.como && <small className="p-invalid">Como é obrigatório</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="name">Obs</label>
                            <InputText id="name" value={product.obs} onChange={(e) => onInputChange(e, 'endereço')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                            {submitted && !product.obs && <small className="p-invalid">Rede social é obrigatório</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="name">Data de cadastro</label>
                            <InputText id="name" value={product.dataCadastro} onChange={(e) => onInputChange(e, 'endereço')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                            {submitted && !product.dataCadastro && <small className="p-invalid">Data de cadastro é obrigatório</small>}
                        </div>

                        {/* <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="price">Price</label>
                                <InputNumber id="price" value={product.endereço} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                            </div>
                            <div className="field col">
                                <label htmlFor="quantity">Quantity</label>
                                <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly />
                            </div>
                        </div> */}
                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && (
                                <span>
                                    Are you sure you want to delete <b>{product.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && <span>Are you sure you want to delete the selected products?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default CrudDemo;
