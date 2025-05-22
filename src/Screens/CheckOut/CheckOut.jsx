import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import React from 'react';
import {styles} from './styles';

const CheckOut = () => {
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Delivery Details</Text>
        <ScrollView></ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CheckOut;
