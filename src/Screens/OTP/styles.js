import {StyleSheet} from 'react-native';

export const otpScreenStyles = theme =>
  StyleSheet.create({
    background: {
      height: '100%',
      width: '100%',
      backgroundColor: theme.background,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      gap: 40,
      position: 'relative',
    },
    container: {
      flexDirection: 'column',
      gap: 60,
    },
    headingContainer: {
      alignItems: 'center',
      gap: 40,
    },
    heading: {
      fontSize: 32,
      color: theme.text,
      fontFamily: 'Outfit-bold',
    },
    subHeadingContainer: {
      alignItems: 'center',
      gap: 4,
    },
    subHeading: {
      fontSize: 18,
      color: theme.text,
      fontFamily: 'Outfit-medium',
    },
    emailText: {
      fontSize: 18,
      color: '#ED3147',
      fontFamily: 'Outfit-bold',
      textDecorationLine: 'underline',
    },
    animation: {
      width: 200,
      height: 200,
    },
  });
