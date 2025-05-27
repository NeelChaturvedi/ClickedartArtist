import {StyleSheet} from 'react-native';

export const loginStyles = theme =>
  StyleSheet.create({
    background: {
      flex: 1,
      paddingVertical: '80%',
      justifyContent: 'space-between',
      backgroundColor: theme.background,
      height: '100%',
      gap: 90,
    },
    title: {
      flexDirection: 'column',
      gap: 20,
    },
    heading: {
      fontSize: 32,
      lineHeight: 40,
      color: theme.text,
      textAlign: 'center',
      fontFamily: 'Outfit-bold',
    },
    subHeading: {
      fontSize: 16,
      color: '#888888',
      textAlign: 'center',
      fontFamily: 'Outfit-medium',
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
      fontFamily: 'Outfit-medium',
      color: theme.text,
    },
    inputbox: {
      width: '100%',
      height: 54,
      color: theme.text,
      backgroundColor: theme.card,
      padding: 10,
      borderRadius: 10,
      borderWidth: 0.5,
      borderColor: theme.border,
    },
    passwordInput: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: 54,
      backgroundColor: theme.card,
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 10,
      borderWidth: 0.5,
      borderColor: theme.border,
    },
    passwordTextInput: {
      color: theme.text,
      fontFamily: 'Outfit-regular',
      flex: 1,
      marginRight: 10,
    },
    forgotPassword: {
      color: theme.text,
      textAlign: 'right',
      textDecorationLine: 'underline',
      fontFamily: 'Outfit-regular',
    },
    createAccount: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 4,
    },
    createAccountText: {
      color: theme.text,
      textAlign: 'center',
      fontFamily: 'Outfit-regular',
    },
    createNowText: {
      fontFamily: 'Outfit-bold',
      color: '#ED3147',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalContent: {
      backgroundColor: theme.card,
      width: '85%',
      gap: 30,
      padding: 20,
      borderRadius: 20,
    },
    modalTitle: {
      fontSize: 24,
      lineHeight: 28,
      fontFamily: 'Outfit-bold',
      color: theme.text,
      textAlign: 'center',
    },
    inputSection: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 16,
      width: '100%',
    },
    sectionTitle: {
      fontSize: 16,
      lineHeight: 20,
      fontFamily: 'Outfit-medium',
      color: theme.text,
    },
    errorText: {
      color: '#ED3147',
      fontSize: 14,
      fontFamily: 'Outfit-regular',
    },
  });
