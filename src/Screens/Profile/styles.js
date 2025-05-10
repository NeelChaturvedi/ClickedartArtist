import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  background: {
    backgroundColor: '#000',
    height: '100%',
    width: '100%',
  },
  profileHeader: {
    height: 200,
  },
  coverImage: {
    height: '70%',
    width: '100%',
    resizeMode: 'cover',
  },
  profileDiv: {
    position: 'absolute',
    top: '40%',
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    width: 24,
    borderRadius: 20,
    position: 'absolute',
    zIndex: 10,
    bottom: 7,
    right: 5,
  },
  userDetails: {
    alignItems: 'center',
    gap: 10,
  },
  userName: {
    color: '#fff',
    fontFamily: 'Outfit-medium',
    fontSize: 24,
    marginTop: 14,
  },
  userAddress: {
    color: '#D9D9D9',
    fontFamily: 'Outfit-medium',
    fontSize: 16,
  },
  userBio: {
    color: '#FFF',
    fontFamily: 'Outfit-medium',
    fontSize: 18,
    marginTop: 30,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    gap: 40,
  },
  summary: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  title: {
    fontSize: 14,
    fontFamily: 'Outfit-regular',
    color: '#FFF',
  },
  count: {
    fontSize: 28,
    fontFamily: 'Outfit-medium',
    color: '#FFF',
  },
  tabsContainer: {
    marginTop: 40,
    gap: 35,
    width: '95%',
    alignSelf: 'center',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 50,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Outfit-medium',
  },
});
