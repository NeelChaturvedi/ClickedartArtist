import React, {useState} from 'react';
import {TextInput, StyleSheet} from 'react-native';

const AutoGrowTextInput = ({value, onChangeText, placeholder}) => {
  const [height, setHeight] = useState(50);

  return (
    <TextInput
      style={[styles.input, {height: Math.max(45, height)}]}
      multiline
      placeholder={placeholder}
      onContentSizeChange={event => {
        setHeight(event.nativeEvent.contentSize.height);
      }}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: 'white',
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 16,
    fontSize: 16,
    textAlignVertical: 'top',
    fontFamily: 'Outfit-regular',
    color: 'white',
  },
});

export default AutoGrowTextInput;
