import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import { useTheme } from 'src/themes/useTheme';

const Values = ({heading, value}) => {
  const theme = useTheme();
  const style = getStyles(theme);

  return (
    <View style={style.sections}>
      <View style={style.content}>
        <View style={style.heading}>
          <Text style={style.headingText}>{heading}</Text>
        </View>
        <View style={style.value}>
          <Text style={style.valueText}>{value}</Text>
        </View>
      </View>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.card,
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 0.3,
    borderColor: theme.border,
    width: '100%',
  },
  heading: {
    width: '50%',
    flex: 1,
    alignItems: 'flex-start',
  },
  headingText: {
    fontSize: 18,
    lineHeight: 24,
    color: theme.text,
    fontFamily: 'Outfit-medium',
  },
  value: {
    width: '50%',
    flex: 1,
    alignItems: 'flex-end',
  },
  valueText: {
    fontSize: 20,
    lineHeight: 24,
    color: theme.text,
    fontFamily: 'Outfit-medium',
  },
});

export default Values;
