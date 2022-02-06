import {StyleSheet} from 'react-native';

const GlobalStyle = StyleSheet.create({
  Pages: {
    Splash: {
      img: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      },
    },
    Login: {
      body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
      },
      inputWrapper: {
        marginVertical: 10,
        flexDirection: 'row',
        width: '50%',
        alignItems: 'center',
      },
      input: {
        marginLeft: 5,
        borderWidth: 1,
        borderRadius: 5,
        flex: 1,
        height: 35,
      },
    },
  },
  Global: {
    text: {
      fontSize: 16,
      color: 'black',
      marginVertical: 10,
      textAlign: 'center',
    },
  },
  Atoms: {
    customButtonStyle: ({pressed}) => [
      {
        backgroundColor: pressed ? 'green' : 'yellow',
        borderWidth: 1,
        width: '35%',
        borderRadius: 5,
      },
    ],
  },
});

export default GlobalStyle;
