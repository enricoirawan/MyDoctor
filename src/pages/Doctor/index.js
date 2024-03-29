/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { DummyDoctor1, DummyDoctor2, DummyDoctor3 } from '../../assets';
import {
  DoctorCategory, Gap, HomeProfile, NewsItem, RatedDoctor,
} from '../../components';
import { Fire } from '../../config';
import { colors, fonts, showError } from '../../utils';

const Doctor = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [categoryDoctor, setCategoryDoctor] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // manmapilkan news
    getNews();
    // manmapilkan category doctor
    getCategoryDoctor();
    // menampilkan top rated doctor
    getTopRatedDoctor();
  }, []);

  const getTopRatedDoctor = () => {
    Fire.database().ref('doctors/').orderByChild('rate').limitToLast(3)
      .once('value')
      .then((res) => {
        // console.log('doctors : ', res.val());
        if (res.val()) {
          // parse object to array
          const oldData = res.val();
          const data = [];
          Object.keys(oldData).map((key) => {
            data.push({
              id: key,
              data: oldData[key],
            });
          });
          console.log(data);
          setDoctors(data);
        }
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  const getCategoryDoctor = () => {
    Fire.database().ref('category_doctor/').once('value').then((res) => {
      if (res.val()) {
        const data = res.val();
        const filterData = data.filter((el) => el !== null);
        setCategoryDoctor(filterData);
      }
    })
      .catch((err) => {
        showError(err.message);
      });
  };

  const getNews = () => {
    Fire.database().ref('news/').once('value').then((res) => {
      if (res.val()) {
        const data = res.val();
        const filterData = data.filter((el) => el !== null);
        setNews(filterData);
      }
    })
      .catch((err) => {
        showError(err.message);
      });
  };

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            <HomeProfile onPress={() => navigation.navigate('UserProfile')} />
            <Text style={styles.welcome}>Mau konsultasi dengan siapa hari ini ?</Text>
          </View>
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <Gap width={32} />
                {categoryDoctor.map((item) => (
                  <DoctorCategory
                    key={item.id}
                    category={item.category}
                    onPress={() => navigation.navigate('ChooseDoctor', item)}
                  />
                ))}
                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
            {doctors.map((doctor) => (
              <RatedDoctor
                key={doctor.id}
                name={doctor.data.fullName}
                desc={doctor.data.proffesion}
                avatar={{ uri: doctor.data.photo }}
                onPress={() => navigation.navigate('DoctorProfile', doctor)}
              />
            ))}
            <Text style={styles.sectionLabel}>Good News</Text>
          </View>
          {news.map((item) => (
            <NewsItem
              key={item.id}
              title={item.title}
              date={item.date}
              image={item.image}
            />
          ))}
          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Doctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 209,
  },
  category: {
    flexDirection: 'row',
  },
  wrapperSection: {
    paddingHorizontal: 16,
  },
  wrapperScroll: {
    marginHorizontal: -16,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
});
