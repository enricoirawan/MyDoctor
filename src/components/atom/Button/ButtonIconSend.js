import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconSendDark, IconSendLight } from '../../../assets';
import { colors } from '../../../utils';

const ButtonIconSend = ({ disable, onPress }) => {
  if (disable) {
    return (
      <View style={styles.container(disable)}>
        {disable && <IconSendDark />}
        {!disable && <IconSendLight />}
      </View>
	  );
  }
  return (
    <TouchableOpacity style={styles.container(disable)} onPress={onPress}>
      {!disable && <IconSendLight />}
    </TouchableOpacity>
  );
};

export default ButtonIconSend;

const styles = StyleSheet.create({
  container: (disable) => ({
    backgroundColor: disable ? colors.disable : colors.tersier,
    width: 45,
    height: 45,
    borderRadius: 10,
    paddingTop: 3,
    paddingRight: 3,
    paddingBottom: 8,
    paddingLeft: 8,
  }),
});
