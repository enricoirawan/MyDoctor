import React, { useState } from 'react';
import {
  StyleSheet, View, TextInput, Text,
} from 'react-native';
import { colors, fonts } from '../../../utils';

const Input = ({
  label, value, onChangeText, secureTextEntry, disable,
}) => {
  const [border, setBorder] = useState(colors.border);
  const onFocusForm = () => {
    setBorder(colors.tersier);
  };
  const onBlurForm = () => {
    setBorder(colors.border);
  };
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        onFocus={onFocusForm}
        onBlur={onBlurForm}
        style={styles.input(border)}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        editable={!disable}
        selectTextOnFocus={!disable}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: (border) => ({
    borderRadius: 10,
    borderWidth: 1,
    borderColor: border,
    padding: 12,
  }),
  label: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 6,
    fontFamily: fonts.primary.normal,
  },
});
