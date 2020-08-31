import * as React from 'react';
import { View } from 'remax/wechat';
import styles from './index.css';

export default () => {
  return (
    <View className={styles.app}>
      <View className={styles.logo}>ANNA</View>
      <View className={styles.description}>ELEGANT AND SIMPLE</View>
      <View className={styles.time}>2019 - 2020</View>
    </View>
  );
};
