import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../../../utils';

const Link = ({
  title, size, align, onPress,
}) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.text(size, align)}>{title}</Text>
  </TouchableOpacity>
);

export default Link;

const styles = StyleSheet.create({
  text: (size, align) => ({
    fontSize: size,
    color: colors.text.secondary,
    fontFamily: fonts.primary.normal,
    textDecorationLine: 'underline',
    textAlign: align,
  }),
});
