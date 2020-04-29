import { StyleSheet, Dimensions } from 'react-native';
import {Colors} from '~/styles'
const { width, height, scale } = Dimensions.get("window");


export default StyleSheet.create({
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
      backgroundColor: Colors.disableColor
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
  disableText: {
    color: '#999'
}
});