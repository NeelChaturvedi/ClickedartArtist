/* eslint-disable react-native/no-inline-styles */
import {Text, View} from 'react-native';
import React from 'react';
import {style} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

const Dashboard = () => {
  return (
    <SafeAreaView style={style.background}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 20,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '40%',
            height: 60,
            borderRadius: 10,
            backgroundColor: '#1e1e1e',
          }}>
          <Text
            style={{color: 'white', fontFamily: 'Outfit-medium', fontSize: 20}}>
            Start Date
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '40%',
            height: 60,
            borderRadius: 10,
            backgroundColor: '#1e1e1e',
          }}>
          <Text
            style={{color: 'white', fontFamily: 'Outfit-medium', fontSize: 20}}>
            End Date
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
