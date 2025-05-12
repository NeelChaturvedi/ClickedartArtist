import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {style} from './styles';
import FilterDate from '../../components/FilterDate';
import {ScrollView} from 'moti';
import {Text, View} from 'react-native';
import Values from '../../components/Values';

const Dashboard = () => {
  return (
    <SafeAreaView style={style.background}>
      <FilterDate />
      <ScrollView>
        <View style={style.sections}>
          <Text style={style.title}>REVENUE OVERVIEW</Text>
          <View gap={14}>
            <Values heading={'DIGITAL SALE(S)'} value={51} />
            <Values heading={'PRINT SALE(S)'} value={9} />
            <Values heading={'ACTIVE BUYER(S)'} value={15} />
          </View>
        </View>
        <View style={style.sections}>
          <Text style={style.title}>SALES METRICS</Text>
          <View gap={14}>
            <Values heading={'TOTAL DIGITAL SALES'} value={51} />
            <Values heading={'TOTAL PRINT SALES'} value={9} />
          </View>
        </View>
        <View style={style.sections}>
          <Text style={style.title}>EARNING</Text>
          <View gap={14}>
            <Values heading={'TOTAL DIGITAL ROYALTY AMOUNT'} value={51} />
            <Values heading={'TOTAL PRINT ROYALTY AMOUNT'} value={9} />
            <Values heading={'TOTAL REFERRAL AMOUNT'} value={9} />
            <Values heading={'TOTAL PAID AMOUNT'} value={9} />
          </View>
        </View>
        <View style={style.sections}>
          <Text style={style.title}>PHOTOS</Text>
          <View gap={14}>
            <Values heading={'APPROVED'} value={51} />
            <Values heading={'PENDING'} value={9} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
