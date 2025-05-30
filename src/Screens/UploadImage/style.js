import {StyleSheet} from 'react-native';

export const uploadImageStyles = theme =>
  StyleSheet.create({
    background: {
      height: '100%',
      width: '100%',
      backgroundColor: theme.background,
    },
    container: {
      flexGrow: 1,
      padding: 20,
      gap: 20,
      width: '100%',
    },
    uploadContainer: {
      borderWidth: 0.5,
      borderRadius: 10,
      gap: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: theme.border,
      width: '100%',
      backgroundColor: theme.card,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      aspectRatio: 1,
      resizeMode: 'contain',
    },
    uploadText: {
      color: theme.text,
      fontSize: 20,
      fontFamily: 'Calibri-Medium',
    },
    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 16,
      gap: 20,
    },
    tabText: {
      color: '#888',
      fontFamily: 'Calibri-Medium',
      fontSize: 16,
    },
    addContainer: {
      backgroundColor: theme.card,
      height: 55,
      color: theme.text,
      fontFamily: 'Calibri-Medium',
      fontSize: 16,
      borderWidth: 0.5,
      borderColor: theme.border,
      borderRadius: 10,
      padding: 16,
    },
    watermarkImage: {
      backgroundColor: theme.card,
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
      fontFamily: 'Calibri-Bold',
      color: theme.text,
    },

    //Step 2
    toggleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    switchText: {
      fontSize: 20,
      color: theme.text,
      fontFamily: 'Calibri-Medium',
    },
    section: {
      alignItems: 'flex-start',
      gap: 16,
    },
    headingText: {
      fontSize: 20,
      fontFamily: 'Calibri-Bold',
      color: theme.text,
    },
    twoFields: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    descriptionContainer: {
      backgroundColor: theme.card,
      height: 120,
      borderRadius: 10,
      padding: 16,
      textAlignVertical: 'top',
    },
    watermarkRemove: {
      color: theme.text,
      fontSize: 18,
      backgroundColor: 'red',
      textAlign: 'center',
      padding: 10,
      paddingBottom: 12,
      borderRadius: 10,
      marginTop: 20,
      fontFamily: 'Calibri-Medium',
    },
    errorText: {
      color: 'red',
      fontSize: 14,
      fontFamily: 'Calibri-Medium',
    },
  });
