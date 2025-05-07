import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  background: {
    backgroundColor: '#000',
    paddingTop: 48,
    height: '100%',
    width: '100%',
  },
  coverImage: {
    height: '42%',
    width: '100%',
    resizeMode: 'cover',
  },
  profileDiv: {
    position: 'absolute',
    top: '25%',
    left: '50%',
    transform: [{translateX: -50}],
  },
  profileImage: {
    height: 110,
    width: 110,
    borderRadius: 100,
    borderColor: '#000',
    borderWidth: 6,
  },
  edit: {
    backgroundColor: '#fff',
    flex:1,
    justifyContent: 'center',
    alignItems:'center',
    height: 24,
    width: 24,
    borderRadius: 20,
    position: 'absolute',
    zIndex: 10,
    bottom: 7,
    right: 5,
  },
  userDetails: {
    flexDirection: 'column',
    alignItems: 'center',
    gap:20,
  },
  userName: {
    color: '#fff',
    fontFamily:'Outfit-medium',
    fontSize: 24,
  },
  userAddress: {
    color: '#D9D9D9',
    fontFamily:'Outfit-medium',
    fontSize: 16,
  },
});
