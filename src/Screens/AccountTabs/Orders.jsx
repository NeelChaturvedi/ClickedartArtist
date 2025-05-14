import React from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {styles} from './styles';
// import SearchBar from '../../components/SearchBar';
import {useUserStore} from '../../store/auth';
import api from '../../utils/apiClient';

const Orders = () => {
  const {user} = useUserStore();
  const [orders, setOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchOrders = React.useCallback(async () => {
    if (!user?._id) {
      return;
    }
    try {
      setLoading(true);
      const res = await api.get(
        `/download/get-my-orders?userId=${user?._id}&pageSize=10`,
      );
      console.log('Orders:', res.data);
      setOrders(res.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const onRefresh = React.useCallback(async () => {
    await fetchOrders();
  }, [fetchOrders]);

  React.useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!loading && (!orders || orders?.length === 0)) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.notFoundContainer}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            tintColor="#000"
          />
        }>
        <Text style={styles.notFoundTitle}>No Orders Found</Text>
        <Text style={styles.notFoundDesc}>
          You have not placed any orders yet.
        </Text>
      </ScrollView>
    );
  }

  const renderItem = ({item}) => (
    <View style={styles.orderCard}>
      {item.orderItems?.map((orderItem, index) => (
        <View key={index} style={styles.cardContent}>
          <View style={styles.textSection}>
            <Text style={styles.title}>{orderItem.imageInfo.image.title}</Text>
            <Text style={styles.orderType}>
              Order Type -{' '}
              {item.printStatus === 'no-print' ? 'Digital' : 'Print'}
            </Text>
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                backgroundColor:
                  item.printStatus === 'no-print' ||
                  item.printStatus === 'completed' ||
                  item.printStatus === 'delivered'
                    ? '#63D471'
                    : item.printStatus === 'pending' ||
                      item.printStatus === 'processing'
                    ? '#FFB800'
                    : item.printStatus === 'cancelled' ||
                      item.printStatus === 'returned'
                    ? //light blue
                      '#FF3D00'
                    : '#00BFFF',
                paddingHorizontal: 12,
                paddingVertical: 4,
                borderRadius: 12,
                alignSelf: 'flex-start',
              }}>
              <Text style={styles.statusText}>
                {item.printStatus === 'no-print'
                  ? item.orderStatus
                  : item.printStatus}
              </Text>
            </View>
          </View>
          <Image
            source={{uri: orderItem.imageInfo.image.imageLinks?.thumbnail}}
            style={styles.image}
          />
        </View>
      ))}

      <View style={styles.metaSection}>
        <View style={styles.shippingSection}>
          <Text style={styles.metaLabel}>SHIPPING ADDRESS</Text>
          <Text style={styles.metaText}>{`${
            item.shippingAddress?.address &&
            `${item.shippingAddress?.address}, `
          }${item.shippingAddress?.area && `${item.shippingAddress?.area}, `}${
            item.shippingAddress?.city
          }, ${item.shippingAddress?.state}`}</Text>
        </View>
        <View style={styles.dateSection}>
          <Text style={styles.metaLabel}>DATE</Text>
          <Text style={styles.metaText}>
            {item.createdAt &&
              new Date(item.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <SearchBar /> */}
      {!loading && orders?.length > 0 && (
        <FlatList
          data={orders}
          keyExtractor={item => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={onRefresh}
              tintColor="#000"
            />
          }
        />
      )}
    </View>
  );
};

export default Orders;
