import auth from "@/src/constants/auth";

export default async function extrauso(date: Date) {
	try {
		const dataAuth = await auth();

		const formdata = new FormData();
		formdata.append("cpfcnpj", dataAuth.cpfcnpj);
		formdata.append("senha", "123456");
		formdata.append("contrato", dataAuth.contrato);
		formdata.append("ano", String(date.getFullYear()));
		formdata.append("mes", String(date.getMonth()));

		const requestOptions = {
			method: "POST",
			body: formdata,
			redirect: "follow",
		};

		return fetch(
			"https://sgptins.redeconexaonet.com/api/central/extratouso",
			requestOptions,
		).then((response) => response.json());
	} catch (error) {
		console.log(error);
	}
}
