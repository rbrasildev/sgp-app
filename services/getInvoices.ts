import auth from "@/src/constants/auth";

export async function getInvoices() {

    try {
        const dataAuth = await auth();

        const formdata = new FormData();
        formdata.append("cpfcnpj", dataAuth.cpfcnpj);
        formdata.append("senha", '123456');
        formdata.append("contrato", dataAuth.contrato);

        const requestOptions: {} = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        return fetch("https://sgptins.redeconexaonet.com/api/central/titulos", requestOptions).then((response) => response.json())

    } catch (error) {

    }
}