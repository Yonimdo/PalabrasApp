import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window");

export default  StyleSheet.create({
    page: {
      width,
      height:height-150
    },
    subtitle: {
      fontWeight: 'bold',
      marginTop: 30,
  
    },
    hey: {
      top: -100,
      fontWeight: 'bold',
      position: 'absolute'
    },
    name: {
      fontWeight: 'bold'
    },
    locale: {
        opacity: 0.10,
        width: width,
         height: 300,
         top:0,
         left:0, 
        position:"absolute"
    },
    button: {
    },
    select: {
      margin: 8,
      flex: 1,
    },
    container: {
      flex: 1,
      marginTop: 150,
      paddingTop: 80,
      borderTopStartRadius: 64,
      borderTopEndRadius: 64,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
      overflow: 'visible',
  
      elevation: 10,
    },
    avatar: {
      position: 'absolute',
      top: -44,
      zIndex: 1,
      width: 124,
      height: 124
    },
    about: {
      minHeight: 124,
      alignItems: 'flex-start',
      textAlignVertical: 'top'
    },
    backgroundImage: {
      width,
      height,
      backgroundColor: '#B8E1FF'
    },
    autocomplete: {
      width: 192,
      margin: 8,
    },
  });
  