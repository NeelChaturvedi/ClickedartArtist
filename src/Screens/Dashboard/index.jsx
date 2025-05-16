/* eslint-disable react-native/no-inline-styles */
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
  const months = monthlyData.map(
    data => `${monthNames[data.month ? data.month - 1 : 0]}`,
  );
  const months = monthlyData.map(
    data => `${monthNames[data.month ? data.month - 1 : 0]}`,
  );

  const fetchStats = useCallback(async () => {
    if (!user._id) {
      return;
    }
    try {
      setLoading(true);
      const res = await api.get(
        `/photographeranalytics/get-photographer-analytics?photographer=${user._id}`,
      );
      console.log(res.data);
      setStats(res.data);
      setIsCustomDate(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user._id]);

  const fetchCustomStats = useCallback(async () => {
    if (!user._id) {
      return;
    }
    try {
      setLoading(true);
      const res = await api.get(
        `/photographeranalytics/custom-analytics-by-date?photographer=${user._id}&startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`,
      );
      setStats(res.data);
      setIsCustomDate(true);
      console.log(res.data);
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  }, [dateRange.endDate, dateRange.startDate, user._id]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);
  return (
    <SafeAreaView style={style.background}>
      <FilterDate
        dateRange={dateRange}
        setDateRange={setDateRange}
        fetchCustomStats={fetchCustomStats}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.sections}>
          {isCustomDate ? (
            <Text style={style.smallText}>
              {dateRange.startDate &&
                new Date(dateRange.startDate).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}{' '}
              -{' '}
              {dateRange.endDate &&
                new Date(dateRange.endDate).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
            </Text>
          ) : (
            <Text style={style.smallText}>Overall Data</Text>
          )}
          <Text style={style.title}>SALES METRICS</Text>
          <View gap={14}>
            <Values
              heading={'Digital Sale(s)'}
              value={stats?.totalDigitalDownloads || 0}
            />
            <Values
              heading={'Print Sale(s)'}
              value={stats?.totalPrintDownloads || 0}
            />
            <Values
              heading={'Active Buyer(s)'}
              value={stats?.activeBuyers || 0}
            />
          </View>
        </View>
        <View style={style.sections}>
          <Text style={style.title}>REVENUE OVERVIEW</Text>
          <View gap={14}>
            <Values
              heading={'Total Digital Sales'}
              value={'₹' + (stats?.totalSales || 0)}
            />
            <Values
              heading={'Total Print Sales'}
              value={'₹' + (stats?.totalPrintSales || 0)}
            />
          </View>
        </View>
        <View style={style.sections}>
          <Text style={style.title}>EARNING</Text>
          <View gap={14}>
            <Values
              heading={'Total Digital Royalty Amount'}
              value={'₹' + (stats?.totalRoyaltyAmount || 0)}
            />
            <Values
              heading={'Total Print Royalty Amount'}
              value={'₹' + (stats?.totalPrintCutAmount || 0)}
            />
            <Values
              heading={'Total Referral Amount'}
              value={'₹' + (stats?.totalReferralAmount || 0)}
            />
            <Values
              heading={'Total Paid Amount'}
              value={'₹' + (stats?.totalPaidAmount || 0)}
            />
          </View>
        </View>
        <View style={style.sections}>
          <Text style={style.title}>PHOTOS</Text>
          <View gap={14}>
            <Values
              heading={'Approved'}
              value={stats?.totalUploadingImgCount || 0}
            />
            <Values
              heading={'Pending'}
              value={stats?.pendingImagesCount || 0}
            />
          </View>
        </View>
        <View style={style.sections}>
          <Text style={style.title}>MONTHLY GROWTH REPORT</Text>
          <View gap={16}>
            <View style={style.typeContainer}>
              <View style={style.growthType}>
                <View
                  style={[
                    style.growthTypeIndicator,
                    {
                      backgroundColor: '#FF6384',
                      opacity: 0.6,
                      borderWidth: 4,
                      borderColor: '#FF6384',
                    },
                  ]}
                />
                <Text style={style.growthText}>Sales</Text>
              </View>
              <View style={style.growthType}>
                <View
                  style={[
                    style.growthTypeIndicator,
                    {
                      backgroundColor: '#36A2EB',
                      opacity: 0.6,
                      borderWidth: 4,
                      borderColor: '#36A2EB',
                    },
                  ]}
                />
                <Text style={style.growthText}>Royalty Amount</Text>
              </View>
            </View>
            {stats?.monthlyData ? (
              <LineChart
                data={{
                  labels: months,
                  datasets: [
                    {
                      label: 'Sales',
                      data: salesData,
                      color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
                      strokeWidth: 2,
                      fill: true,
                      backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    },
                    {
                      label: 'Royalty Amount',
                      data: royaltyData,
                      color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`,
                      strokeWidth: 2,
                      fill: false,
                      backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    },
                  ],
                }}
                width={Dimensions.get('window').width - 41}
                height={220}
                yAxisLabel="₹"
                yAxisInterval={1}
                chartConfig={{
                  backgroundGradientFrom: '#1E1E1E',
                  backgroundGradientTo: '#1E1E1E',
                  decimalPlaces: 2,
                  color: () => 'rgba(255, 255, 255, 0.3)',
                  labelColor: () => 'rgba(255, 255, 255, 0.7)',
                  style: {borderRadius: 16},
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#ffffff',
                  },
                }}
                bezier
                style={{
                  borderRadius: 12,
                  borderWidth: 0.5,
                  borderColor: 'white',
                }}
              />
            ) : (
              <Text style={{color: 'white', textAlign: 'center'}}>
                No data available
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
