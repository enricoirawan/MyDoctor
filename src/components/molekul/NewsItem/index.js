import React from 'react';
import {
  Image, StyleSheet, Text, View,
} from 'react-native';
import { colors, fonts } from '../../../utils';

const NewsItem = ({ title, date, image }) => (
  <View style={styles.container}>
    <View style={styles.titleWrapper}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
    <Image source={{ uri: image }} style={styles.image} />
  </View>
);

export default NewsItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 12,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  titleWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    maxWidth: '90%',
  },
  date: {
    fontSize: 12,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginTop: 4,
  },
  image: {
    height: 60,
    width: 80,
    borderRadius: 11,
  },
});
