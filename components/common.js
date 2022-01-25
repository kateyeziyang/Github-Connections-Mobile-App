import * as React from 'react';
import { Text, View } from 'react-native';

export const detectInput = (extra, pageName) => {
  if (Object.keys(extra).length === 0) {
    console.log(pageName+'receive empty input.');
    return (
      <View><Text>Sorry, some error happened.</Text></View>
    )
  }
  if (typeof extra.name === 'undefined'
    && typeof extra.repositories === 'undefined'
    && typeof extra.followers === 'undefined'
    && typeof extra.following === 'undefined' 
    ) {
    console.log('Something wrong with '+pageName+' input.');
    console.log(extra);
    return (
      <View><Text>Sorry, something wrong with data.</Text></View>
    )
  }
  return true;
};
