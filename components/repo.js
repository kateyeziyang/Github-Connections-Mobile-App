import * as React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { detectInput } from './common'

/**
 * Screen with github repository info.
 * @param navigation Automatic parameter for navigating
 * @param extra Contains json reponse
 * @return Screen with github repository info
*/
export function RepoScreen({ extra, navigation }) {
  const detectResult = detectInput(extra, 'RepoScreen');
  if (detectResult !== true) {
    return detectResult;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.item}><Text style={styles.field}>Name</Text> | Owner | Description </Text>
      <FlatList
        data={extra.repositories.nodes}
        renderItem={
          ({item}) =>
          <Text style={styles.item}>
          <Text style={styles.field}>{item.name} </Text>
          |
          <Text
            onPress={()=>
              navigation.push('Profile',
                {uid: item.owner.login, followPush: true}
              )
            }
            style={styles.justText}>
           {item.owner.login} |
          </Text>
           {item.description}
          </Text>
        }
       keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    color: 'steelblue',
    fontWeight: 'bold',
    fontSize: 20,
  },
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
