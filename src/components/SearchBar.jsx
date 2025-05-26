// SearchBar.js

import {View, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useTheme} from 'src/themes/useTheme';

const SearchBar = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.searchRow}>
      <Icon name="search" size={20} color={'#888'} />
      <TextInput
        placeholder="Search"
        placeholderTextColor={'#888'}
        style={styles.input}
      />
    </View>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    searchRow: {
      flexDirection: 'row',
      backgroundColor: theme.card,
      borderRadius: 10,
      paddingHorizontal: 12,
      alignItems: 'center',
      marginBottom: 16,
      height: 50,
    },
    input: {
      flex: 1,
      marginLeft: 10,
      color: theme.text,
      fontSize: 16,
      fontFamily: 'Outfit-regular',
    },
  });

export default SearchBar;
