import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Values = ({heading, value}) => {
  return (
    <View style={style.sections}>
      <View style={style.content}>
        <View style={style.heading}><Text style={style.headingText}>{heading}</Text></View>
        <View style={style.value}><Text style={style.valueText}>{value}</Text></View>
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
    width: '100%',
  },
  heading:{
    width: '50%',
    flex: 1,
    alignItems: 'flex-start',
  },
  headingText: {
    fontSize: 18,
    lineHeight: 24,
    color: 'white',
    fontFamily: 'Outfit-medium',
  },
  value:{
    width: '50%',
    flex: 1,
    alignItems: 'flex-end',
  },
  valueText: {
    fontSize: 20,
    lineHeight: 24,
    color: 'white',
    fontFamily: 'Outfit-medium',
  },
});

export default Values;
