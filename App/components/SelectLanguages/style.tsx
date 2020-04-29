import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '~/styles'
const { width, height, scale } = Dimensions.get("window");


export default StyleSheet.create({
  selectedView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  itemWrapper:{
    borderWidth:1/scale,
    flexDirection: 'row',
    width:150,
    borderColor:'#2d2d2d2d',
    alignItems:'center',
    backgroundColor:'#fff'
  },
  item:{
  flex:1,
  margin:4
  },
  avater:{
    height:24,
    width:44

  },
  autocomplete: {
    width: 120,
    height:24,
  },
  addItem: {
    padding: 7
  },
  labelText: {
    fontSize: 14,
    maxWidth: 300
  },
  closeContainer: {
    padding: 8,
    borderLeftWidth: 2 / scale,
    borderLeftColor: '#c8c8c8'
  },
  scrollView: {
    flex:1
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
    borderColor: Colors.main
  },
  innerCircle: {
    backgroundColor: Colors.main,
    width: 16,
    height: 16,
    borderRadius: 8,
    overflow: 'hidden'
  },
  closeIcon: {
    width: 10,
    height: 10
  },
  addIcon: {
    width: 14,
    height: 24,
    color:'#fff'
  },
  disableText: {
    color: '#999'
  }
});