/**
 * Created by TinySymphony on 2017-01-03.
 */

import React from 'react';
import { View, Text, Image, TouchableHighlight} from 'react-native';
import { useSelector } from 'react-redux';
import styles from './style'

function LabelSelect(props: any) {
    const addIcon = {uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA7ElEQVRYR+2X0QnCQAyG87cLuIF1EusEOoq+NPTJ+lSuLzqKTmDdRDdwgbvISRVEhGuVFiGBe8td/nyB+wlo4MDA9amzgLIskyiKjr4B59wsz/Nzl2Y6CzDGLAFsfVERWTHzrm8BBYB1I2DDzIUKUAJKQAn8NwH/t8dxPAcwCulERFIi8sdHDaAOvHe11h4e3vH0gqqqvJmMQx75NkdEzsw88e8MIoCILlmWJS8CGntdEFHQCAB4/NOGxklEgkZARFfn3P5tBG2xGmPUDZWAElACSmDYxaSx7/v/b61Ne1/N2nrHp/zOu+GvBNwAa6vsIVXzFTsAAAAASUVORK5CYII='}
    const words = useSelector((state:any) => state.words.data)
    const openModal = () => {

    }
    return (
        <View style={[styles.selectedView, props.style]}>
          {words.map((word:any)=>(<WordLabel key={word.title}  enable>{word.title}</WordLabel>))}

            {props.enable && !props.readOnly && props.enableAddBtn &&
                <TouchableHighlight
                    style={[styles.selectedItem, styles.addItem]}
                    underlayColor="transparent"
                    onPress={openModal}
                    >
                    <Image
                        style={styles.addIcon}
                        source={addIcon}
                        resizeMode="cover"
                    />
                </TouchableHighlight>
            }
        </View>
    );
}

function WordLabel(props:any) {
    const closeIcon = {uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABnElEQVRYR8WXy1HDMBCG/734Sjoh6QAqgBKgg/gij29wtC4uAegAKoASXEJKCFfPeMTIYxn5IVmvTHJM4v0+rbS7MuHKH7oyH6NAXde7tm3fpBARvTLGmpRynPM9gD4+gGcVfxTgnH8CeBj+cAZwn0pigH8D2A3xG8bYoV+sWuVMQH6dRGIFLmN/McYe5wJ7IcQPEd1oqY+SWIMLIX6J6G6xBRIqH0gl4QKfZEDbimgJV/iqQGwmfOBGgVAJX7hVwFciBL4p4CoRCncS2JIYDq/eZDAvNVtHdZ4FlhKV8VWH84I7Z2CjRMcF+qxcPeScgS2JELh3BtR5ADDZ85gB5pUBw2DRz5j37HAWMJVan8aIAeYkYKtzKRAzwDYFXJpMzBS1CrjAY6eoUcAHHiOxKhACD5VYCMTAQyQmAingvhL6rVje24On2trEM1VH13WHsixPk1ZcVVVDRLcqUGhvn4sYJJbXcl0gFdy0HUKIj6IoniYZGEzfiUj282OqtyJdAsCLEOKcZdkxz3PJ+X8zst1aLvnbZiu+JFzG/gPiB7Awgm9hrgAAAABJRU5ErkJggg=='};

    return (
        <View style={[styles.selectedItem, !props.enable && styles.disableColor]}>
            <Text style={[styles.labelText, !props.enable && styles.disableText || {}]}
                numberOfLines={1} >
                    {props.children}
            </Text>
            {props.enable && !props.readOnly && <TouchableHighlight
                style={styles.closeContainer}
                underlayColor="transparent"
                activeOpacity={0.5}
                onPress={props.onCancel}>
                <View>
                    <Image
                        style={styles.closeIcon}
                        source={closeIcon}
                        resizeMode="cover" />
                </View>
            </TouchableHighlight>
            }
        </View>
    );
}

export default LabelSelect;
