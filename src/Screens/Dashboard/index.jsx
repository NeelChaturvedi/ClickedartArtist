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
  const monthlyData = stats?.monthlyData || [];
  const salesData = monthlyData.map(data => data.sales);
  const royaltyData = monthlyData.map(data => data.royaltyAmount);
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const months = monthlyData.map(data => `${monthNames[data.month ? (data.month - 1) : 0]}`);

  const fetchStats = useCallback(async () => {
    if (!user._id) {
      return;
    }
    try {
      setLoading(true);
      const res = await api.get(
        `/photographeranalytics/get-photographer-analytics?photographer=${user._id}`,
      );
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
                labels: months,
                datasets: [
                  {
                    label: 'Sales',
                    data: salesData,
                    color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // bright red line
                    strokeWidth: 2,
                    fill: true,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  },
                  {
                    label: 'Royalty Amount',
                    data: royaltyData,
                    color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`, // bright blue line
                    strokeWidth: 2,
                    fill: false,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                  },
                ],
              }}
              width={Dimensions.get('window').width - 64}
              height={220}
              yAxisLabel="₹"
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: '#1e1e1e',
                // backgroundGradientFrom: '#1e1e1e',
                // backgroundGradientTo: '#ffa726',
                decimalPlaces: 2,
                color: () => `rgba(255, 255, 255, 0.3)`,
                labelColor: () => `rgba(255, 255, 255, 0.7)`,
                style: {borderRadius: 16},
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffffff', // This applies to all dots
                },
              }}
              bezier
              style={{
                borderRadius: 12,
                borderWidth: 1,
                borderColor: 'white',
                padding: 16,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
