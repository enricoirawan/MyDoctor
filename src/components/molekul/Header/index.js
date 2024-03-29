import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Gap, Button } from '../../atom';
import { colors, fonts } from '../../../utils';
import DarkProfile from './DarkProfile';

const Header = ({
  onPress, title, desc, photo, type,
}) => {
  if (type === 'dark-profile') {
    return <DarkProfile onPress={onPress} title={title} desc={desc} photo={photo} />;
  }

  return (
    <View style={styles.container(type)}>
      <Button type="icon-only" icon={type === 'dark' ? 'back-light' : 'back-dark'} onPress={onPress} />
      <Text style={styles.text(type)}>{title}</Text>
      <Gap width={24} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: (type) => ({
    paddingHorizontal: 16,
    paddingVertical: 30,
    backgroundColor: type === 'dark' ? colors.secondary : colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomRightRadius: type === 'dark' ? 20 : 0,
    borderBottomLeftRadius: type === 'dark' ? 20 : 0,
  }),
  text: (type) => ({
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: type === 'dark' ? colors.white : colors.text.primary,
    textTransform: 'capitalize',
  }),
});
