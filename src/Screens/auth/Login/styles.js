import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
    height: '100%',
    paddingVertical: '30%',
    gap: 90,
  },
  title: {
    flexDirection: 'column',
    gap: 20,
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
    gap: 20,
    paddingHorizontal: 30,
  },
  formField: {
    gap: 10,
    flexDirection: 'column',
  },
  inputTitle: {
    fontSize: 16,
    color: 'white',
  },
  inputbox: {
    width: '100%',
    height: 54,
    color: 'white',
    backgroundColor: '#1A1A1A',
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#8C8C8C',
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 54,
    backgroundColor: '#1A1A1A',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#8C8C8C',
  },
  passwordTextInput: {
    color: '#ffffff',
    flex: 1,
    marginRight: 10,
  },
  forgotPassword: {
    color: '#fff',
    textAlign: 'right',
    textDecorationLine: 'underline',
    fontWeight: '700',
  },
  createAccountText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '400',
  },
  createNowText: {
    fontWeight: '700',
  },
});
