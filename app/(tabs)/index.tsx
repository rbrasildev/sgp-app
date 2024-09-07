import { ActivityIndicator, Button, Image, StyleSheet, Text, View } from 'react-native';

import { useEffect, useState } from 'react';
import auth from '@/constants/auth';
import api from '@/services/api';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import Load from '@/components/Load';


type ContratoProps = {
  razaosocial: string;
  contrato: number;
  cpfcnpj: string;
  planointernet: string;
  vencimento: string;
  planointernet_valor: string;
}

export default function HomeScreen() {
  const [data, setData] = useState<ContratoProps>([])
  const [isLoading, setIsloading] = useState(false)

  const handleContrato = async () => {
    try {
      setIsloading(true)
      const response = await auth();
      const data = await api(response.cpfcnpj, '123456')
      const filtered = data.contratos.filter((item: ContratoProps) => item.contrato == response.contrato)
      setData(filtered[0])

    } catch (error) {
      console.log(error)
    } finally {
      setIsloading(false)
    }

  }
  useEffect(() => {
    handleContrato();
  }, [])

  if (isLoading) {
    return <Load color={'orange'} size={32} />
  }


  return (
    <SafeAreaView style={styles.container}>
      <View className="bg-dark-500" style={{ gap: 4 }}>
        <Animatable.View animation={'slideInLeft'} style={styles.profile}>
          <Text className="text-red-500">Contrato : {data.razaosocial}</Text>
          <Text className='text-red-300'>Contrato : {data.contrato}</Text>
          <Text>Plano Atual: {data.planointernet} - {data.planointernet_valor}</Text>
          <Text>Vencimento todo dia {data.vencimento}</Text>
        </Animatable.View>


        <Button title='Login' onPress={() => router.push('/login')} />
      </View>


    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,

  },
  profile: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
