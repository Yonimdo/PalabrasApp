/**
 * Created by TinySymphony on 2017-01-03.
 */


import React, {  useState } from 'react';
import { View, Text, Image, Modal, ScrollView, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
const window = Dimensions.get('window');
const { width, height, scale } = window;


function SelectOptions(props: any) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const addIcon = { uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA7ElEQVRYR+2X0QnCQAyG87cLuIF1EusEOoq+NPTJ+lSuLzqKTmDdRDdwgbvISRVEhGuVFiGBe8td/nyB+wlo4MDA9amzgLIskyiKjr4B59wsz/Nzl2Y6CzDGLAFsfVERWTHzrm8BBYB1I2DDzIUKUAJKQAn8NwH/t8dxPAcwCulERFIi8sdHDaAOvHe11h4e3vH0gqqqvJmMQx75NkdEzsw88e8MIoCILlmWJS8CGntdEFHQCAB4/NOGxklEgkZARFfn3P5tBG2xGmPUDZWAElACSmDYxaSx7/v/b61Ne1/N2nrHp/zOu+GvBNwAa6vsIVXzFTsAAAAASUVORK5CYII=' }

    let tempSelected: Array<any> = []

    props.options.map((option: any) => {
        option.isSelected = props.selectedOptions.includes(option);
    });
    const toggleSelect = (data: any) => {
        // if(tempSelected.includes(data))
        if (data.isSelected) {
            tempSelected.filter(d => { data.code == d.code })
        } else {
            tempSelected.push(data);
        };
    }
    return (
        <View style={[styles.selectedView]}>
            {props.selectedOptions.map((item: any) => (
                <Label key={item.code} data={item} onCancel={()=>{props.onCancelItem}}>{item.title} </Label>
            ))}

            {!props.readOnly &&<TouchableHighlight
                style={[styles.selectedItem, styles.addItem]}
                underlayColor="transparent"
                onPress={() => setIsModalVisible(true)}>
                <Image
                    style={styles.addIcon}
                    source={addIcon}
                    resizeMode="cover"
                />
            </TouchableHighlight>}
            {!props.readOnly && <Modal
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => { }}>
                <View style={{ flex: 1 }}>
                    <TouchableHighlight
                        style={styles.modalMask}
                        activeOpacity={1}
                        underlayColor="#00000077"
                        onPress={() => setIsModalVisible(false)}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modal}>
                                <View style={styles.title}><Text style={styles.titleText}>{props.title}</Text></View>
                                <View style={styles.scrollView}>
                                    <ScrollView>
                                        {props.options.map((language: any) => (<ModalItem key={language.code}
                                            isSelected={language.isSelected} data={language} toggleSelect={toggleSelect} >
                                            {language.title}</ModalItem>))}
                                    </ScrollView>
                                </View>
                                <View style={[styles.buttonView]}>
                                    <TouchableHighlight
                                        underlayColor="transparent"
                                        activeOpacity={0.8}
                                        onPress={() => setIsModalVisible(false)}>
                                        <View style={[styles.modalButton, props.cancelButton || {}]}>
                                            <Text style={[styles.buttonText, props.cancelText || {}]}>Cancel</Text>
                                        </View>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        underlayColor="transparent"
                                        activeOpacity={0.8}
                                        onPress={() => {
                                            setIsModalVisible(false)
                                            props.onConfirm(tempSelected);
                                            tempSelected = [];
                                        }}>
                                        <View style={[styles.modalButton, styles.confirmButton, props.confirmButton || {}]}>
                                            <Text style={[styles.buttonText, props.confirmText || {}]}>Confirm</Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
            </Modal>}
        </View>
    );
}

