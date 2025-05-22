import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
  },
  header: {
    fontFamily: 'Outfit-bold',
    fontSize: 24,
    color: 'white',
  },
  container: {
    padding: 20,
    gap: 20,
  },
  card: {
    width: '100%',
    flexGrow: 1,
    padding: 16,
    gap: 20,
    backgroundColor: '#1E1E1E',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'white',
    marginBottom: 20,
  },
  imageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    height: 100,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  imageDetails: {
    flexDirection: 'column',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    fontFamily: 'Outfit-bold',
    fontSize: 20,
  },
  owner: {
    color: '#888',
    fontFamily: 'Outfit-medium',
    fontSize: 16,
  },
  price: {
    color: 'white',
    fontFamily: 'Outfit-medium',
    fontSize: 20,
    textAlign: 'right',
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: 'white',
  },
  size: {
    color: 'white',
    fontFamily: 'Outfit-medium',
    fontSize: 18,
  },
  paper: {
    color: 'white',
    fontFamily: 'Outfit-medium',
    fontSize: 14,
  },
  otherOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnContainer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
});
