/**
 * Created by TinySymphony on 2017-01-03.
 */


import React, { useState } from 'react';
import { View, Text, Image, Modal, ScrollView, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
const window = Dimensions.get('window');
import styles from './style'
import PModal from '../PModal';
import { Avatar, Icon, Autocomplete } from '@ui-kitten/components';


function SelectLanguages(props: any) {
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
                <Label key={item.code} data={item} onCancel={() => { props.onCancelItem }}>

                    

                </Label>
            ))}
            {!props.readOnly && <TouchableHighlight
                style={[ styles.addItem]}
                underlayColor="transparent"
                onPress={() => setIsModalVisible(true)}>
                <Image
                    style={styles.addIcon}

                    source={addIcon}
                    resizeMode="contain"
                />
                {/* <Icon 
                {...props}
                    name='star'
                /> */}
            </TouchableHighlight>}
            {!props.readOnly && <PModal
                onCancel={() => setIsModalVisible(false)}
                isVisible={isModalVisible}
                title={props.title}
                onConfirm={() => {
                    setIsModalVisible(false)
                    props.onConfirm(tempSelected);
                    tempSelected = [];
                }}>
                <View style={styles.scrollView}>
                    <ScrollView>
                        {props.options.map((language: any) => (<ModalItem key={language.code}
                            isSelected={language.isSelected} data={language} toggleSelect={toggleSelect} >
                            {language.title}</ModalItem>))}
                    </ScrollView>
                </View>
            </PModal>}
        </View>
    );
}

function Label(props: any) {
    const closeIcon = { uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABnElEQVRYR8WXy1HDMBCG/734Sjoh6QAqgBKgg/gij29wtC4uAegAKoASXEJKCFfPeMTIYxn5IVmvTHJM4v0+rbS7MuHKH7oyH6NAXde7tm3fpBARvTLGmpRynPM9gD4+gGcVfxTgnH8CeBj+cAZwn0pigH8D2A3xG8bYoV+sWuVMQH6dRGIFLmN/McYe5wJ7IcQPEd1oqY+SWIMLIX6J6G6xBRIqH0gl4QKfZEDbimgJV/iqQGwmfOBGgVAJX7hVwFciBL4p4CoRCncS2JIYDq/eZDAvNVtHdZ4FlhKV8VWH84I7Z2CjRMcF+qxcPeScgS2JELh3BtR5ADDZ85gB5pUBw2DRz5j37HAWMJVan8aIAeYkYKtzKRAzwDYFXJpMzBS1CrjAY6eoUcAHHiOxKhACD5VYCMTAQyQmAingvhL6rVje24On2trEM1VH13WHsixPk1ZcVVVDRLcqUGhvn4sYJJbXcl0gFdy0HUKIj6IoniYZGEzfiUj282OqtyJdAsCLEOKcZdkxz3PJ+X8zst1aLvnbZiu+JFzG/gPiB7Awgm9hrgAAAABJRU5ErkJggg==' };
    return (
        <View style={[ styles.itemWrapper]}>
            <Image style={[styles.avater]} source={{ uri: props.data.flag }} />
                    
            <Text style={[styles.item, !props.enable && styles.disableText || {}]}
                numberOfLines={1} >
                {props.data.title}
            </Text>
            {!props.readOnly && <TouchableHighlight
                style={styles.closeContainer}
                underlayColor="transparent"
                activeOpacity={0.5}
                onPress={() => { props.onCancel(props.data) }}>
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

export default SelectLanguages;

