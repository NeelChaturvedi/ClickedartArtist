import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {style} from './styles';
import FilterDate from '../../components/FilterDate';
import {ScrollView} from 'moti';
import {Text, View} from 'react-native';
import Details from '../../components/Details';

const Dashboard = () => {
  return (
    <SafeAreaView style={style.background}>
      <FilterDate />
      <ScrollView>
        <View style={style.sections}>
          <Text style={style.title}>REVENUE OVERVIEW</Text>
          <View gap={14}>
            <Details heading={'DIGITAL SALE(S)'} value={51} />
            <Details heading={'PRINT SALE(S)'} value={9} />
            <Details heading={'ACTIVE BUYER(S)'} value={15} />
          </View>
        </View>
        <View style={style.sections}>
          <Text style={style.title}>SALES METRICS</Text>
          <View gap={14}>
            <Details heading={'TOTAL DIGITAL SALES'} value={51} />
            <Details heading={'TOTAL PRINT SALES'} value={9} />
          </View>
        </View>
        <View style={style.sections}>
          <Text style={style.title}>EARNING</Text>
          <View gap={14}>
            <Details heading={'TOTAL DIGITAL ROYALTY AMOUNT'} value={51} />
            <Details heading={'TOTAL PRINT ROYALTY AMOUNT'} value={9} />
            <Details heading={'TOTAL REFERRAL AMOUNT'} value={9} />
            <Details heading={'TOTAL PAID AMOUNT'} value={9} />
          </View>
        </View>
        <View style={style.sections}>
          <Text style={style.title}>PHOTOS</Text>
          <View gap={14}>
            <Details heading={'APPROVED'} value={51} />
            <Details heading={'PENDING'} value={9} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
