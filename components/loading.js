import * as React from 'react';
import { Text, View } from 'react-native';

/**
 * Default screen when github haven't return anything.
 * @return A waiting page
*/
export function LoadingScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}
