import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingBottom: 20,
    gap: 20,
  },
  imageBorder: {
    position: 'relative',
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 10,
    width: '47%',
    height: 190,
    justifyContent: 'space-between',
    backgroundColor: '#1A1A1A',
    borderWidth: 0.5,
    borderColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  status: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    justifyContent:'center',
    alignItems:'center',
  },
  overlay:{
    backgroundColor: 'white',
    opacity: 0.4,
    width:'100%',
    height:'100%',
  },
  pending: {
    position: 'absolute',
    zIndex: 20,
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
});
