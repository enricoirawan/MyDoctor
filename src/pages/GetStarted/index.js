import React from 'react';
import {
  StyleSheet, View, Text, ImageBackground,
} from 'react-native';
import { useSelector } from 'react-redux';
import { ILLogo, ILGetStarted } from '../../assets';
import { Button, Gap } from '../../components';
import { fonts } from '../../utils';

const GetStarted = ({ navigation }) => {
  return (
    <ImageBackground source={ILGetStarted} style={styles.page}>
      <View>
        <ILLogo />
        <Text style={styles.title}>Konsultasi dengan dokter jadi lebih mudah & fleksibel</Text>
      </View>
      <View>
        <Button title="Get Started" onPress={() => navigation.navigate('Register')} />
        <Gap height={16} />
        <Button title="Signin" type="secondary" onPress={() => navigation.replace('Login')} />
      </View>
    </ImageBackground>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  page: {
    padding: 40,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    fontSize: 28,
    color: 'white',
    marginTop: 91,
    fontFamily: fonts.primary[600],
  },
});
