import auth from "@/src/constants/auth";

export async function getInvoices() {

    const dataAuth = await auth();
    var formdata = new FormData();
    formdata.append("cpfcnpj", dataAuth.cpfcnpj);
    formdata.append("senha", '123456');
    formdata.append("contrato", dataAuth.contrato);

    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };
    try {


        return fetch("https://sgptins.redeconexaonet.com/api/central/titulos", requestOptions).then((response) => response.json())

    } catch (error) {

    }
}