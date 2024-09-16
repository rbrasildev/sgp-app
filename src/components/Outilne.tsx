import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const OutlinedInput = ({ label }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState('');

    return (
        <View style={[styles.container, isFocused || value ? styles.focused : styles.default]}>
            <Text style={[styles.label, (isFocused || value) && styles.labelFocused]}>
                {label}
            </Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={setValue}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginVertical: 20,
        position: 'relative',
        borderColor: '#aaa',
    },
    focused: {
        borderColor: '#007bff', // Cor da borda quando focado
    },
    default: {
        borderColor: '#aaa', // Cor da borda quando não focado
    },
    label: {
        position: 'absolute',
        backgroundColor: '#0f172a',
        left: 10,
        top: 10,
        paddingHorizontal: 5,
        color: '#aaa',
        fontSize: 16,
    },
    labelFocused: {
        top: -10,
        left: 10,
        fontSize: 12,
        color: '#007bff',
    },
    input: {
        height: 40,
        fontSize: 16,
        color:'#fff'
    },
});

export default OutlinedInput;
