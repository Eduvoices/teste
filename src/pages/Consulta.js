import React from 'react';
import { Button } from 'primereact/button';
import { InputMask } from 'primereact/inputmask';
import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

const Consulta = () => {
    const [formValue, setFormValue] = useState('')

    function Input() {
        if (formValue.name === 'CPF') {
            return (
                <InputMask mask='999.999.999-99' placeholder='CPF' id='info' className='input' style={{width:'360px'}}/>
            )
        } else if (formValue.name === 'Data') {
            return (
                <InputMask mask='99/99/9999' id='info' placeholder='Data' className='input' style={{width:'360px'}}/>
            )
        } else {
            return (
                <InputText className='input' id='info' placeholder='Nome' style={{width:'360px'}}/>
            )
        }
    }

    const handleInputChange = (e) => {
        e.preventDefault()
        const {value} = e.target
        setFormValue(value)
    }
    const dropdownValues = [
        { name: 'CPF' },
        { name: 'Data' },
        { name: 'Nome' }
    ]

    return (
        <div className="grid timeline-demo">
            <div className="col-12">
                <div className="card">
                    <h3>Consulta</h3>
                    <div className="formgroup-inline" style={{display:'flex', justifyContent:'center'}}>
                        <div className="field">
                            <label htmlFor="info" className="p-sr-only">
                                Informação de busca
                            </label>
                            <Input />
                        </div>
                        <div className="field">
                            <label htmlFor="lastname1" className="p-sr-only">
                                Tipo de busca
                            </label>
                            <Dropdown style={{width:'160px', textAlign:'center'}} value={formValue} onChange={handleInputChange} options={dropdownValues} optionLabel="name" placeholder="Tipo" />
                        </div>
                        <Button style={{width:'48px'}}><i className="pi pi-search"/></Button>
                    </div>

                    <div className='tableOverflow' style={{overflowX:'scroll'}}>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>Código</th>
                                                <th>Nome</th>
                                                <th>CPF</th>
                                                <th>Endereço</th>
                                                <th>Nº</th>
                                                <th>Bairro</th>
                                                <th>Complemento</th>
                                                <th>CEP</th>
                                                <th>Cidade</th>
                                                <th>Data de nascimento</th>
                                                <th>Telefone 1</th>
                                                <th>Telefone 2</th>
                                                <th>Telefone 3</th>
                                                <th>E-mail</th>
                                                <th>Responsável</th>
                                                <th>Rede social</th>
                                                <th>Como?</th>
                                                <th>Obs</th>
                                                <th>Data de cadastro</th>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <div>
                                                        1072
                                                        <div className='dropdown'>
                                                            <i className='pi pi-ellipsis-h'  alt="Mais opções" />
                                                            <div className='dropdownContent'>
                                                                <div>
                                                                <i className='pi pi-plus'  alt="" />
                                                                    <p style={{marginLeft:'8px'}}>Inserir</p>
                                                                </div>

                                                                <div>
                                                                <i className='pi pi-pencil'  alt="" />
                                                                    <p style={{marginLeft:'8px'}}>Alterar</p>
                                                                </div>

                                                                <div>
                                                                <i className='pi pi-trash'  alt="" />
                                                                <p style={{marginLeft:'8px'}}>Excluir</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                        Priscila Paiva Blasechi
                                                </td>
                                                <td>
                                                        000.000.000-00
                                                </td>
                                                <td>
                                                        Rua Teste do Teste Teste
                                                </td>
                                                <td>
                                                        000
                                                </td>
                                                <td>
                                                        Bairro
                                                </td>
                                                <td>
                                                        Complemento
                                                </td>
                                                <td>
                                                        00000-000
                                                </td>
                                                <td>
                                                        Arapongas
                                                </td>
                                                <td>
                                                        01/01/1010
                                                </td>
                                                <td>
                                                        (99)99999-9999
                                                </td>
                                                <td>
                                                        (99)99999-9999
                                                </td>
                                                <td>
                                                        (99)99999-9999
                                                </td>
                                                <td>
                                                        exemplo@exemplo.com
                                                </td>
                                                <td>
                                                        Nome do Responsável
                                                </td>
                                                <td>
                                                        @exemplo
                                                </td>
                                                <td>
                                                        Complemento
                                                </td>
                                                <td>
                                                        Exemplo
                                                </td>
                                                <td>
                                                        01/01/1010
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Consulta;
