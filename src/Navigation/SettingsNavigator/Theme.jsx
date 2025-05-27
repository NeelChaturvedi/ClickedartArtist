import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from 'src/themes/useTheme';
import {useThemeStore} from 'src/store/useThemeStore';

const Theme = () => {
  const themeColors = useTheme();
  const {userPreference, setTheme} = useThemeStore();
  const styles = getStyles(themeColors);

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.radioContainer}
          onPress={() => setTheme('light')}>
          <View
            style={[
              styles.radio,
              userPreference === 'light' && styles.selected,
            ]}
          />
          <Text style={styles.label}>Light</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioContainer}
          onPress={() => setTheme('dark')}>
          <View
            style={[styles.radio, userPreference === 'dark' && styles.selected]}
          />
          <Text style={styles.label}>Dark</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioContainer}
          onPress={() => setTheme('system')}>
          <View
            style={[
              styles.radio,
              userPreference === 'system' && styles.selected,
            ]}
          />
          <Text style={styles.label}>System</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: 'flex-start',
      paddingTop: 20,
      alignItems: 'center',
    },
    container: {
      width: '80%',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 20,
      textAlign: 'center',
    },
    radioContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    radio: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: theme.text,
      marginRight: 10,
    },
    selected: {
      backgroundColor: theme.text,
    },
    label: {
      fontSize: 16,
      color: theme.text,
    },
  });

export default Theme;
