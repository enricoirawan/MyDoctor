import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Header, ChatItem, InputChat } from '../../components';
import {
  fonts, colors, getData, showError, getChatTime, setDateChat,
} from '../../utils';
import { Fire } from '../../config';

const Chatting = ({ navigation, route }) => {
  const dataDoctor = route.params;
  const [chatContent, setChatContent] = useState('');
  const [user, setUser] = useState({});
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    getDataUserFromLocal();
    // get data chatting
    const chatId = `${user.uid}_${dataDoctor.data.uid}`;
    const urlFirebase = `chatting/${chatId}/allChat/`;
    Fire.database()
      .ref(urlFirebase)
      .on('value', (snapshot) => {
        // console.log('data chat', snapshot.val());
        if (snapshot.val()) {
          const dataSnapshot = snapshot.val();
          const allDataChat = [];
          Object.keys(dataSnapshot).map((key) => {
            const dataChat = dataSnapshot[key];
            const newDataChat = [];

            Object.keys(dataChat).map((itemChat) => {
              newDataChat.push({
                id: itemChat,
                data: dataChat[itemChat],
              });
            });

            allDataChat.push({
              id: key,
              data: newDataChat,
            });
          });
          console.log('all data chat', allDataChat);
          setChatData(allDataChat);
        }
      });
  }, [dataDoctor.data.uid, user.uid]);

  const getDataUserFromLocal = () => {
    getData('user').then((res) => {
      // console.log('user login : ', res);
      setUser(res);
    });
  };

  const chatSend = () => {
    const today = new Date();
    // kirim ke firebase
    const data = {
      sendBy: user.uid,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent,
    };
    console.log('data untuk di kirim', data);

    const chatId = `${user.uid}_${dataDoctor.data.uid}`;
    const urlFirebase = `chatting/${chatId}/allChat/${setDateChat(today)}`;
    const urlMessagesUser = `messages/${user.uid}/${chatId}`;
    const urlMessagesDoctor = `messages/${dataDoctor.data.uid}/${chatId}`;
    const dataHistoryChatForUser = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: dataDoctor.data.uid,
    };
    const dataHistoryChatForDoctor = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: user.uid,
    };

    // console.log('url firebase', urlFirebase);
    Fire
      .database()
      .ref(urlFirebase)
      .push(data)
      .then(() => {
        setChatContent('');
        // set history for doctor
        Fire.database()
          .ref(urlMessagesUser)
          .set(dataHistoryChatForUser);

        // set history chat for doctor
        Fire.database()
          .ref(urlMessagesDoctor)
          .set(dataHistoryChatForDoctor);
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  return (
    <View style={styles.page}>
      <Header
        title={dataDoctor.data.fullName}
        desc={dataDoctor.data.category}
        photo={{ uri: dataDoctor.data.photo }}
        type="dark-profile"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <ScrollView>
          {chatData.map((chat) => (
            <View key={chat.id}>
              <Text style={styles.chatDate}>{chat.id}</Text>
              {chat.data.map((itemChat) => {
                const isMe = itemChat.data.sendBy === user.uid;
                return (
                  <ChatItem
                    key={itemChat.id}
                    isMe={isMe}
                    text={itemChat.data.chatContent}
                    date={itemChat.data.chatTime}
                    photo={isMe ? null : { uri: dataDoctor.data.photo }}
                  />
                );
              })}
            </View>
          ))}
        </ScrollView>
      </View>
      <InputChat
        value={chatContent}
        onChangeText={(value) => setChatContent(value)}
        onButtonPress={chatSend}
      />
    </View>
  );
};

export default Chatting;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  chatDate: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginVertical: 20,
    textAlign: 'center',
  },
});
