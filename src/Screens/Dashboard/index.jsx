/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createDashboardStyles} from './styles';
import FilterDate from '../../components/FilterDate';
import {ScrollView} from 'moti';
import {Dimensions, RefreshControl, Text, View} from 'react-native';
import Values from '../../components/Values';
import api from '../../utils/apiClient';
import {useUserStore} from '../../store/auth';
import {LineChart} from 'react-native-chart-kit';
import Button from '@components/button';
import {useTheme} from 'src/themes/useTheme';
import DashboardSkeleton from './Loader';

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
  const salesData = monthlyData.map(
    data => data.sales + data.printCutAmount * 10,
  );
  const royaltyData = monthlyData.map(
    data => data.royaltyAmount + data.printCutAmount,
  );
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

  const theme = useTheme();
  const style = useMemo(() => createDashboardStyles(theme), [theme]);

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
      setDateRange({
        startDate: '',
        endDate: '',
      });
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
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  }, [dateRange.endDate, dateRange.startDate, user._id]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (loading) {
    return (
      <SafeAreaView style={style.background}>
        <DashboardSkeleton />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={style.background}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              if (isCustomDate) {
                fetchCustomStats();
              } else {
                fetchStats();
              }
            }}
          />
        }
        contentContainerStyle={{gap: 20}}
        showsVerticalScrollIndicator={false}>
        <View gap={20}>
          <FilterDate
            dateRange={dateRange}
            setDateRange={setDateRange}
            fetchCustomStats={fetchCustomStats}
          />
          {isCustomDate && (
            <Button
              btnText={'Fetch Overall'}
              onPress={() => {
                fetchStats();
              }}
            />
          )}
        </View>
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
        <View style={style.sections}>
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
        {stats?.monthlyData && stats?.monthlyData.length > 0 && (
          <View style={style.sections}>
            <Text style={style.title}>Monthly Growth Report</Text>
            <View gap={30}>
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
                width={300}
                height={220}
                yAxisLabel="₹"
                yAxisInterval={1}
                chartConfig={{
                  backgroundGradientFrom: theme.card,
                  backgroundGradientTo: theme.card,
                  decimalPlaces: 2,
                  color: () => '#AAAAAA',
                  labelColor: () => '#888888',
                  style: {borderRadius: 16},
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: theme.text,
                  },
                }}
                bezier
              />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
