import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  background: {
    width: '100%',
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingVertical: 20,
    gap: 20,
  },
  headerContainer:{
    alignItems:'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 14,
  },
  Heading: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Outfit-bold',
    textAlign: 'center',
  },
  Description:{
    color: 'white',
    fontSize: 14,
    fontFamily: 'Outfit-regular',
    alignItems: 'center',
  },
  imageBorder: {
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 10,
    width: '46%',
    aspectRatio: 1,
    justifyContent: 'space-between',
    backgroundColor: '#1A1A1A',
    borderWidth: 0.5,
    borderColor: 'white',
    borderRadius: 10,
  },
  image: {
    resizeMode: 'cover',
    height: '80%',
    width: '100%',
  },
  imageDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageText: {
    fontSize: 16,
    width: '80%',
    fontFamily: 'Outfit-bold',
    color: 'white',
  },
});
