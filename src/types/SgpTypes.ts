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
export interface ContratoProps {
	contrato: number;
	razaosocial: string;
	planointernet: string;
	cpfcnpj: string;
}
export interface ExtratoProps {
	ano: string;
	list: [];
	mes: string;
	plano: string;
	login: string;
	total: number;
}

export interface ConsumptionProps {
	list: []
	dataini: Date
	datafim?: Date
	download: number
	upload: number
	total: number;
}
