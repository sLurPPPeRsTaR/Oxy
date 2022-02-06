import {View, Button, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import GlobalStyle from '../../GlobalStyle';

const DetailBook = ({route, navigation}) => {
  const [bookDetail, setBookDetail] = useState();
  const [cover, setCover] = useState();
  const [isLoading, setLoading] = useState(true);
  let id = route.params.item;

  const getAPI = async () => {
    await axios
      .get('http://openlibrary.org/search.json?author=tolkien')
      .then(respone => setBookDetail(respone.data));
    setLoading(false);
  };

  const getCoverAPI = async () => {
    await axios
      .get(`https://covers.openlibrary.org/b/id/${id}-S.jpg`)
      .then(respone => setCover(respone));
  };

  useEffect(() => {
    getAPI();
    getCoverAPI();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'salmon',
      }}>
      {isLoading ? (
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'red',
            marginBottom: 35,
          }}>
          Im Loading Please Wait..
        </Text>
      ) : (
        <View style={{marginBottom: 35}}>
          <Text style={GlobalStyle.Global.text}>
            Book Title : {bookDetail.docs[`${id}`].title}
          </Text>
          <Text style={GlobalStyle.Global.text}>
            Pulish Date : {bookDetail.docs[`${id}`].publish_date[`${id}`]}
          </Text>
          <Text style={GlobalStyle.Global.text}>
            Description : {bookDetail.docs[`${id}`].first_sentence}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={GlobalStyle.Global.text}>Cover :</Text>
            <Image
              style={{
                backgroundColor: 'red',
                width: 125,
                height: 125,
                marginLeft: 10,
              }}
              source={{uri: `${cover.config.url}`}}
            />
          </View>
        </View>
      )}

      <Button title="GoBack" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default DetailBook;
