import React from 'react';
import {Text, View, Image, FlatList} from 'react-native';
import {styles} from './styles';
import SearchBar from '../../components/SearchBar';

const Orders = () => {
  const orders = [
    {
      id: 1,
      title: 'Red wattled pigeon',
      type: 'PRINT',
      status: 'Shipped',
      Address: '154/12-D, B-Block, Bhootnath, Indiranagar, Lucknow, UP',
      date: '20-03-2024',
      image: require('../../assets/images/onboarding.png'),
    },
    {
      id: 2,
      title: 'Red wattled pigeon',
      type: 'PRINT',
      status: 'Shipped',
      Address: '154/12-D, B-Block, Bhootnath, Indiranagar, Lucknow, UP',
      date: '20-03-2024',
      image: require('../../assets/images/onboarding.png'),
    },
    {
      id: 3,
      title: 'Red wattled pigeon',
      type: 'PRINT',
      status: 'Shipped',
      Address: '154/12-D, B-Block, Bhootnath, Indiranagar, Lucknow, UP',
      date: '20-03-2024',
      image: require('../../assets/images/onboarding.png'),
    },
    {
      id: 4,
      title: 'Red wattled pigeon',
      type: 'PRINT',
      status: 'Shipped',
      Address: '154/12-D, B-Block, Bhootnath, Indiranagar, Lucknow, UP',
      date: '20-03-2024',
      image: require('../../assets/images/onboarding.png'),
    },
    {
      id: 5,
      title: 'Red wattled pigeon',
      type: 'PRINT',
      status: 'Shipped',
      Address: '154/12-D, B-Block, Bhootnath, Indiranagar, Lucknow, UP',
      date: '20-03-2024',
      image: require('../../assets/images/onboarding.png'),
    },
    {
      id: 6,
      title: 'Red wattled pigeon',
      type: 'PRINT',
      status: 'Shipped',
      Address: '154/12-D, B-Block, Bhootnath, Indiranagar, Lucknow, UP',
      date: '20-03-2024',
      image: require('../../assets/images/onboarding.png'),
    },
  ];

  const renderItem = ({item}) => (
    <View style={styles.orderCard}>
      <View style={styles.cardContent}>
        <View style={styles.textSection}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.orderType}>Order Type - {item.type}</Text>
          <View style={styles.statusTag}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
        <Image source={item.image} style={styles.image} />
      </View>

      <View style={styles.metaSection}>
        <View style={styles.shippingSection}>
          <Text style={styles.metaLabel}>SHIPPING ADDRESS</Text>
          <Text style={styles.metaText}>
            {item.Address}
          </Text>
        </View>
        <View style={styles.dateSection}>
          <Text style={styles.metaLabel}>DATE</Text>
          <Text style={styles.metaText}>{item.date}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchBar/>
      <FlatList
        data={orders}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default Orders;
