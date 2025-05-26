import {StyleSheet} from 'react-native';

export const createSettingStyles = (theme) =>
  StyleSheet.create({
    background: {
      backgroundColor: theme.background,
      flex: 1,
      width: '100%',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      gap: 10,
      alignItems: 'center',
      paddingTop: 16,
      position: 'relative',
      width: '100%',
      paddingHorizontal: 16,
      paddingBottom: 30,
    },
    headingText: {
      fontFamily: 'Outfit-bold',
      fontSize: 32,
      color: theme.text,
    },
    settingsItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingVertical: 20,
      paddingHorizontal: 16,
    },
    options: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '50%',
      gap: 20,
    },
    itemText: {
      fontFamily: 'Outfit-regular',
      fontSize: 16,
      color: theme.text,
    },
    iconContainer: {
      height: 30,
      width: 30,
      flex: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
