import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetTextInput, BottomSheetHandleProps } from '@gorhom/bottom-sheet';

interface FaturaProps extends BottomSheetHandleProps {
    fatura: [];
}

const BottomSheets = ({ fatura, ...rest }: FaturaProps) => {
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    // renders
    return (
        <View style={styles.container}>
            <BottomSheet
                {...rest}
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
                keyboardBehavior="fillParent"
                onChange={handleSheetChanges}
            >
                <BottomSheetTextInput style={styles.input} />
                <View style={styles.contentContainer}>
                    <Text>Awesome 🎉</Text>
                </View>
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    input: {
        marginTop: 8,
        marginBottom: 10,
        borderRadius: 10,
        fontSize: 16,
        lineHeight: 20,
        padding: 8,
        backgroundColor: 'rgba(151, 151, 151, 0.25)',
    },
});

export default BottomSheets;