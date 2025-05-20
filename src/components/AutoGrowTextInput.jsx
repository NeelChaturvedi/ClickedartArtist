import React, {useState} from 'react';
import {TextInput, StyleSheet} from 'react-native';

const AutoGrowTextInput = ({value, onChangeText, placeholder, keyboardType}) => {
  const [height, setHeight] = useState(50);

  return (
    <TextInput
      style={[styles.input, {height: Math.max(45, height)}]}
      multiline
      placeholder={placeholder}
      placeholderTextColor={'#888'}
      onContentSizeChange={event => {
        setHeight(event.nativeEvent.contentSize.height);
      }}
      placeholderTextColor={'#888'}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
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
