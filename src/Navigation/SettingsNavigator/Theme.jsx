import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import { useTheme } from 'src/themes/useTheme';

const Theme = () => {

    const theme = useTheme();
    const styles = getStyles(theme);
  return <SafeAreaView style={styles.background}></SafeAreaView>;
};

const getStyles = theme => StyleSheet.create({
    background:{
        height: '100%',
        width: '100%',
        backgroundColor: theme.background,
    },
});
export default Theme;
