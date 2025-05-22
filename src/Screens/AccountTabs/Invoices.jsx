/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {styles} from './styles';
import SearchBar from '../../components/SearchBar';
import {useUserStore} from '../../store/auth';
import api from '../../utils/apiClient';
import SlideUpModal from '@components/SlideupModal';
import {Share} from 'react-native';

const Invoices = () => {
  const {user} = useUserStore();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [slideUp, setSlideUp] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const onShare = async () => {
    await Share.share({
      message: `Check out this invoice: https://clickedart.com/invoice/${selectedInvoice?._id}`,
    });
  };

  const imageOptions = [
    {
      label: 'Open',
      icon: 'open-in-new',
    },
    {
      label: 'Download',
      icon: 'download',
    },
    {
      label: 'Share',
      icon: 'share',
      onPress: () => {
        onShare();
      },
    },
  ];

  const handleRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchInvoices();
    setRefreshing(false);
  }, [fetchInvoices]);

  const fetchInvoices = useCallback(async () => {
    if (!user?._id) {
      return;
    }
    try {
      setLoading(true);
      const res = await api.get(
        `/photographeranalytics/get-photographer-analytics?photographer=${user._id}`,
      );
      setInvoices(res.data.payoutHistory);
    } catch (error) {
      console.log('Failed to fetch invoices:', error.response);
    } finally {
      setLoading(false);
    }
  }, [user?._id]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const renderItem = ({item}) => (
    <Pressable
      onPress={() => {
        setSlideUp(true);
        setSelectedInvoice(item);
      }}
      style={styles.invoiceCard}>
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
    </Pressable>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <View>
          <ActivityIndicator size="large" color="#ED3147" />
        </View>
      </View>
    );
  }

  if (!loading && (!invoices || invoices?.length === 0)) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.notFoundContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
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

      <SlideUpModal
        visible={slideUp}
        onClose={() => setSlideUp(false)}
        options={imageOptions}
      />
    </View>
  );
};

export default Invoices;
