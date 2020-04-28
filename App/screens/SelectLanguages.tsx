import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SelectOptions from '../components/SelectOptions'
import { useSelector, useDispatch } from 'react-redux';
import { Actions } from '../store/actions';
export default function SelectLanguages(props: any) {

  const [selectedLanguages, setSelectedLanguages] = useState([])
  const languages = useSelector((state: any) => state.languages)
  const dispatch = useDispatch();
  if (languages.data.length == 0) {
    dispatch(Actions.executeGetAvailableLanguages())
  }
  debugger
  return (
    <View style={styles.container}>
      <SelectOptions
        title="Add Languages"
        readOnly={true}
        onCancelItem={()=>{}}
        onConfirm={(list: any) => { 
          debugger;
          setSelectedLanguages(list)
         }}
        selectedOptions={selectedLanguages}
        options={languages.data} />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
