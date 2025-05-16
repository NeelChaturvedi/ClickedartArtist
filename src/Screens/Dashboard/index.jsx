import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {style} from './styles';
import FilterDate from '../../components/FilterDate';
import {ScrollView} from 'moti';
import {Dimensions, Text, View} from 'react-native';
import Values from '../../components/Values';
import api from '../../utils/apiClient';
import {useUserStore} from '../../store/auth';
import {LineChart} from 'react-native-chart-kit';

const Dashboard = () => {
  const {user} = useUserStore();
  const [stats, setStats] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: '',
  });
  const [isCustomDate, setIsCustomDate] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchStats = useCallback(async () => {
    if (!user._id) {
      return;
    }
    try {
      setLoading(true);
      const res = await api.get(
        `/photographeranalytics/get-photographer-analytics?photographer=${user._id}`,
      );
      console.log('Stats:', res.data);
      setStats(res.data);
      setIsCustomDate(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user._id]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);
  return (
    <SafeAreaView style={style.background}>
      <FilterDate />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.sections}>
          <Text style={style.title}>SALES METRICS</Text>
          <View gap={14}>
            <Values
              heading={'DIGITAL SALE(S)'}
              value={stats?.totalDigitalDownloads || 0}
            />
            <Values
              heading={'PRINT SALE(S)'}
              value={stats?.totalPrintDownloads || 0}
            />
            <Values
              heading={'ACTIVE BUYER(S)'}
              value={stats?.activeBuyers || 0}
            />
          </View>
        </View>
        <View style={style.sections}>
          <Text style={style.title}>REVENUE OVERVIEW</Text>
          <View gap={14}>
            <Values
              heading={'TOTAL DIGITAL SALES'}
              value={'₹' + (stats?.totalSales || 0)}
            />
            <Values
              heading={'TOTAL PRINT SALES'}
              value={'₹' + (stats?.totalPrintSales || 0)}
            />
          </View>
        </View>
        <View style={style.sections}>
          <Text style={style.title}>EARNING</Text>
          <View gap={14}>
            <Values
              heading={'TOTAL DIGITAL ROYALTY AMOUNT'}
              value={'₹' + (stats?.totalRoyaltyAmount || 0)}
            />
            <Values
              heading={'TOTAL PRINT ROYALTY AMOUNT'}
              value={'₹' + (stats?.totalPrintCutAmount || 0)}
            />
            <Values
              heading={'TOTAL REFERRAL AMOUNT'}
              value={'₹' + (stats?.totalReferralAmount || 0)}
            />
            <Values
              heading={'TOTAL PAID AMOUNT'}
              value={'₹' + (stats?.totalPaidAmount || 0)}
            />
          </View>
        </View>
        <View style={style.sections}>
          <Text style={style.title}>PHOTOS</Text>
          <View gap={14}>
            <Values
              heading={'APPROVED'}
              value={stats?.totalUploadingImgCount || 0}
            />
            <Values
              heading={'PENDING'}
              value={stats?.pendingImagesCount || 0}
            />
          </View>
        </View>
        <View style={style.sections}>
          <Text style={style.title}>SALES AND ROYALTY AMOUNT MONTHLY</Text>
          <View>
            <Text>Bezier Line Chart</Text>
            <LineChart
              data={{
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                ],
                datasets: [
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ],
                  },
                ],
              }}
              width={Dimensions.get('window').width} // from react-native
              height={220}
              yAxisLabel="$"
              yAxisSuffix="k"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
