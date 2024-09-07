import { useAsyncStorage } from "@react-native-async-storage/async-storage"

const auth = async () => {
    const { getItem } = useAsyncStorage('@sgp');

    const response = await getItem();

    const data = response ? JSON.parse(response) : {};

    return data;
}

export default auth;