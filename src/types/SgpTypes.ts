export interface FaturaProps {
    codigopix: string;
    data_pagamento: Date;
    gerapix: boolean;
    id: number;
    idtransacao: number;
    linhadigitavel: string;
    link: string;
    link_completo: string;
    numero_documento: number;
    pagarcartao: boolean;
    pagarcartaocheckout: string;
    pagarcartaodebito: boolean;
    recibo: string;
    status: string;
    statusid: number;
    valor: number;
    valorcorrigido: number;
    vencimento: Date;
    vencimento_atualizado: Date;
    codigo: string;
    title: string;
}
