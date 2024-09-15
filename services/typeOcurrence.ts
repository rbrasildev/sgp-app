import auth from "@/src/constants/auth";

export default async function typeOcurrence() {
    const dataAuth = await auth();

    const formdata = new FormData();
    formdata.append("cpfcnpj", dataAuth.cpfcnpj);
    formdata.append("senha", "123456");
    formdata.append("contrato", dataAuth.contrato);

    const requestOptions: {} = {
        method: "POST",
        body: formdata,
        redirect: "follow",
    };
    try {

        return fetch(
            "https://sgptins.redeconexaonet.com/api/central/tipoocorrencia/list/",
            requestOptions,
        ).then((response) => response.json());
    } catch (error) {
        console.log(error);
    }
}
