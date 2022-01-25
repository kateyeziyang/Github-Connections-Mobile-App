import * as React from 'react';
import { Button, Text, StyleSheet, View, Image, ScrollView } from 'react-native';
import { detectInput } from './common'

/**
 * Screen when github information.
 * @param navigation Automatic parameter for navigating
 * @param extra Contains json reponse
 * @return A page contains user information
*/
export function ProfileScreen({ navigation, extra, doPush }) {
  const detectResult = detectInput(extra, 'ProfileScreen');
  if (detectResult !== true) {
    return detectResult;
  }

  let pic = {uri: extra.avatarUrl};
  let repos = extra.repositories;
  let repoCount = "Public Repos count: "+repos.totalCount;
  let followersCount = "Followers count: "+extra.followers.totalCount;
  let followingCount = "Following count: "+extra.following.totalCount;

  if (doPush === true) {
    return (
      <View style={{ flex: 1, alignItems: 'center', padding: 20}}>
        <Image source={pic} style={styles.image}/>
        <View style={{alignSelf: 'flex-start', padding: 20}}>
          <Text style={styles.field}>
          Name: <Text style={styles.justText}>{extra.name}</Text>{'\n'}
          Username: <Text style={styles.justText}>{extra.login}</Text>{'\n'}
          Bio: <Text style={styles.justText}>{extra.bio}</Text>{'\n'}
          Website: <Text style={styles.justText}>{extra.websiteUrl}</Text>{'\n'}
          Email: <Text style={styles.justText}>{extra.email}</Text>
          </Text>
          <Button
            title = {repoCount}
            onPress={() => navigation.push('Repo', {uid: extra.login})}
          />
          <Button
            title = {followersCount}
            onPress={() => navigation.push('Followers', {uid: extra.login, isFollower1: true})}
          />
          <Button
            title = {followingCount}
            onPress={() => navigation.push('Following', {uid: extra.login, isFollower1: false})}
          />
          <Text style={styles.field}>
          Profile creation date: <Text style={styles.justText}>{extra.updatedAt}</Text>
          </Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, alignItems: 'center', padding: 20}}>
        <Image source={pic} style={styles.image}/>
        <ScrollView style={{ flex: 1, padding: 20}}>
          <Text style={styles.field}>
          Name: <Text style={styles.justText}>{extra.name}</Text>{'\n'}
          Username: <Text style={styles.justText}>{extra.login}</Text>{'\n'}
          Bio: <Text style={styles.justText}>{extra.bio}</Text>{'\n'}
          Website: <Text style={styles.justText}>{extra.websiteUrl}</Text>{'\n'}
          Email: <Text style={styles.justText}>{extra.email}</Text>
          </Text>
          <Button
            title = {repoCount}
            onPress={() => navigation.navigate('Repo')}
          />
          <Button
            title = {followersCount}
            onPress={() => navigation.navigate('Followers', {addtionalData: extra, useAdditonal: true})}
          />
          <Button
            title = {followingCount}
            onPress={() => navigation.navigate('Following', {addtionalData: extra, useAdditonal: true})}
          />
          <Text style={styles.field}>
          Profile creation date: <Text style={styles.justText}>{extra.updatedAt}</Text>
          </Text>
        </ScrollView>
      </View>
    );
  }
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
});
