import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 80,
  },
  textContainer: {
    width: '100%',
    paddingHorizontal: 30,
    gap: 40,
  },
  skipText: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'CircularStd-Bold',
    textAlign: 'right',
  },
  title: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'CircularStd-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'CircularStd-Regular',
  },
  buttonContainer: {
    width: '100%',
    gap: 50,
  },
  logo:{
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
