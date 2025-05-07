import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  background: {
    backgroundColor: '#000',
    paddingTop: 48,
    height: '100%',
    width: '100%',
  },
  coverImage: {
    height: '20%',
    width: '100%',
    resizeMode: 'cover',
  },
  profileDiv: {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: [{translateX: -50}],
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 100,
    borderColor: '#fff',
    borderWidth: 4,
  },
  edit: {
    backgroundColor: '#fff',
    height: 30,
    width: 30,
    borderRadius: 100,
    position: 'absolute',
    zIndex: 10,
    bottom: 0,
    right: 0,
  },
});
