
const api = async (cpfcnpj: string, senha: string) => {
    try {
        const formdata = new FormData();
        formdata.append("cpfcnpj", cpfcnpj);
        formdata.append("senha", senha);

        const requestOptions: {} = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        return fetch("https://sgptins.redeconexaonet.com/api/central/contratos", requestOptions).then((response) => response.json())
    } catch (error) {
        console.log(error)
    }


}

export default api;
