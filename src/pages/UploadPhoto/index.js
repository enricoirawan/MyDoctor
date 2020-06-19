/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import {
  Image, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { IconAddPhoto, IconRemovePhoto, ILNullPhoto } from '../../assets';
import {
  Button, Gap, Header, Link,
} from '../../components';
import { Fire } from '../../config';
import {
  colors, fonts, showError, storeData,
} from '../../utils';

const UploadPhoto = ({ navigation, route }) => {
  const { fullName, proffesion, uid } = route.params;
  const [photoForDB, setPhotoForDB] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);
  const getImage = () => {
    // Open Image Library:
    ImagePicker.launchImageLibrary({ quality: 0.5, maxHeight: 200, maxWidth: 200 }, (response) => {
      console.log(response);
      if (response.didCancel || response.error) {
        showError('Oops, sepertinya anda tidak melilih foto nya ?');
      } else {
        console.log('response getImage', response);
        setPhotoForDB(`data:${response.type};base64, ${response.data}`);

        const source = { uri: response.uri };
        setPhoto(source);
        setHasPhoto(true);
      }
    });
  };

  const uploadAndContinue = () => {
    // update data di db
    Fire
      .database()
      .ref(`users/${uid}/`).update({ photo: photoForDB });

    const data = route.params;
    data.photo = photoForDB;

    // menyimpan data ke local storgae dengan tamabhan photo
    storeData('user', data);

    navigation.replace('MainApp');
  };

  return (
    <View style={styles.page}>
      <Header title="Upload Photo" />
      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={getImage}>
            <Image source={photo} style={styles.avatar} />
            {hasPhoto && <IconRemovePhoto style={styles.addPhoto} />}
            {!hasPhoto && <IconAddPhoto style={styles.addPhoto} /> }
          </TouchableOpacity>
          {/* <Text style={styles.name}>Nama</Text>
          <Text style={styles.profession}>Pekerjaan</Text> */}
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.profession}>{proffesion}</Text>
        </View>
        <View>
          <Button
            title="Upload and Continue"
            onPress={uploadAndContinue}
            disable={!hasPhoto}
          />
          <Gap height={30} />
          <Link
            title="Skip for this"
            align="center"
            size={16}
            onPress={() => navigation.replace('MainApp')}
          />
        </View>
      </View>
    </View>
  );
};

export default UploadPhoto;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    paddingHorizontal: 40,
    paddingBottom: 64,
    flex: 1,
    justifyContent: 'space-between',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  },
  avatarWrapper: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 130 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhoto: {
    position: 'absolute',
    bottom: 8,
    right: 6,
  },
  name: {
    fontSize: 24,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
  },
  profession: {
    fontSize: 18,
    fontFamily: fonts.primary.normal,
    textAlign: 'center',
    color: colors.text.secondary,
    marginTop: 4,
  },
  profile: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
