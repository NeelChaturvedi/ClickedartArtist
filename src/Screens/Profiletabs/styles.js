import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    gap: 20,
  },
  imageBorder: {
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 10,
    width: '47%',
    height: 190,
    justifyContent: 'space-between',
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#fff',
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
    fontFamily: 'Outfit-bold',
    color: '#fff',
  },
  catalogueBorder: {
    padding: 10,
    width: '100%',
    height: 380,
    justifyContent: 'space-between',
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    marginRight: 10,
  },
});
