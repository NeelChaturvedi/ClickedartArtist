import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    justifyContent:'center',
    alignItems:'center',
    padding: 20,
    gap: 40,
    position:'relative',
  },
  backButtonContainer:{
    position:'absolute',
    top: '10%',
    left:20,
  },
  container: {
    flexDirection:'column',
    gap:60,
  },
  headingContainer: {
    alignItems: 'center',
    gap: 40,
  },
  heading: {
    fontSize: 32,
    color: 'white',
    fontFamily: 'Outfit-bold',
  },
  subHeadingContainer: {
    alignItems: 'center',
    gap: 4,
  },
  subHeading: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Outfit-medium',
  },
  emailText: {
    fontSize: 18,
    color: '#ED3174',
    fontFamily: 'Outfit-bold',
    textDecorationLine: 'underline',
  },
});
