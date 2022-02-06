import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import {Trashcan} from '../../assets';
import {CustomButton} from '../../components';

const db = openDatabase({
  name: 'rn_sqlite',
});

const Home = ({route, navigation}) => {
  const [loginUsername, setLoginUsername] = useState('');
  const [book, setBook] = useState('');
  const [books, setBooks] = useState([]);
  const [isUpdate, setUpdate] = useState();

  const getLoginUsername = () => {
    if (!loginUsername) {
      setLoginUsername(route.params.loginUsername);
    } else {
      navigation.navigate('Screen_Login');
    }
  };

  const createTables = () => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS tables (id INTEGER PRIMARY KEY AUTOINCREMENT, bookname VARCHAR(20))`,
        [],
        (tx, res) => {
          console.log('table created successfully');
        },
        error => {
          console.log('error on creating table ' + error.message);
        },
      );
    });
  };

  const addBook = e => {
    e.preventDefault();
    if (!book) {
      alert('Enter category');
      return false;
    }

    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO tables (bookname) VALUES (?)`,
        [book],
        (tx, res) => {
          console.log(`${book} book added successfully`);
          getBooks();
          setBook('');
        },
        error => {
          console.log('error on adding book ' + error.message);
        },
      );
    });
  };

  const editBook = item => {
    setUpdate(true);
    setBook(item.bookname);
    let id = item.id;
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE tables set bookname=? WHERE id=?`,
        [book, id],
        (tx, res) => {
          console.log('Updated Successfully');
          let len = res.rows.length;

          if (len > 0) {
            let results = [];
            for (i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.splice({id: item.id, bookname: item.bookname});
            }
            setBooks(results);
          }
          getBooks();
        },
      );
    });
    setUpdate(false);
  };

  const deleteBook = item => {
    let id = item.id;
    Alert.alert('WARNING', 'ARE YOU SURE?', [
      {
        text: 'Ok',
        onPress: () => {
          db.transaction(tx => {
            tx.executeSql(`DELETE FROM tables WHERE id=?`, [id], (tx, res) => {
              console.log('deleted successfully');
              let len = res.rows.length;
              if (len > 0) {
                let results = [];
                for (let i = 0; i < len; i++) {
                  let item = res.rows.item(i);
                  results.push({id: item.id, bookname: item.bookname});
                }
                setBooks(results);
              }
            });
          }),
            getBooks();
        },
      },
      {text: 'Cancel', onPress: () => getBooks()},
    ]);
  };

  const getBooks = () => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM tables ORDER BY id ASC`,
        [],
        (tx, res) => {
          console.log('book retrieved successfully');
          let len = res.rows.length;

          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({id: item.id, bookname: item.bookname});
            }
            setBooks(results);
          }
        },
        error => {
          console.log('error on getting categories ' + error.message);
        },
      );
    });
  };

  const detailBook = item => {
    navigation.navigate('Screen_DetailBook', {item: item.id});
  };

  const renderBooks = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 12,
          paddingHorizontal: 10,
          borderBottomWidth: 1,
          borderColor: '#ddd',
        }}>
        <Text style={{marginRight: 9}}>{item.id}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <TouchableOpacity onPress={() => detailBook(item)}>
            <Text>{item.bookname}</Text>
          </TouchableOpacity>
          {loginUsername === 'Admin' ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <Button
                title={isUpdate ? 'UPDATE' : 'EDIT'}
                onPress={() => editBook(item)}
              />

              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => deleteBook(item)}>
                <Trashcan width={25} height={25} />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  const handlerLogout = () => {
    navigation.replace('Screen_Login');
  };

  useEffect(() => {
    createTables();
    getBooks();
    getLoginUsername();

    return () => {};
  }, []);

  console.log(isUpdate);

  return (
    <ScrollView style={{padding: 15}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>Book List</Text>
        <CustomButton title="Logout" handler={handlerLogout} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 15,
        }}>
        <TextInput
          placeholder="Enter category"
          value={book}
          onChangeText={setBook}
          style={{
            marginHorizontal: 8,
            borderWidth: 1,
            width: '50%',
            textAlign: 'center',
            borderRadius: 5,
          }}
        />
        {loginUsername === 'Admin' ? (
          <CustomButton title="addBook" handler={addBook} />
        ) : null}
      </View>
      <FlatList data={books} renderItem={renderBooks} key={item => item.id} />
    </ScrollView>
  );
};

export default Home;
