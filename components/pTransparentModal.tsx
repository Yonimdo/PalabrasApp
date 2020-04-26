import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, Modal, ScrollView, TouchableHighlight, Dimensions, StyleSheet } from 'react-native';
const window = Dimensions.get('window');
const { width, height, scale } = window;

class PModal extends React.Component<any, any> {
    selectedList: Array<any> = [];
    
    constructor(props: any) {
        super(props);
        this.selectedList = [];
        this.cancelSelect = this.cancelSelect.bind(this);
        this.confirmSelect = this.confirmSelect.bind(this);
    }

    cancelSelect() {
        this.selectedList = [];
    }
    confirmSelect() {
        const { onConfirm } = this.props;
        onConfirm(this.selectedList);
        this.selectedList = [];
        this.cancelSelect();
    }
    render() {
        return (
        <Modal
            transparent={true}
            visible={!!this.props.isModalVisible}
            onRequestClose={() => { }}>
            <View style={{ flex: 1 }}>
                <TouchableHighlight
                    style={styles.modalMask}
                    activeOpacity={1}
                    underlayColor="#00000077"
                    onPress={this.cancelSelect}>
                    <View style={styles.modalContainer}>
                        <View style={[styles.modal || {}]}>
                            <View style={styles.title}><Text style={styles.titleText}>{this.props.title}</Text></View>
                            <View style={styles.scrollView}>
                                <ScrollView>

                                </ScrollView>
                            </View>
                            <View style={[styles.buttonView || {}]}>
                                <TouchableHighlight
                                    underlayColor="transparent"
                                    activeOpacity={0.8}
                                    onPress={this.cancelSelect}>
                                    <View style={[styles.modalButton || {}]}>
                                        <Text style={[styles.buttonText || {}]}>{this.props.cancelText}</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    underlayColor="transparent"
                                    activeOpacity={0.8}
                                    onPress={this.confirmSelect}>
                                    <View style={[styles.modalButton, styles.confirmButton || {}]}>
                                        <Text style={[styles.buttonText || {}]}>{this.props.confirmText}</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        </Modal>);
    }
}

export default PModal

const Color = {
    disableColor: '#eaeaea',
    main: '#40cca2'
};

const styles = StyleSheet.create({
    selectedView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    selectedItem: {
        margin: 4,
        borderWidth: 2 / scale,
        borderRadius: 6,
        borderColor: '#aaa',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#f6f6f6'
    },
    addItem: {
        padding: 7
    },
    disableColor: {
        backgroundColor: Color.disableColor
    },
    labelText: {
        padding: 6,
        fontSize: 14,
        lineHeight: 14,
        maxWidth: 300
    },
    closeContainer: {
        padding: 8,
        borderLeftWidth: 2 / scale,
        borderLeftColor: '#c8c8c8'
    },
    closeIcon: {
        width: 10,
        height: 10
    },
    addIcon: {
        width: 12,
        height: 12
    },
    modalMask: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000077'
    },
    modalContainer: {},
    modal: {
        height: height * 0.6,
        width: width * 0.6,
        overflow: 'hidden',
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    title: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 2 / scale,
        borderBottomColor: '#bbb'
    },
    titleText: {
        fontSize: 18,
        lineHeight: 20
    },
    scrollView: {
        height: height * 0.6 - 80
    },
    buttonView: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    modalButton: {
        height: 40,
        width: width * 0.3,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.main
    },
    modalItem: {
        height: 50,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 2 / scale,
        borderBottomColor: '#bbb'
    },
    modalText: {
        fontSize: 16,
        width: width * 0.6 - 70
    },
    buttonText: {
        color: '#fff',
        fontSize: 16
    },
    confirmButton: {
        borderLeftWidth: 2 / scale,
        borderLeftColor: '#fff'
    },
    outerCircle: {
        borderWidth: 2 / scale,
        borderColor: '#888',
        width: 20,
        height: 20,
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    enableCircle: {
        borderColor: Color.main
    },
    innerCircle: {
        backgroundColor: Color.main,
        width: 16,
        height: 16,
        borderRadius: 8,
        overflow: 'hidden'
    },
    disableText: {
        color: '#999'
    }
});