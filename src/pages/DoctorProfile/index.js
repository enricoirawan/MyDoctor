import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Gap, Header, Profile, ProfileItem } from '../../components';
import { colors } from '../../utils';

const DoctorProfile = ({ navigation, route }) => {
  const dataDoctor = route.params;

  return (
    <View style={styles.page}>
      <Header title="Doctor Profile" onPress={() => navigation.goBack()} />
      <Profile name={dataDoctor.data.fullName} desc={dataDoctor.data.proffesion} photo={{ uri: dataDoctor.data.photo }} />
      <Gap height={10} />
      <ProfileItem label="Alumnus" value={dataDoctor.data.university} />
      <ProfileItem label="Tempat Praktik" value={dataDoctor.data.hospital_address} />
      <ProfileItem label="No. STR" value={dataDoctor.data.str_number} />
      <View style={styles.action}>
        <Button title="Start Consultasion" onPress={() => navigation.navigate('Chatting', dataDoctor)} />
      </View>
    </View>
  );
};

export default DoctorProfile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  action: {
    paddingHorizontal: 40,
    paddingTop: 23,
  },
});
