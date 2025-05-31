import {StyleSheet} from 'react-native';

export const registerStyles = (theme) => StyleSheet.create({
  background: {
    backgroundColor: theme.background,
    flex: 1,
    paddingTop: 120,
    paddingBottom: 60,
    justifyContent: 'space-between',
  },
  title: {
    flexDirection: 'column',
    gap: 14,
    marginBottom: 20,
    paddingHorizontal: 30,
  },
  heading: {
    fontSize: 32,
    color: theme.text,
    textAlign: 'center',
    fontFamily: 'CircularStd-Bold',
  },
  subHeading: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
    fontFamily: 'CircularStd-Medium',
  },
  form: {
    paddingHorizontal: 30,
  },
  formField: {
    marginBottom: 28,
    gap: 6,
  },
  inputTitle: {
    fontSize: 16,
    color: theme.text,
    fontFamily: 'CircularStd-Medium',
    marginBottom: 6,
  },
  inputbox: {
    width: '100%',
    height: 54,
    color: theme.text,
    backgroundColor: theme.card,
    fontFamily: 'CircularStd-Regular',
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.border,
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 54,
    backgroundColor: theme.card,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: theme.border,
  },
  LoginPage: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4,
  },
});
