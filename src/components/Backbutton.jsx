import { StyleSheet, Pressable } from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const BackButton = ({}) => {
    const navigation = useNavigation();

  return (
    <Pressable style={styles.background} onPress={navigation.goBack}>
      <Feather name="chevron-left" size={20} color="black" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    height: 30,
    width: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BackButton;
