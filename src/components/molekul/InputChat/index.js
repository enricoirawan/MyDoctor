import React from 'react';
import {
  StyleSheet, Text, View, TextInput,
} from 'react-native';
import { colors, fonts } from '../../../utils';
import { Button } from '../../atom';

const InputChat = ({ value, onChangeText, onButtonPress }) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Tulis Pesan Untuk Nairobi"
      value={value}
      onChangeText={onChangeText}
    />
    <Button type="button-icon-send" disable={value.length < 1} onPress={onButtonPress} />
  </View>
);

export default InputChat;

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.disable,
    padding: 14,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    maxHeight: 45,
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
});
