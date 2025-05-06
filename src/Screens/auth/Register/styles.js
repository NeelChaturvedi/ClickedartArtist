import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
    flex: 1,
    paddingVertical: 80,
    justifyContent: 'space-between',
  },
  title: {
    flexDirection: 'column',
    gap: 10,
    marginBottom: 20,
    paddingHorizontal: 30,
  },
  heading: {
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Outfit Bold',
  },
  subHeading: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
    fontFamily: 'Outfit Bold',
  },
  form: {
    paddingHorizontal: 30,
  },
  formField: {
    marginBottom: 20,
  },
  inputTitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 6,
  },
  inputbox: {
    width: '100%',
    height: 54,
    color: 'white',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#8C8C8C',
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 54,
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#8C8C8C',
  },
});
