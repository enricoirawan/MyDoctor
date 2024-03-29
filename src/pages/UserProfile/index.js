import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ILNullPhoto } from '../../assets';
import { Gap, Header, List, Profile } from '../../components';
import { Fire } from '../../config';
import { colors, getData, showError } from '../../utils';

const UserProfile = ({ navigation }) => {
  const [profile, setProfile] = useState({ fullName: '', proffesion: '', photo: ILNullPhoto });

  useEffect(() => {
    getData('user').then((res) => {
      const data = res;
      data.photo = { uri: res.photo };
      setProfile(data);
    });
  }, []);

  const signout = () => {
    Fire.auth().signOut().then(() => {
      console.log('success signout');
      navigation.replace('GetStarted');
    }).catch((err) => {
      showError(err.message);
    });
  };

  return (
    <View style={styles.page}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      {profile.fullName.length > 0
      && <Profile name={profile.fullName} desc={profile.proffesion} photo={profile.photo} />}
      <Gap height={14} />
      <List
        name="Edit Profile"
        desc="Last Update Yesterday"
        type="next"
        icon="edit-profile"
        onPress={() => navigation.navigate('UpdateProfile')}
      />
      <List
        name="Language"
        desc="Last Update Yesterday"
        type="next"
        icon="language"
      />
      <List
        name="Give us rate"
        desc="Last Update Yesterday"
        type="next"
        icon="rate"
      />
      <List
        name="Sign out"
        desc="Last Update Yesterday"
        type="next"
        icon="help"
        onPress={signout}
      />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.white },
});
