import React, { useEffect, useState } from 'react';
import {  View,  Image, ScrollView } from 'react-native';
import SelectLanguages from '~/components/SelectLanguages'
import { useSelector, useDispatch } from 'react-redux';
import { Actions } from '~/store/actions';
import styles from './style'

import { Input, Avatar, Text, Button, Autocomplete , } from '@ui-kitten/components';
import User from '~/store/entites/user';
export default function ProfileScreen(props: any) {
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
  const [autoValue, setAutoValue] = React.useState(`${selectedLocale?.title}`);
  const onChangeText = (query:any) => {
    setAutoValue(query);
    setLanguagesAutoComplete(languages.data.filter((item:Language) => item.title?.toLowerCase().includes(query.toLowerCase())).map((l:Language,i:number) => {
      l.id = i;
      return l
    }));
  };


  const saveProfile = () => {
    debugger;
    profile.settings.locale = `${selectedLocale?.title}`;
    profile.public_fields.about = aboutInputState[0];
    profile.languages = selectedLocale ? [selectedLocale, ...selectedLanguages] : selectedLanguages;
    profile.administrative_fields.isNewUser = false;
    // Local
    dispatch(Actions.execute(Actions.POST_USER_FIELDS, profile));
    // Database
    dispatch(Actions.executePostUserFields(profile));
    return props.navigation.navigate('SplashScreen');

  };
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
          setSelectedLocale(item);
        }}
      />
      <Text style={styles.subtitle} category='h4'>Add Some Other Languages</Text>
      <View style={styles.select}>
        <SelectLanguages
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
      <Button style={styles.button} appearance='ghost' size="giant" status='success'
      onPress={saveProfile}
      >Done</Button>
    </View>
    </ScrollView>
  );
}

