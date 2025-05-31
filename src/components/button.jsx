import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import React from 'react';

const Button = ({btnText, onPress, disabled = false}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={[styles.buttonText, disabled && styles.disabledText]}>
        {btnText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ea324a',
    paddingHorizontal: 20,
    paddingVertical: 18,
    alignSelf: 'center',
    width: '100%',
    borderRadius: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'CircularStd-Bold',
  },
  disabledText: {
    color: '#ccc',
  },
});

export default Button;
