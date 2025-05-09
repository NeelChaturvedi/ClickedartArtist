import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const TabCatalogues = () => {
  return (
    <View>
      <View style={style.catalogueBorder}></View>
    </View>
  );
};

const style = StyleSheet.create({
  catalogueBorder: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    width: '100%',
    height: 190,
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginRight: 10,
  },
})

export default TabCatalogues;
