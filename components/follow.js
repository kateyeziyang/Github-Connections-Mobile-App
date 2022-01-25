import * as React from 'react';
import { Text, View, Image, FlatList, StyleSheet } from 'react-native';
import { detectInput } from './common'

export function FollowScreen({ navigation, extra, isFollower }) {
  const detectResult = detectInput(extra, 'FollowScreen');
  if (detectResult !== true) {
    return detectResult;
  }
  let myData;
  if (isFollower) {
    myData=extra.followers.nodes;
  } else {
    myData=extra.following.nodes
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={myData}
        renderItem={
          ({item}) =>
          <View>
            <Image source={{uri: item.avatarUrl}} style={styles.image}/>
            <Text style={styles.field}>
              Name: <Text style={styles.justText}>{item.name}</Text>{'\n'}
              Username:
              <Text
                onPress={()=>
                  navigation.push('Profile',
                    {uid: item.login, followPush: true}
                  )
                }
                style={styles.justText}>{item.login}
              </Text>
              {'\n'}{'\n'}
            </Text>
          </View>
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
  justText: {
    color: 'black',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 35,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "white"
  },
  container: {
   flex: 1,
   alignItems: 'center',
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
