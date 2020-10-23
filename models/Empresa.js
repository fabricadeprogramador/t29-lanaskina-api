"use strict";

const {Schema, model} = require("mongoose")

class Empresa extends Schema{
    constructor(){
        super({
            nome:{
                type:String,
                required:true
            },
            cnpj:{
                type:String,
                required:true
            },
            email:{
                type:String,
                required:true
            },
            status:{
                type:Boolean,
                default:true,
            },
            tel:{
                type:Number,
                required:true
            },
            endereco:{
                rua:{
                    type:String,
                    required:true
                },
                numero:{
                    type:Number,
                    required:true
                },
                bairro:{
                    type:String,
                    required:true
                }
            },
            produtos:[
                {
                    nome:{
                        type:String,
                        required:true
                    },
                    descricao:{
                        type:String,
                        required:true
                    },
                    valor:{
                        type:Number,
                        required:true
                    },
                    status:{
                        type:Boolean,
                        default:true
                    },
                }
            ],
            transacoes:[
                {
                    ativo:{
                        type:Boolean,
                        default:true
                    },
                    dataTransacoes:{
                        type: Date,
                        required:true,
                    },
                    valor:{
                        type:Number,
                        required:true
                    },
                    status:{
                        type:String,
                        required:true
                    },
                    produtos:[
                        {
                            nome:{
                                type:String,
                                required:true
                            },
                            valor:{
                                type:Number,
                                required:true
                            }
                        }
                    ],
                    // *********** Verificar com prof, pois acredito que vai puxer pelo id *****
                    // cliente:{
                    //     nome:{
                    //         type:String,
                    //         required: true
                    //     },
                    //     username:{
                    //         type:String,
                    //         required: true
                    //     },
                    //     senha:{
                    //         type:String,
                    //         required: true
                    //     },
                    //     role:{
                    //         type:String,
                    //         required: true
                    //     },
                    //     ativo:{
                    //         type:Boolean,
                    //         default: true
                    //     },
                    // }

                }
            ]
        })
        //Momento do registro do Schema do Mongoose
        model("Empresas", this)
    }
}

module.exports = Empresa;