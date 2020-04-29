/**
 * Created by TinySymphony on 2017-01-03.
 */


import React, { useState } from 'react';
import { View, Modal, TouchableHighlight } from 'react-native';
import styles from './style'
import { Input, Text } from '@ui-kitten/components';


function PModal(props: any) {
    return (
        <Modal
            transparent={true}
            visible={props.isVisible}
            onRequestClose={() => { }}>
            <View style={{ flex: 1 }}>
                <TouchableHighlight
                    style={styles.modalMask}
                    activeOpacity={1}
                    underlayColor="#00000077"
                    onPress={() => props.onCancel()}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modal}>
                            <View style={styles.title}><Text category='h2' style={styles.titleText}>{props.title}</Text></View>
                            {props.children}
                            <View style={[styles.buttonView]}>
                                <TouchableHighlight
                                    underlayColor="transparent"
                                    activeOpacity={0.8}
                                    onPress={() => props.onCancel()}>
                                    <View style={[styles.modalButton, props.cancelButton || {}]}>
                                        <Text style={[styles.buttonText, props.cancelText || {}]}>Cancel</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    underlayColor="transparent"
                                    activeOpacity={0.8}
                                    onPress={() => props.onConfirm()}>
                                    <View style={[styles.modalButton, styles.confirmButton, props.confirmButton || {}]}>
                                        <Text style={[styles.buttonText, props.confirmText || {}]}>Confirm</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        </Modal>
    );
}

export default PModal;

