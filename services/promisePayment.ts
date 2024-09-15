import auth from "@/src/constants/auth";

export default async function promisePayment() {
    const authUser = await auth();

    const formdata = new FormData();
    formdata.append("cpfcnpj", authUser.cpfcnpj);
    formdata.append("senha", "123456");
    formdata.append("contrato", authUser.contrato);

    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    try {
        return fetch("https://sgptins.redeconexaonet.com/api/central/promessapagamento", requestOptions).then((response) => response.json())

    } catch (error) {
        console.log(error)
    }
}