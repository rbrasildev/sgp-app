import auth from "@/src/constants/auth";


export default async function createTicket(conteudo: string, codigo : number) {


    try {
        const dataAuth = await auth();

        const formdata = new FormData();
        formdata.append("cpfcnpj", dataAuth.cpfcnpj);
        formdata.append("senha", "123456");
        formdata.append("contrato", dataAuth.contrato);
        formdata.append("conteudo", conteudo);
        formdata.append("ocorrenciatipo", codigo);
        formdata.append("os_prioridade", "2");


        const requestOptions: {} = {
            method: "POST",
            body: formdata,
            redirect: "follow",
        };

        return fetch(
            "https://sgptins.redeconexaonet.com/api/central/chamado",
            requestOptions,
        ).then((response) => response.json());
    } catch (error) {
        console.log(error);
    }
}
