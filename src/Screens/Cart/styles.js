import {StyleSheet} from 'react-native';

export const createCartStyles = theme =>
  StyleSheet.create({
    background: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.background,
    },
    header: {
      fontFamily: 'Outfit-bold',
      fontSize: 24,
      color: theme.text,
      textAlign: 'center',
    },
    container: {
      paddingHorizontal: 20,
      paddingVertical: 16,
      gap: 30,
      flexGrow: 1,
    },
    card: {
      width: '100%',
      flexGrow: 1,
      padding: 16,
      gap: 20,
      backgroundColor: theme.card,
      borderRadius: 20,
      borderWidth: 0.5,
      borderColor: theme.border,
      marginBottom: 20,
    },
    imageInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      gap: 20,
      height: 100,
      position: 'relative',
    },
    image: {
      width: 100,
      height: 100,
      resizeMode: 'cover',
    },
    imageDetails: {
      flex: 1,
      height: '100%',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      overflow: 'hidden',
    },

    title: {
      color: theme.text,
      fontFamily: 'Outfit-bold',
      fontSize: 18,
      flexShrink: 1,
      flexWrap: 'wrap',
    },

    owner: {
      color: '#888',
      fontFamily: 'Outfit-medium',
      fontSize: 14,
    },
    price: {
      color: theme.text,
      fontFamily: 'Outfit-medium',
      fontSize: 18,
      textAlign: 'right',
    },
    line: {
      width: '100%',
      height: 2,
      backgroundcolor: theme.text,
    },
    size: {
      color: theme.text,
      fontFamily: 'Outfit-medium',
      fontSize: 18,
    },
    paper: {
      color: theme.text,
      fontFamily: 'Outfit-medium',
      fontSize: 14,
    },
    otherOptions: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    btnContainer: {
      paddingHorizontal: 20,
      paddingVertical: 14,
    },
    removeIcon: {
      position: 'absolute',
      top: -24,
      right: -24,
      width: 36,
      height: 36,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      backgroundColor: '#ED3147',
    },
    emptyContainer: {
      flex: 1,
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      color: theme.text,
      opacity: 0.7,
      fontFamily: 'Outfit-medium',
      fontSize: 20,
    },
  });
