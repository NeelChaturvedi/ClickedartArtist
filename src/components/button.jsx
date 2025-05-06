import {Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';

const Button = ({btnText, onPress}) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{btnText}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ea324a',
    paddingHorizontal: 20,
    paddingVertical: 18,
    alignSelf: 'center',
    width: '84%',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Outfit-bold',
  },
});

export default Button;
