import React, {useState} from 'react';
import {TextInput, StyleSheet} from 'react-native';
import { useTheme } from 'src/themes/useTheme';

const AutoGrowTextInput = ({value, onChangeText, placeholder, keyboardType, editable}) => {
  const [height, setHeight] = useState(50);

    const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <TextInput
      style={[styles.input,
        // {height: Math.max(45, height)}
      ]}
      multiline
      placeholder={placeholder}
      placeholderTextColor={'#888'}
      // onContentSizeChange={event => {
      //   setHeight(event.nativeEvent.contentSize.height);
      // }}
      value={value}
      editable={editable}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
  );
};

const getStyles = (theme) => StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: theme.border,
    backgroundColor: theme.card,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 16,
    fontSize: 16,
    textAlignVertical: 'top',
    fontFamily: 'Calibri-Regular',
    color: theme.text,
  },
});

export default AutoGrowTextInput;
