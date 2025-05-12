import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Details = ({heading, value}) => {
  return (
    <View style={style.sections}>
      <View style={style.content}>
        <Text style={style.heading}>{heading}</Text>
        <Text style={style.value}>{value}</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 0.3,
    borderColor: 'white',
  },
  heading: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Outfit-medium',
  },
  value: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Outfit-medium',
  },
});

export default Details;
