import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {style} from './styles';
import FilterDate from '../../components/FilterDate';

const Dashboard = () => {
  return (
    <SafeAreaView style={style.background}>
      <FilterDate />
    </SafeAreaView>
  );
};

export default Dashboard;
