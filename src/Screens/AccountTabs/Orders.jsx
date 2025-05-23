/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
  Pressable,
  Modal,
} from 'react-native';
import {styles} from './styles';
import {useUserStore} from '../../store/auth';
import api from '../../utils/apiClient';
import SlideUpModal from '@components/SlideupModal';
import AutoGrowTextInput from '@components/AutoGrowTextInput';
import Button from '@components/button';
import DropdownModal from '@components/DropdownModal';
import Icon from 'react-native-vector-icons/FontAwesome';

const Orders = () => {
  const {user} = useUserStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slideUp, setSlideUp] = useState(false);
  const [shipment, setShipment] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [supportModal, setSupportModal] = useState(false);
  const [trackModal, setTrackModal] = useState(false);

  const fetchOrders = useCallback(async () => {
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
      console.log('Error fetching orders:', error.response);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const fetchShipment = async waybill => {
    try {
      const response = await api.get(
        `/delivery/track-shipment?waybill=${waybill}`,
      );
      setShipment(response.data.ShipmentData[0].Shipment);
    } catch (error) {
      console.log(error);
      setShipment({});
    }
  };

  const onRefresh = useCallback(async () => {
    await fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const imageOptions = [
    {
      label: 'Track Order',
      icon: 'location-on',
      onPress: () => {
        fetchShipment(selectedOrder?.waybill);
        setTrackModal(true);
      },
    },
    {
      label: 'Order Support',
      icon: 'contact-support',
      onPress: () => {
        setSupportModal(true);
      },
    },
    {
      label: 'Invoice',
      icon: 'receipt',
    },
  ];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <View>
          <ActivityIndicator size="large" color="#ED3147" />
        </View>
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
    <Pressable
      onPress={() => {
        setSelectedOrder(item);
        setSlideUp(true);
      }}
      style={styles.orderCard}>
      {item.orderItems?.map((orderItem, index) => (
        <View key={index} style={styles.cardContent}>
          <View style={styles.textSection}>
            <Text style={styles.title}>{orderItem.imageInfo.image.title}</Text>
            <Text style={styles.orderType}>
              Order Type -{' '}
              {item.printStatus === 'no-print' ? 'Digital' : 'Print'}
            </Text>
            <View
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
    </Pressable>
  );

  return (
    <>
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

      {/* Order Support Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={supportModal}
        onRequestClose={() => {
          setSupportModal(false);
        }}>
        <Pressable
          style={styles.modalContainer}
          onPress={() => setSupportModal(false)}>
          <Pressable style={styles.modalContent} onPress={() => {}}>
            <Text style={styles.modalTitle}>Order Support</Text>
            <Text style={styles.modalDescription}>
              Have an issue with your order? Please fill out the form.
            </Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{gap: 20, paddingBottom: 10}}
              nestedScrollEnabled={true}>
              <View style={styles.inputSection}>
                <Text style={styles.sectionTitle}>Issue Type</Text>
                <DropdownModal />
                <AutoGrowTextInput placeholder={'Enter description'} />
                <Text style={styles.wordCount}> 0/200 words</Text>
              </View>
              <View style={styles.inputSection}>
                <Text style={styles.sectionTitle}>
                  Preferred Contact Method
                </Text>
                <DropdownModal />
              </View>
            </ScrollView>
            <Button btnText="Submit" />
          </Pressable>
        </Pressable>
      </Modal>

      {/* Shipment Tracking Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={trackModal}
        onRequestClose={() => {
          setTrackModal(false);
        }}>
        <Pressable
          style={styles.modalContainer}
          onPress={() => setTrackModal(false)}>
          <Pressable style={styles.modalContent} onPress={() => {}}>
            <Text style={styles.modalTitle}>Shipment Tracking</Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{gap: 20, paddingBottom: 10}}
              nestedScrollEnabled={true}>
              <View style={styles.trackingList}>
                <Text style={styles.trackingTitle}>AWB</Text>
                <Text style={styles.trackingStatus}>
                  {shipment?.AWB || 'N/A'}
                </Text>
              </View>
              <View style={styles.trackingList}>
                <Text style={styles.trackingTitle}>Status</Text>
                <Text style={styles.trackingStatus}>
                  {shipment?.Status?.Status || 'N/A'}
                </Text>
              </View>
              <View style={styles.trackingList}>
                <Text style={styles.trackingTitle}>Location</Text>
                <Text style={styles.trackingStatus}>
                  {shipment?.Origin || 'N/A'}
                </Text>
              </View>
              <View style={styles.trackingList}>
                <Text style={styles.trackingTitle}>Pickup Date</Text>
                <Text style={styles.trackingStatus}>
                  {shipment?.PickUpDate || 'N/A'}
                </Text>
              </View>
              <View style={styles.trackingList}>
                <Text style={styles.trackingTitle}>Expected Delivery Date</Text>
                <Text style={styles.trackingStatus}>
                  {shipment?.ExpectedDeliveryDate || 'N/A'}
                </Text>
              </View>
              <View style={styles.trackingList}>
                <Text style={styles.trackingTitle}>Delivery Date</Text>
                <Text style={styles.trackingStatus}>
                  {shipment?.DeliveryDate || 'Pending'}
                </Text>
              </View>
              <View style={styles.trackingList}>
                <Text style={styles.trackingTitle}>Destination</Text>
                <Text style={styles.trackingStatus}>
                  {shipment?.Destination || 'N/A'}
                </Text>
              </View>
              <View style={styles.trackingList}>
                <Text style={styles.trackingTitle}>Consignee</Text>
                <Text style={styles.trackingStatus}>
                  {`${shipment?.Consignee?.Name} (${shipment?.Consignee?.City}, ${shipment?.Consignee?.PinCode})` ||
                    'N/A'}
                </Text>
              </View>
              <View style={styles.trackingList}>
                <Text style={styles.trackingTitle}>Contact</Text>
                <Text style={styles.trackingStatus}>
                  {shipment?.Consignee?.Telephone1 || 'N/A'}
                </Text>
              </View>
              <View style={styles.trackingList}>
                <Text style={styles.trackingTitle}>Order Type</Text>
                <Text style={styles.trackingStatus}>
                  {shipment?.OrderType || 'N/A'}
                </Text>
              </View>
              <View style={styles.trackingList}>
                <Text style={styles.trackingTitle}>Charged Weight</Text>
                <Text style={styles.trackingStatus}>
                  {shipment?.ChargedWeight || 'N/A'}
                </Text>
              </View>
              <View style={styles.trackingList}>
                <Text style={styles.trackingTitle}>Invoice Amount</Text>
                <Text style={styles.trackingStatus}>
                  {shipment?.InvoiceAmount}
                </Text>
              </View>
            </ScrollView>
            <Pressable
              onPress={() => setTrackModal(false)}
              style={styles.closeModalBtn}>
              <Icon name="close" size={20} color={'white'} />
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

      <SlideUpModal
        visible={slideUp}
        onClose={() => setSlideUp(false)}
        options={imageOptions}
      />
    </>
  );
};

export default Orders;
