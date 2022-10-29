import React from 'react'
import { Portal, Modal, Button } from 'react-native-paper'
import Terms from '../about/Terms';

export default function Termsandconditions({ visible, hideModal }) {
    const containerStyle = { backgroundColor: 'white', padding: 20, flex: 1 };
    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Terms />
                <Button mode='text' onPress={hideModal} >Agree</Button>
            </Modal>
        </Portal>
    )
}