import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    gap: 20,
    width:'100%',
  },
  uploadContainer: {
    height: 250,
    borderWidth: 0.5,
    borderRadius: 10,
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    width: '100%',
    backgroundColor: '#1E1E1E',
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  uploadText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Outfit-medium',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    gap: 20,
  },
  tabText: {
    color: '#999',
    fontFamily: 'Outfit-medium',
    fontSize: 16,
  },
  addContainer: {
    backgroundColor: '#1E1E1E',
    height: 55,
    borderWidth: 0.5,
    borderColor:'white',
    borderRadius: 10,
    padding: 16,
  },
  watermarkImage: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  uploadBtn: {
    backgroundColor: '#ED3147',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  nextBtn: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    width: '46%',
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#ED3147',
  },
  buttonsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  proceedBtn: {
    fontSize: 20,
    fontFamily: 'Outfit-bold',
    color: 'white',
  },

  //Step 2
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchText: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Outfit-medium',
  },
  section:{
    alignItems:'flex-start',
    gap:16,
  },
  headingText:{
    fontSize: 20,
    fontFamily: 'Outfit-bold',
    color:'white',
  },
  twoFields:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  descriptionContainer: {
    backgroundColor: '#1E1E1E',
    height: 120,
    borderRadius: 10,
    padding: 16,
    textAlignVertical:'top',
  },
});
