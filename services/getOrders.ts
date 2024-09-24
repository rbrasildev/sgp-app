import auth from "@/src/constants/auth";

export default async function getOrders() {
    try {
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

        return fetch(
            "https://sgptins.redeconexaonet.com/api/central/chamado/list/",
            requestOptions,
        ).then((response) => response.json());
    } catch (error) {
        console.log(error);
    }
}
