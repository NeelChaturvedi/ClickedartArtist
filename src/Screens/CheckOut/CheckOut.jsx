/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import {placeOrderStyles} from './styles';
import AutoGrowTextInput from '@components/AutoGrowTextInput';
import Button from '@components/button';
import SlideUpDetails from '@components/SlideupDetails';
import {useUserStore} from 'src/store/auth';
import useCartStore from 'src/store/cart';
import api from 'src/utils/apiClient';
import {useNavigation} from '@react-navigation/native';
import { useTheme } from 'src/themes/useTheme';

const CheckOut = () => {
  const {user} = useUserStore();
  const {cartItems, clearCart} = useCartStore();
  const [step, setStep] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [price, setPrice] = useState({});
  const [code, setCode] = useState('');
  const [coupon, setCoupon] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [pincodeChecking, setPincodeChecking] = useState(false);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [platformCharges, setPlatformCharges] = useState(0);
  const [razorpay_payment_id, setrazorpay_payment_id] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [orderData, setOrderData] = useState({
    userId: null,
    orderItems: [],
    gst: null,
    orderStatus: 'pending',
    isPaid: false,
    paymentMethod: '',
    invoiceId: '',
    finalAmount: 0,
    discount: 0,
    shippingAddress: {
      address: '',
      country: 'India',
      city: '',
      landmark: '',
      area: '',
      mobile: '',
      email: '',
      pincode: '',
      state: '',
    },
  });

  const navigation = useNavigation();

  const theme = useTheme();
  const styles = useMemo(() => placeOrderStyles(theme), [theme]);

  const handlePayment = useCallback(
    // eslint-disable-next-line no-shadow
    async orderData => {
      const validateOrder = orderDetails => {
        if (!user) {
          console.log('Please login to place an order');
          return false;
        }

        const address = orderDetails?.shippingAddress?.address?.trim();
        const city = orderDetails?.shippingAddress?.city?.trim();
        const state = orderDetails?.shippingAddress?.state?.trim();
        const mobile = orderDetails?.shippingAddress?.mobile;

        if (!address) {
          ToastAndroid.show('Please enter your address', ToastAndroid.SHORT);
          return false;
        }

        if (!city) {
          ToastAndroid.show('Please enter your city', ToastAndroid.SHORT);
          return false;
        }

        if (!state) {
          ToastAndroid.show('Please enter your state', ToastAndroid.SHORT);
          return false;
        }

        if (!mobile) {
          ToastAndroid.show('Please enter mobile number', ToastAndroid.SHORT);
          return false;
        }

        if (!mobile || mobile.toString().length !== 10) {
          ToastAndroid.show(
            'Please enter a valid mobile number',
            ToastAndroid.SHORT,
          );
          return false;
        }

        return true;
      };

      if (!user) {
        ToastAndroid.show('Please login to continue', ToastAndroid.SHORT);
        return;
      }

      if (!validateOrder(orderData)) {
        return;
      }

      try {
        setPaymentProcessing(true);
        const result = await api.post('/download/payment', {
          total: orderData.finalAmount,
          userId: user?._id,
        });

        const options = {
          key: result.data.result.notes.key,
          amount: result.data.result.amount,
          currency: 'INR',
          name: 'ClickedArt',
          description: 'Total Payment',
          image: 'https://clickedart.com/_next/image?url=%2Fassets%2FLogo.png',
          order_id: result.data.id,
          prefill: {
            email: user?.email,
            contact: user?.mobile,
            name: `${user?.firstName} ${user?.lastName}`,
          },
          theme: {
            color: '#3399cc',
          },
        };

        RazorpayCheckout.open(options)
          .then(res => {
            const paymentId = res.razorpay_payment_id;
            if (paymentId) {
              setrazorpay_payment_id(paymentId);
              setPaymentStatus(true);
              setOrderData(prev => ({
                ...prev,
                invoiceId: paymentId,
              }));
            }
          })
          .catch(errr => {
            console.log('Payment error:', errr);
            ToastAndroid.show('Payment failed', ToastAndroid.SHORT);
          });
      } catch (err) {
        ToastAndroid.show('Payment initialization failed', ToastAndroid.SHORT);
      } finally {
        setPaymentProcessing(false);
      }
    },
    [user],
  );

  const createOrder = useCallback(
    async orderDetails => {
      try {
        setLoading(true);
        await api.post('/download/create-order', orderDetails);
        clearCart();
        ToastAndroid.show('Order placed successfully', ToastAndroid.SHORT);
        navigation.goBack();
        setLoading(false);
      } catch (err) {
        console.error('Error placing order:', err.response);
        ToastAndroid.show(
          'Error placing order. Please try again.',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [clearCart],
  );

  useEffect(() => {
    if (paymentStatus === true) {
      const NewOrderData = {
        ...orderData,
        invoiceId: razorpay_payment_id,
        isPaid: true,
        paymentMethod: 'razorpay',
        orderStatus: 'completed',
      };

      createOrder(NewOrderData);
    }
  }, [paymentStatus, createOrder, orderData, razorpay_payment_id]);

  const checkPincode = async pincode => {
    if (!pincode || pincode.length < 6 || pincode.length > 6) {
      setIsAvailable(false);
      return;
    }
    try {
      setPincodeChecking(true);
      setIsAvailable(false);
      const res = await api.get(
        `/delivery/check-pincode-availablity?pincode=${pincode}`,
      );
      const data = res.data;
      setIsAvailable(data.available);
      if (data.available) {
        setIsAvailable(true);
      } else {
        setIsAvailable(false);
      }
    } catch (err) {
      console.error('Error checking pincode availability:', err);
    } finally {
      setPincodeChecking(false);
    }
  };

  const calculatePrice = async () => {
    try {
      const res = await api.post('/download/calculate-price', {
        items,
        photographerId: user?._id,
      });
      setPrice(res.data);
    } catch (err) {
      console.error('Error calculating price:', err.response);
    }
  };

  useEffect(() => {
    // Calculate raw amount (sum of item prices before applying discount)
    const rawAmount = price?.totalFinalPrice || 0;
    // Apply discount to the raw amount
    const discountAmount = discount;

    const amountAfterDiscount = rawAmount - discountAmount;

    // Calculate delivery charges (₹1 per square inch of paper size)
    const calculateDeliveryCharges = () => {
      return cartItems?.reduce((total, item) => {
        if (item.paperInfo && item.paperInfo.size) {
          const area = item.paperInfo.size.width * item.paperInfo.size.height;
          setDeliveryCharges(area);
          // return total + area;
          return total;
        }
        return total;
      }, 0);
    };

    const deliveryCharge = calculateDeliveryCharges();

    // Calculate GST (18% on the raw amount)
    const gstAmount = amountAfterDiscount * 0.18; // 18% GST

    // Calculate platform fee
    const platformFee = (amountAfterDiscount + gstAmount) * 0.02; // 2% platform fee
    setPlatformCharges(platformFee);
    // Final amount after adding GST, platform fee, and delivery charge
    const finalAmount = amountAfterDiscount + gstAmount + 0 + deliveryCharge;

    // Update the order data
    setOrderData(prev => ({
      ...prev,
      userId: user?._id,
      orderItems: cartItems.map(item => ({
        imageInfo: {
          image: item.imageInfo.image,
          photographer: item.imageInfo.photographer?._id,
          resolution:
            item.mode === 'print' ? 'original' : item.imageInfo.resolution,
          initialPrice: item.paperInfo?.price ? 0 : item.imageInfo.price,
          discount:
            item.mode === 'print'
              ? 0
              : (item.imageInfo.price * discount) / price?.totalFinalPrice,
          price: item.paperInfo?.price
            ? 0
            : item.imageInfo.price -
              (item.imageInfo.price * discount) / price?.totalFinalPrice,
        },
        frameInfo: item.frameInfo
          ? {
              frame: item.frameInfo.frame,
              intialPrice: item.frameInfo.price,
              discount:
                (item.frameInfo.price * discount) / price?.totalFinalPrice,
              price:
                item.frameInfo.price -
                (item.frameInfo.price * discount) / price?.totalFinalPrice,
              size: item.frameInfo.size,
            }
          : null,
        paperInfo: item.paperInfo
          ? {
              paper: item.paperInfo.paper,
              intialPrice: item.paperInfo.price,
              discount:
                (item.paperInfo.price * discount) / price?.totalFinalPrice,
              price:
                item.paperInfo.price -
                (item.paperInfo.price * discount) / price?.totalFinalPrice,
              size: item.paperInfo.size,
            }
          : null,
        initialSubTotal:
          (item.frameInfo?.price || 0) + (item.paperInfo?.price || 0),
        subTotal:
          (item.frameInfo?.price || 0) +
          (item.paperInfo?.price || 0) -
          ((item.frameInfo?.price || 0) * (discount / price?.totalFinalPrice) +
            (item.paperInfo?.price || 0) * (discount / price?.totalFinalPrice)),
        discount: item.paperInfo?.price
          ? (item.frameInfo?.price || 0) * (discount / price?.totalFinalPrice) +
            (item.paperInfo?.price || 0) * (discount / price?.totalFinalPrice)
          : (item.imageInfo.price * discount) / price?.totalFinalPrice,
        finalPrice: item.paperInfo?.price
          ? (item.frameInfo?.price || 0) +
            (item.paperInfo?.price || 0) -
            ((item.frameInfo?.price || 0) *
              (discount / price?.totalFinalPrice) +
              (item.paperInfo?.price || 0) *
                (discount / price?.totalFinalPrice))
          : item.imageInfo.price -
            (item.imageInfo.price * discount) / price?.totalFinalPrice,
      })),
      shippingAddress: {
        ...prev.shippingAddress,
        city: user?.shippingAddress?.city,
        address: user?.shippingAddress?.address,
        state: user?.shippingAddress?.state,
        country: user?.shippingAddress?.country || 'India',
        email: user?.email,
        mobile: user?.mobile,
        pincode: user?.shippingAddress?.pincode,
      },
      finalAmount: Number(finalAmount.toFixed(2)),
      discount: Number(discountAmount.toFixed(2)),
      isPaid: false,
      gst: '',
    }));
  }, [user, cartItems, discount, coupon, price]);

  useEffect(() => {
    const backendItems = cartItems.map(item => ({
      imageId: item.imageInfo.image,
      paperId: item.paperInfo?.paper || null,
      frameId: item.frameInfo?.frame || null,
      width: item.mode === 'print' ? item.paperInfo.size.width : null,
      height: item.mode === 'print' ? item.paperInfo.size.height : null,
      resolution:
        item.mode === 'print' ? 'original' : item.imageInfo.resolution,
    }));

    setItems(backendItems);
  }, [cartItems]);

  useEffect(() => {
    if (items.length > 0) {
      calculatePrice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  useEffect(() => {
    if (user && cartItems?.length > 0) {
      let pincode = user?.shippingAddress?.pincode;
      if (pincode) {
        checkPincode(pincode);
      }
    }
  }, [user, cartItems]);

  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}>
        <View style={{flex: 1}}>
          {step === 0 ? (
            <>
              <ScrollView
                style={styles.containerWrapper}
                contentContainerStyle={styles.form}
                showsVerticalScrollIndicator={false}>
                <Text style={styles.header}>Delivery Details</Text>

                <View style={styles.form}>
                  <View style={styles.formField}>
                    <Text style={styles.inputTitle}>YOUR NAME</Text>
                    <AutoGrowTextInput
                      placeholder="Enter your name"
                      value={
                        (user?.firstName || '') + ' ' + (user?.lastName || '')
                      }
                      editable={false}
                      style={styles.inputbox}
                    />
                  </View>

                  <View style={styles.formField}>
                    <Text style={styles.inputTitle}>YOUR EMAIL</Text>
                    <AutoGrowTextInput
                      placeholder="Enter your email"
                      keyboardType="email-address"
                      value={orderData?.shippingAddress?.email}
                      onChangeText={text =>
                        setOrderData(prev => ({
                          ...prev,
                          shippingAddress: {
                            ...prev.shippingAddress,
                            email: text,
                          },
                        }))
                      }
                      autoCapitalize="none"
                      style={styles.inputbox}
                    />
                  </View>

                  <View style={styles.formField}>
                    <Text style={styles.inputTitle}>ADDRESS</Text>
                    <AutoGrowTextInput
                      placeholder="Enter your address"
                      style={styles.inputbox}
                      value={orderData?.shippingAddress?.address}
                      onChangeText={text =>
                        setOrderData(prev => ({
                          ...prev,
                          shippingAddress: {
                            ...prev.shippingAddress,
                            address: text,
                          },
                        }))
                      }
                    />
                  </View>

                  <View style={styles.formField}>
                    <View style={styles.row}>
                      <View style={styles.twoField}>
                        <Text style={styles.inputTitle}>COUNTRY</Text>
                        <AutoGrowTextInput
                          placeholder="Enter your country"
                          style={styles.inputbox}
                          value={orderData?.shippingAddress?.country}
                          onChangeText={text =>
                            setOrderData(prev => ({
                              ...prev,
                              shippingAddress: {
                                ...prev.shippingAddress,
                                country: text,
                              },
                            }))
                          }
                        />
                      </View>

                      <View style={styles.twoField}>
                        <Text style={styles.inputTitle}>CITY</Text>
                        <AutoGrowTextInput
                          placeholder="Enter your city"
                          style={styles.inputbox}
                          value={orderData?.shippingAddress?.city}
                          onChangeText={text =>
                            setOrderData(prev => ({
                              ...prev,
                              shippingAddress: {
                                ...prev.shippingAddress,
                                city: text,
                              },
                            }))
                          }
                        />
                      </View>
                    </View>
                  </View>

                  <View style={styles.formField}>
                    <View style={styles.row}>
                      <View style={styles.twoField}>
                        <Text style={styles.inputTitle}>STATE</Text>
                        <AutoGrowTextInput
                          placeholder="Enter your state"
                          style={styles.inputbox}
                          value={orderData?.shippingAddress?.state}
                          onChangeText={text =>
                            setOrderData(prev => ({
                              ...prev,
                              shippingAddress: {
                                ...prev.shippingAddress,
                                state: text,
                              },
                            }))
                          }
                        />
                      </View>

                      <View style={styles.twoField}>
                        <Text style={styles.inputTitle}>PINCODE</Text>
                        <AutoGrowTextInput
                          placeholder="Enter your pincode"
                          keyboardType="number-pad"
                          style={styles.inputbox}
                          value={orderData?.shippingAddress?.pincode}
                          onChangeText={text => {
                            setOrderData(prev => ({
                              ...prev,
                              shippingAddress: {
                                ...prev.shippingAddress,
                                pincode: text,
                              },
                            }));
                            if (text.length === 6) {
                              checkPincode(text);
                            }
                            if (text.length !== 6) {
                              setPincodeChecking(false);
                              setIsAvailable(false);
                            }
                          }}
                        />
                      </View>
                    </View>
                    {cartItems?.some(item => item.mode === 'print') && (
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: 'CircularStd-Regular',
                          color: pincodeChecking
                            ? '#FFB800'
                            : isAvailable
                            ? '#00B300'
                            : '#FF0000',
                        }}>
                        {orderData.shippingAddress.pincode?.length === 0
                          ? 'Please Enter Pincode'
                          : orderData.shippingAddress.pincode?.length !== 6
                          ? 'Invalid Pincode'
                          : pincodeChecking
                          ? 'Checking...'
                          : isAvailable
                          ? 'Delivery available in this area'
                          : 'Delivery not available in this area'}
                      </Text>
                    )}
                  </View>

                  <View style={styles.formField}>
                    <Text style={styles.inputTitle}>LANDMARK</Text>
                    <AutoGrowTextInput
                      placeholder="Enter your landmark"
                      style={styles.inputbox}
                      value={orderData?.shippingAddress?.landmark}
                      onChangeText={text =>
                        setOrderData(prev => ({
                          ...prev,
                          shippingAddress: {
                            ...prev.shippingAddress,
                            landmark: text,
                          },
                        }))
                      }
                    />
                  </View>

                  <View style={styles.formField}>
                    <Text style={styles.inputTitle}>PHONE NUMBER</Text>
                    <AutoGrowTextInput
                      placeholder="Enter your phone number"
                      keyboardType="phone-pad"
                      style={styles.inputbox}
                      value={String(orderData.shippingAddress.mobile || '')}
                      onChangeText={text =>
                        setOrderData(prev => ({
                          ...prev,
                          shippingAddress: {
                            ...prev.shippingAddress,
                            mobile: Number(text),
                          },
                        }))
                      }
                    />
                  </View>
                </View>
              </ScrollView>

              <TouchableOpacity
                style={styles.amountDistribution}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.orderTitle}>Payment:</Text>
                <Text style={styles.header}>{orderData.finalAmount}</Text>
              </TouchableOpacity>

              <View style={{padding: 20}}>
                <Button
                  btnText="Proceed to Pay"
                  disabled={pincodeChecking || !isAvailable || loading}
                  onPress={() => setStep(1)}
                />
              </View>
            </>
          ) : (
            <>
              <ScrollView
                style={styles.containerWrapper}
                contentContainerStyle={styles.form}>
                <Text style={styles.header}>Order Items</Text>
                {cartItems?.map((item, index) => (
                  <View key={index} style={styles.orderCard}>
                    <View style={styles.orderDetails}>
                      <Image
                        style={styles.orderImage}
                        source={{uri: item.imageInfo.thumbnail}}
                      />
                      <View style={styles.orderInfo}>
                        <Text style={styles.orderTitle}>
                          {item.imageInfo.title}
                        </Text>
                        <Text style={styles.orderPaper}>
                          {item.paperInfo?.name}
                        </Text>
                        <View style={styles.row}>
                          <Text
                            style={
                              styles.orderTitle
                            }>{`${item.paperInfo?.size?.width} X ${item.paperInfo?.size?.height} in`}</Text>
                          <Text style={styles.orderPaper}>
                            {item.frameInfo?.name || 'No Frame'}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.line} />
                    <View gap={10}>
                      <View style={styles.row}>
                        <Text style={styles.orderTitle}>Delivery</Text>
                        <Text
                          style={
                            styles.orderPaper
                          }>{`₹${item.delivery}/-`}</Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.orderTitle}>Total Amount</Text>
                        <Text
                          style={styles.orderPaper}>{`₹${item.subTotal?.toFixed(
                          2,
                        )}/-`}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>

              <TouchableOpacity
                style={styles.amountDistribution}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.orderTitle}>Payment:</Text>
                <Text
                  style={styles.header}>{`₹${orderData.finalAmount}/-`}</Text>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 20,
                }}>
                <View style={{width: '48%'}}>
                  <Button btnText="Back" onPress={() => setStep(0)} />
                </View>
                <View style={{width: '48%'}}>
                  <Button
                    btnText={
                      paymentStatus || paymentProcessing
                        ? 'Processing...'
                        : 'Place Order'
                    }
                    disabled={
                      pincodeChecking ||
                      !isAvailable ||
                      loading ||
                      paymentStatus === true ||
                      paymentProcessing
                    }
                    onPress={() => {
                      handlePayment(orderData);
                    }}
                  />
                </View>
              </View>
            </>
          )}
        </View>
        <SlideUpDetails
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          data={[
            {label: 'Subtotal', value: `₹${price?.totalFinalPrice}`},
            {
              label: 'Savings',
              value: discount ? `- ₹${orderData?.discount}` : '₹0',
            },
            {
              label: 'Delivery Charges',
              value: `₹${deliveryCharges}`,
              isFree: true,
            },
            {
              label: 'Platform Gateway',
              value: `₹${platformCharges.toFixed(2)}`,
              isFree: true,
            },
            {
              label: 'CGST (9%)',
              value: `₹${((price.totalFinalPrice - discount) * 0.09).toFixed(
                2,
              )}`,
            },
            {
              label: 'SGST (9%)',
              value: `₹${((price.totalFinalPrice - discount) * 0.09).toFixed(
                2,
              )}`,
            },
            {label: 'Total', value: `₹${orderData.finalAmount}`},
          ]}
          title="Price Breakdown"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CheckOut;
