/* eslint-disable react-native/no-inline-styles */
import React, {use, useCallback, useEffect, useState} from 'react';
import {View, Text, FlatList, TextInput, RefreshControl} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {styles} from './styles';
import SearchBar from '../../components/SearchBar';
import {useUserStore} from '../../store/auth';
import {API_URL} from '@env';

const Invoices = () => {
  const {user} = useUserStore();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchInvoices();
    setRefreshing(false);
  };

  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/api/photographeranalytics/get-photographer-analytics?photographer=${user._id}`,
      );
      const data = await response.json();
      console.log('Invoices:', data);
      setInvoices(data.payoutHistory);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [user._id]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);
  const renderItem = ({item}) => (
    <View style={styles.invoiceCard}>
      <View style={styles.row}>
        <Text style={styles.invoiceText}>{item.invoiceId}</Text>
        <Text style={styles.amount}>&#8377;{item.totalAmountPayable}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.date}>
          {item.createdAt &&
            new Date(item.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
            })}
        </Text>
        <View
          style={[
            styles.statusBadge,
            item.paymentStatus === 'paid' ? styles.paid : styles.pending,
          ]}>
          <Text style={styles.invoiceStatus}>{item.paymentStatus}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchBar />

      <FlatList
        data={invoices}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: 16}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#000"
          />
        }
      />
    </View>
  );
};

export default Invoices;
