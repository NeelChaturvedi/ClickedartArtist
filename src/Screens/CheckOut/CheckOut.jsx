/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';
import AutoGrowTextInput from '@components/AutoGrowTextInput';
import Button from '@components/button';
import SlideUpDetails from '@components/SlideupDetails';
import {useUserStore} from 'src/store/auth';
import useCartStore from 'src/store/cart';
import api from 'src/utils/apiClient';

const CheckOut = () => {
  const {user} = useUserStore();
  const {cartItems} = useCartStore();
  console.log('cartItems', cartItems);
  const [step, setStep] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [price, setPrice] = useState({});
  const [code, setCode] = useState('');
  const [coupon, setCoupon] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [pincodeChecking, setPincodeChecking] = useState(false);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [platformCharges, setPlatformCharges] = useState(0);
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

  console.log('orderData', orderData);
  console.log('price', price);
  console.log('items', items);

  const priceDetails = [
    {label: 'Subtotal', value: '₹1448.94/-'},
    {label: 'Savings', value: '₹1448.94/-'},
    {label: 'Delivery Charges', value: '₹1448.94/-'},
    {label: 'Platform Gateway', value: '₹1448.94/-'},
    {label: 'CGST (9%)', value: '₹144.89/-'},
    {label: 'SGST (9%)', value: '₹144.89/-'},
    {label: 'Total', value: '₹10648.94/-'},
  ];

  const validateOrder = orderData => {
    if (!user) {
      // toast.error('Validation: Please login to continue');
      return false;
    }

    const address = orderData?.shippingAddress?.address?.trim();
    const city = orderData?.shippingAddress?.city?.trim();
    const state = orderData?.shippingAddress?.state?.trim();
    const mobile = orderData?.shippingAddress?.mobile;

    if (!address) {
      // toast.error(
      //   'Please enter your address',
      //   orderData.shippingAddress?.address?.trim(),
      // );
      return false;
    }

    if (!city) {
      // toast.error('Please enter your city');
      return false;
    }

    if (!state) {
      // toast.error('Please enter your state');
      return false;
    }

    if (!mobile) {
      // toast.error('Please enter your mobile number');
      return false;
    }

    if (!mobile || mobile.toString().length !== 10) {
      // toast.error('Please enter a valid 10-digit mobile number');
      return false;
    }

    return true;
  };

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
      console.error('Error calculating price:', err);
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
      return cartItems.reduce((total, item) => {
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
      finalAmount: finalAmount.toFixed(2),
      discount: discountAmount.toFixed(2),
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
                          fontFamily: 'Outfit-regular',
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
                <Button btnText="Proceed to Pay" onPress={() => setStep(1)} />
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
                <Text style={styles.header}>{`₹${orderData.finalAmount}/-`}</Text>
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
                  <Button btnText="Place Order" />
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
            {label: 'Delivery Charges', value: `₹${deliveryCharges}`, isFree: true},
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
