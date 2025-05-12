/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, FlatList, RefreshControl, ScrollView} from 'react-native';
import {styles} from './styles';
import SearchBar from '../../components/SearchBar';
import {useUserStore} from '../../store/auth';
import {API_URL} from '@env';

const Invoices = () => {
  const {user} = useUserStore();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    fetchInvoices();
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

  if (!loading && (!invoices || invoices?.length === 0)) {
    return (
      <ScrollView
        style={styles.notFoundContainer}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
            tintColor="#000"
          />
        }>
        <Text style={styles.notFoundTitle}>No Invoice Found</Text>
        <Text style={styles.notFoundDesc}>
          You have not received any invoice yet.
        </Text>
      </ScrollView>
    );
  }
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
      {!loading && invoices?.length > 0 && (
        <>
          <SearchBar />

          <FlatList
            data={invoices}
            keyExtractor={item => item._id}
            renderItem={renderItem}
            contentContainerStyle={{paddingBottom: 16}}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={handleRefresh}
                tintColor="#000"
              />
            }
          />
        </>
      )}
    </View>
  );
};

export default Invoices;
