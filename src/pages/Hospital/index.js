import React from 'react';
import {
  StyleSheet, Text, View, ImageBackground,
} from 'react-native';
import {
  ILHospitalBg, DummyHospital1, DummyHospital2, DummyHospital3,
} from '../../assets';
import { fonts, colors } from '../../utils';
import { ListHospital } from '../../components';

const Hospital = () => (
  <View style={styles.page}>
    <ImageBackground source={ILHospitalBg} style={styles.background}>
      <Text style={styles.title}>Nearby Hospital</Text>
      <Text style={styles.desc}>3 Tersedia</Text>
    </ImageBackground>
    <View style={styles.content}>
      <ListHospital
        type="Rumah Sakit"
        name="Citra Bunga Merdeka"
        address="Jl. Surya Sejahtera 20"
        pic={DummyHospital1}
      />
      <ListHospital
        type="Rumah Sakit Anak"
        name="Happy Family Kids"
        address="Jl. Surya Sejahtera 20"
        pic={DummyHospital2}
      />
      <ListHospital
        type="Rumah Sakit Jiwa"
        name="Tingkatan Paling Atas"
        address="Jl. Surya Sejahtera 20"
        pic={DummyHospital3}
      />
    </View>
  </View>
);

export default Hospital;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  background: {
    height: 240,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center',
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.white,
    marginTop: 6,
    textAlign: 'center',
  },
  content: {
    backgroundColor: colors.white,
    borderRadius: 20,
    flex: 1,
    marginTop: -30,
    paddingTop: 14,
  },
});
