import React, {useState} from 'react';
import {TextInput, StyleSheet} from 'react-native';

const AutoGrowTextInput = () => {
  const [height, setHeight] = useState(50);

  return (
    <TextInput
      style={[styles.input, {height: Math.max(45, height)}]}
      multiline
      onContentSizeChange={event => {
        setHeight(event.nativeEvent.contentSize.height);
      }}/>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: 'white',
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 10,
    fontSize: 18,
    textAlignVertical: 'top',
    fontFamily: 'Outfit-regular',
  },
});

export default AutoGrowTextInput;
