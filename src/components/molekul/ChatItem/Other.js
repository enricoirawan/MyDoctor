import React from 'react';
import {
  Image, StyleSheet, Text, View,
} from 'react-native';
import { colors, fonts } from '../../../utils';

const Other = ({ text, date, photo }) => (
  <View style={styles.container}>
    <Image source={photo} style={styles.avatar} />
    <View>
      <View style={styles.chatContent}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <Text style={styles.dates}>{date}</Text>
    </View>
  </View>
);

export default Other;

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 30 / 2,
    width: 30,
    height: 30,
    marginRight: 12,
  },
  container: {
    marginBottom: 20,
    alignItems: 'flex-end',
    paddingLeft: 16,
    flexDirection: 'row',
  },
  chatContent: {
    padding: 12,
    paddingLeft: 18,
    backgroundColor: colors.primary,
    maxWidth: '80%',
    borderRadius: 10,
    borderBottomRightRadius: 0,
  },
  text: { fontSize: 14, fontFamily: fonts.primary.normal, color: colors.white },
  dates: {
    fontSize: 11, fontFamily: fonts.primary.normal, color: colors.text.secondary, marginTop: 8,
  },
});
