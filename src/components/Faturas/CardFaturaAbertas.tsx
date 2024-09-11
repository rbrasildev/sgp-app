import { Text, View } from "react-native";


import { Button } from "../Button";

const CardFaturaAbertas = ({ item }: any) => {
    return (
        <View className='rounded-2xl my-1 p-2 bg-white shadow'>
            <Text className='font-semibold text-gray-500 text-xl'>
                Fatura de {new Date(item.vencimento).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' })}
            </Text>
            <View className='flex-row justify-between my-2 px-2 gap-3'>
                <Text className='font-bold text-3xl'>
                    {item.valorcorrigido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                    }
                </Text>
                {new Date(item.vencimento) < new Date() && (
                    <View className='bg-red-50 items-center border border-red-400 justify-center px-4 rounded-xl'>
                        <Text className='font-semibold text-red-400'>Atrasado</Text>
                    </View>
                )}
            </View>
            <Button className="bg-orange-300 flex-row p-4 rounded-2xl gap-2 justify-center" icon="barcode" title="Pagar" />
        </View>
    )
}

export default CardFaturaAbertas