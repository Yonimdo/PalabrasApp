import { StyleSheet, Dimensions } from 'react-native';
import {Colors} from '~/styles'
const { width, height, scale } = Dimensions.get("window");


export default StyleSheet.create({
  modalMask: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00000077'
  },
  modalContainer: {},
  modal: {
      height: height * 0.8,
      width: width * 0.8,
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
      marginTop:8,
      marginBottom:8,
      fontWeight:'bold'
  },
  buttonView: {
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      
      flexDirection: 'row',
      justifyContent: 'space-around'
  },
  modalButton: {
      height: 58,
      width: width * 0.4,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.main
  },
  buttonText: {
      color: '#fff',
      fontSize: 16
  },
  confirmButton: {
      borderLeftWidth: 2 / scale,
      borderLeftColor: '#fff'
  },
  disableText: {
      color: '#999'
  }
});