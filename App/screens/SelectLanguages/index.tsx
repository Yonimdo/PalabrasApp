import React, { useEffect, useState } from 'react';
import {  View,  Image, ScrollView } from 'react-native';
import SelectOptions from '~/components/SelectOptions'
import { useSelector, useDispatch } from 'react-redux';
import { Actions } from '~/store/actions';
import styles from './style'

import { Input, Avatar, Text, Button, Autocomplete , } from '@ui-kitten/components';
import User from '~/store/entites/user';
export default function SelectLanguages(props: any) {
  const [selectedLanguages, setSelectedLanguages] = useState([])
  const languages:{data:Array<Language>} = useSelector((state: any) => state.languages);
  const profile: User = useSelector((state: any) => state.profile);
  const aboutInputState = useState(profile.public_fields.about);

  const dispatch = useDispatch();
  if (languages.data.length == 0) {
    dispatch(Actions.executeGetAvailableLanguages())
  }
  if (!profile.public_fields.name) {
    dispatch(Actions.executeGetUserFields())
  }
  
  profile.settings.locale = profile.settings.locale == '' ? 'en': profile.settings.locale;
  const [selectedLocale, setSelectedLocale] = useState(languages.data.find(lang=> lang.code ==  profile.settings.locale))
  const [languagesAutoComplete, setLanguagesAutoComplete] = useState(languages.data);

  const onChangeText = (query:any) => {
  
    setAutoValue(query);
    
    setLanguagesAutoComplete(languages.data.filter((item:Language) => item.title?.toLowerCase().includes(query.toLowerCase())).map((l:Language,i:number) => {
      return {
        id: i,
        title: l.title,
        data:l
      }
    }));
  };

  const [autoValue, setAutoValue] = React.useState('');

  debugger;
  return (
    <ScrollView>
    {selectedLocale && <Image source={{uri: selectedLocale.flag}} style={styles.locale} />}
    <View style={[styles.page, styles.container]}>
      <Text style={styles.hey} category='h2'>Hi there</Text>
      <Text style={styles.name} category='h6'>{(!profile.public_fields.name) ? 'Loading': `${profile.public_fields.name}`}</Text>
      <Autocomplete
        style={styles.autocomplete}
        placeholder='Select Local Language'
        value={autoValue}
        data={languagesAutoComplete}
        onChangeText={onChangeText}
        onSelect={(item:any)=> {
          onChangeText(item.title);
          setSelectedLocale(item.data);
        }}
      />
      <Text style={styles.subtitle} category='h4'>Add Some Other Languages</Text>
      <View style={styles.select}>
        <SelectOptions
          title="Add Languages"
          readOnly={false}
          onCancelItem={() => { }}
          onConfirm={(list: any) => {
            setSelectedLanguages(list)
          }}
          selectedOptions={selectedLanguages}
          options={languages.data} />
      </View>
      <Avatar style={styles.avatar} source={{uri: profile.public_fields.profileImage}} />
      <Input
        multiline={true} size={'large'}
        textStyle={styles.about}
        placeholder='And Tell us something about yourself'
        {...aboutInputState}
      />
      <Button style={styles.button} appearance='ghost' size="giant" status='success'>Done</Button>
    </View>
    </ScrollView>
  );
}

