/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, FlatList, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {styles} from './styles';
import SearchBar from '../../components/SearchBar';

const invoices = [
  {id: '0007', date: '28 July 2025', amount: '₹3200', status: 'Paid'},
  {id: '0327', date: '06 July 2025', amount: '₹1500', status: 'Pending'},
  {id: '0122', date: '18 June 2025', amount: '₹900', status: 'Paid'},
  {id: '0181', date: '14 Dec 2024', amount: '₹1200', status: 'Paid'},
  {id: '0052', date: '21 Sep 2024', amount: '₹2700', status: 'Paid'},
  {id: '0053', date: '21 Sep 2024', amount: '₹2700', status: 'Paid'},
  {id: '0054', date: '21 Sep 2024', amount: '₹2700', status: 'Paid'},
  {id: '0055', date: '21 Sep 2024', amount: '₹2700', status: 'Paid'},
  {id: '0056', date: '21 Sep 2024', amount: '₹2700', status: 'Paid'},
  {id: '0057', date: '21 Sep 2024', amount: '₹2700', status: 'Paid'},
  {id: '0058', date: '21 Sep 2024', amount: '₹2700', status: 'Paid'},
  {id: '0059', date: '21 Sep 2024', amount: '₹2700', status: 'Paid'},
  {id: '0060', date: '21 Sep 2024', amount: '₹2700', status: 'Paid'},
  {id: '0061', date: '21 Sep 2024', amount: '₹2700', status: 'Paid'},
  {id: '0062', date: '21 Sep 2024', amount: '₹2700', status: 'Paid'},
  {id: '0063', date: '21 Sep 2024', amount: '₹2700', status: 'Paid'},
  {id: '0064', date: '21 Sep 2024', amount: '₹2700', status: 'Paid'},
  {id: '0065', date: '21 Sep 2024', amount: '₹2700', status: 'Paid'},
  {id: '0066', date: '21 Sep 2024', amount: '₹2700', status: 'Paid'},
  {id: '0067', date: '21 Sep 2024', amount: '₹2700', status: 'Paid'},
];

const Invoices = () => {
  const renderItem = ({item}) => (
    <View style={styles.invoiceCard}>
      <View style={styles.row}>
        <Text style={styles.invoiceText}>CAP/2025-26/{item.id}</Text>
        <Text style={styles.amount}>{item.amount}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.date}>{item.date}</Text>
        <View
          style={[
            styles.statusBadge,
            item.status === 'Paid' ? styles.paid : styles.pending,
          ]}>
          <Text style={styles.invoiceStatus}>{item.status}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchBar/>

      <FlatList
        data={invoices}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: 16}}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Invoices;
