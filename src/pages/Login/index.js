/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { ILLogo } from '../../assets';
import {
  Button, Gap, Input, Link,
} from '../../components';
import { Fire } from '../../config';
import {
  colors, fonts, storeData, useForm,
  showError,
} from '../../utils';


const Login = ({ navigation }) => {
  const [form, setForm] = useForm({ email: '', password: '' });
  const dispatch = useDispatch();

  const login = () => {
    dispatch({
      type: 'SET_LOADING',
      value: true,
    });
    Fire
      .auth().signInWithEmailAndPassword(form.email, form.password)
      .then((res) => {
        dispatch({
          type: 'SET_LOADING',
          value: false,
        });

        // mengambil data dari firebase
        Fire.database()
          .ref(`users/${res.user.uid}/`)
          .once('value')
          .then((resDB) => {
            if (resDB.val()) {
              storeData('user', resDB.val());
              navigation.replace('MainApp');
            }
          });
      })
      .catch((err) => {
        dispatch({
          type: 'SET_LOADING',
          value: false,
        });
        showError(err.message);
      });
  };

  return (
    <View style={styles.page}>
      <Gap height={40} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ILLogo />
        <Text style={styles.title}>Masuk dan mulai berkonsultasi</Text>
        <Input
          label="Email Adress"
          value={form.email}
          onChangeText={(value) => setForm('email', value)}
        />
        <Gap height={24} />
        <Input
          label="Password"
          value={form.password}
          onChangeText={(value) => setForm('password', value)}
          secureTextEntry
        />
        <Gap height={10} />
        <Link title="Forgot My Password" size={12} />
        <Gap height={40} />
        <Button title="Sign In" onPress={login} />
        <Gap height={30} />
        <Link
          title="Create a New Account"
          size={16}
          align="center"
          onPress={() => navigation.navigate('Register')}
        />
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 40,
    backgroundColor: colors.white,
    flex: 1,
  },
  title: {
    color: colors.text.primary,
    fontSize: 20,
    fontFamily: fonts.primary[600],
    marginTop: 40,
    marginBottom: 40,
    maxWidth: 153,
  },
});
