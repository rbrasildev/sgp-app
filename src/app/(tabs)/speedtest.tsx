import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';

export default function SpeedTeste() {
    return (
        <WebView
            className='flex-1'
            source={{ uri: 'https://fast.com/pt/' }}
        />
    );
}

