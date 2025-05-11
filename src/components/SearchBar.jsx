import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

const SearchBar = () => {
  return (
    <View style={style.searchRow}>
      <Icon name="search" size={20} color="#aaa" />
      <TextInput
        placeholder="Search"
        placeholderTextColor="#aaa"
        style={style.input}
      />
    </View>
  );
};

const style = StyleSheet.create({
  searchRow: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginBottom: 16,
    height: 50,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Outfit-regular',
  },
});

export default SearchBar;
