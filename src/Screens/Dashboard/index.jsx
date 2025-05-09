/* eslint-disable react-native/no-inline-styles */
import {Text, SafeAreaView} from 'react-native';
import React from 'react';
import { style } from './styles';

const Dashboard = () => {
  return (
    <SafeAreaView style={style.background}>
      <Text style={{color: '#fff'}}>Profile</Text>
    </SafeAreaView>
  );
};

export default Dashboard;
