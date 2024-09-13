import { getVerifyAccess } from "@/services/getVerifyAccess"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { Text, View } from "react-native"

interface WifiProps {
    msg: string
    status: number
}

const WifiStatus = () => {
    const [wifiStatus, setWifiStatus] = useState<WifiProps>([])

    const handleWifiStatus = async () => {
        try {
            const response = await getVerifyAccess();
            setWifiStatus(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleWifiStatus();
    }, [])

    return (
        <View className='flex-row items-center rounded-2xl bg-white shadow-lg p-4 gap-2 w-1/2'>
            {wifiStatus.status == 1 ? (
                <>
                    <MaterialCommunityIcons color={'green'} size={38} name='wifi-check' />
                    <View>
                        <Text>Wifi</Text>
                        <Text className='font-medium text-lg'>Conectado</Text>
                    </View>

                </>
            ) : (
                <>
                    <MaterialCommunityIcons color={'red'} size={38} name='wifi-off' />
                    <View>
                        <Text>Wifi</Text>
                        <Text className='font-medium text-lg'>Desconectado</Text>
                    </View>

                </>
            )}
        </View>
    )
}

export default WifiStatus