function Label(props: any) {
    const closeIcon = { uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABnElEQVRYR8WXy1HDMBCG/734Sjoh6QAqgBKgg/gij29wtC4uAegAKoASXEJKCFfPeMTIYxn5IVmvTHJM4v0+rbS7MuHKH7oyH6NAXde7tm3fpBARvTLGmpRynPM9gD4+gGcVfxTgnH8CeBj+cAZwn0pigH8D2A3xG8bYoV+sWuVMQH6dRGIFLmN/McYe5wJ7IcQPEd1oqY+SWIMLIX6J6G6xBRIqH0gl4QKfZEDbimgJV/iqQGwmfOBGgVAJX7hVwFciBL4p4CoRCncS2JIYDq/eZDAvNVtHdZ4FlhKV8VWH84I7Z2CjRMcF+qxcPeScgS2JELh3BtR5ADDZ85gB5pUBw2DRz5j37HAWMJVan8aIAeYkYKtzKRAzwDYFXJpMzBS1CrjAY6eoUcAHHiOxKhACD5VYCMTAQyQmAingvhL6rVje24On2trEM1VH13WHsixPk1ZcVVVDRLcqUGhvn4sYJJbXcl0gFdy0HUKIj6IoniYZGEzfiUj282OqtyJdAsCLEOKcZdkxz3PJ+X8zst1aLvnbZiu+JFzG/gPiB7Awgm9hrgAAAABJRU5ErkJggg==' };
    return (
        <View style={[styles.selectedItem, !props.enable && styles.disableColor]}>
            <Text style={[styles.labelText, !props.enable && styles.disableText || {}]}
                numberOfLines={1} >
                    {props.children}
            </Text>
            {!props.readOnly && <TouchableHighlight
                style={styles.closeContainer}
                underlayColor="transparent"
                activeOpacity={0.5}
                onPress={()=>{props.onCancel(props.data)}}>
                <View>
                    <Image
                        style={styles.closeIcon}
                        source={closeIcon}
                        resizeMode="cover" />
                </View>
            </TouchableHighlight>}
        </View>
    );
}

function ModalItem(props: any) {
    const [isSelected, setIsSelected] = useState(props.isSelected);
    return (
        <TouchableHighlight
            activeOpacity={0.5}
            underlayColor="transparent"
            onPress={() => {
                setIsSelected(!isSelected);
                props.toggleSelect(props.data);
            }}>
            <View style={styles.modalItem}>
                <Text
                    style={[styles.modalText]}
                    numberOfLines={1}>
                    {props.children}
                </Text>
                <View style={[styles.outerCircle, isSelected ? styles.enableCircle : {}]}>
                    {isSelected && <View style={[styles.innerCircle]} />}
                </View>
            </View>
        </TouchableHighlight>
    );
}

export default SelectOptions;

const Color = {
    disableColor: '#eaeaea',
    main: '#40cca2'
};

const IMG = {
    closeIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABnElEQVRYR8WXy1HDMBCG/734Sjoh6QAqgBKgg/gij29wtC4uAegAKoASXEJKCFfPeMTIYxn5IVmvTHJM4v0+rbS7MuHKH7oyH6NAXde7tm3fpBARvTLGmpRynPM9gD4+gGcVfxTgnH8CeBj+cAZwn0pigH8D2A3xG8bYoV+sWuVMQH6dRGIFLmN/McYe5wJ7IcQPEd1oqY+SWIMLIX6J6G6xBRIqH0gl4QKfZEDbimgJV/iqQGwmfOBGgVAJX7hVwFciBL4p4CoRCncS2JIYDq/eZDAvNVtHdZ4FlhKV8VWH84I7Z2CjRMcF+qxcPeScgS2JELh3BtR5ADDZ85gB5pUBw2DRz5j37HAWMJVan8aIAeYkYKtzKRAzwDYFXJpMzBS1CrjAY6eoUcAHHiOxKhACD5VYCMTAQyQmAingvhL6rVje24On2trEM1VH13WHsixPk1ZcVVVDRLcqUGhvn4sYJJbXcl0gFdy0HUKIj6IoniYZGEzfiUj282OqtyJdAsCLEOKcZdkxz3PJ+X8zst1aLvnbZiu+JFzG/gPiB7Awgm9hrgAAAABJRU5ErkJggg==',
    addIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA7ElEQVRYR+2X0QnCQAyG87cLuIF1EusEOoq+NPTJ+lSuLzqKTmDdRDdwgbvISRVEhGuVFiGBe8td/nyB+wlo4MDA9amzgLIskyiKjr4B59wsz/Nzl2Y6CzDGLAFsfVERWTHzrm8BBYB1I2DDzIUKUAJKQAn8NwH/t8dxPAcwCulERFIi8sdHDaAOvHe11h4e3vH0gqqqvJmMQx75NkdEzsw88e8MIoCILlmWJS8CGntdEFHQCAB4/NOGxklEgkZARFfn3P5tBG2xGmPUDZWAElACSmDYxaSx7/v/b61Ne1/N2nrHp/zOu+GvBNwAa6vsIVXzFTsAAAAASUVORK5CYII='
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