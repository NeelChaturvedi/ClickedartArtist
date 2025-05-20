/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
  SafeAreaView,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Button from '../../components/button';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from 'src/utils/apiClient';
import RazorpayCheckout from 'react-native-razorpay';
import {useUserStore} from 'src/store/auth';

const desc = [
  'Perfect for newcomers! Create your first catalogue, test out essential tools, and start selling with zero cost.Great for trying before upgrading.',
  'Unlock your creative potential. With more catalogues, better tools, detailed analytics, and flexible licensing, this plan is built for serious sellers ready to scale.Best value for growing creators and freelancers.',
  'Take full control of your ART. Enjoy unlimited uploads, complete customization, advanced insights, and priority support. Everything you need to sell smart and scale fast. Designed for professionals, businesses & power users.',
];

const Membership = () => {
  const {user} = useUserStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [activePlan, setActivePlan] = useState(false);
  const [plans, setPlans] = useState([]);

  console.log('activePlan:', activePlan);

  const toggleAccordion = id => {
    setIsExpanded(prevId => (prevId === id ? null : id));
  };

  const cancelActivePlan = async () => {
    if (!activePlan) {
      console.log('No active plan to cancel');
      ToastAndroid.show('No active plan to cancel', ToastAndroid.SHORT);
      return;
    }
    try {
      await api.post('/subscriptions/cancel-subscription', {activePlan});
      fetchSubscriptions();
    } catch (err) {
      console.log(err);
    }
  };

  const handlePayment = async (planId, price, duration) => {
    if (!planId) {
      console.error('No plan selected');
      return;
    }
    if (!user._id) {
      console.error('No user found');
      return;
    }
    const result = await api
      .post('/subscriptions/payment', {
        total: price,
        userId: user._id,
      })
      .then(res => {
        console.log('Payment response:', res.data);
        return res;
      })
      .catch(err => {
        ToastAndroid.show('Payment Failed', ToastAndroid.SHORT);
        console.log('Payment error:', err);
        return err;
      });

    var options = {
      key: result.data.result.notes.key,
      amount: result.data.result.amount,
      currency: 'INR',
      name: 'ClickedArt',
      description: 'Total Payment',
      image: '/assets/Logo.png',
      order_id: result.data.id,
      handler: async res => {
        try {
          const paymentId = res.razorpay_payment_id;
          if (paymentId) {
            console.log('Payment successful:', paymentId);
          }
        } catch (error) {
          console.error('Payment failed:', error);
        }
      },
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
      .then(data => {
        console.log('Payment success:', data);
        handleSubscribe(planId, price, duration);
      })
      .catch(error => {
        console.log('Payment failed:', error);
        ToastAndroid.show('Payment Failed', ToastAndroid.SHORT);
      });
  };

  const handleSubscribe = async (planId, price, duration) => {
    try {
      await api.post('/subscriptions/add-subscription', {
        userId: user._id,
        planId,
        price,
        duration,
      });
    } catch (error) {
      console.error('Subscription Error', error.response);
    }
  };

  const fetchSubscriptions = useCallback(async () => {
    try {
      const res = await api.get(
        `/subscriptions/get-user-subscription?userId=${user?._id}`,
      );
      console.log('Subscriptions:', res.data.subscriptions);

      const activePlanId = res.data.subscriptions.find(
        subscription => subscription.isActive === true,
      )?.planId?._id;
      setActivePlan(activePlanId);
    } catch (err) {
      console.log(err.response);
    }
  }, [user?._id]);

  const fetchPlans = async () => {
    try {
      const response = await api.get('/plans/get-all-plans');
      console.log('Plans:', response.data);
      const sortedPlans = response.data.plans.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      setPlans(sortedPlans);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/images/membershipHeader.png')}
          />
          <View style={styles.contentContainer}>
            <Text style={styles.headingText}>Choose a Plan</Text>
            <Text style={styles.subHeadingText}>
              Unlock exclusive features to showcase your creativity and boost
              your sales!
            </Text>
          </View>
        </View>
        <View style={styles.optionsContainer}>
          {plans.map((plan, index) => (
            <LinearGradient
              colors={
                plan.name === 'Basic'
                  ? ['#00693B', '#4FBD8F']
                  : plan.name === 'Intermediate'
                  ? ['#7A8204', '#D9D455']
                  : ['#004B69', '#21C4C4']
              }
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              key={index}
              style={[
                styles.planContainer,
                selectedPlan?._id === plan._id &&
                  selectedPlan?._id !== activePlan && {
                    borderWidth: 3,
                    borderColor: 'white',
                  },
              ]}>
              {selectedPlan?._id === plan._id &&
                selectedPlan?._id !== activePlan && (
                  <View style={styles.checkIcon}>
                    <Icon name="flash-on" size={24} color="#1E1E1E" />
                  </View>
                )}
              <TouchableOpacity
                style={styles.summary}
                onPress={() => {
                  toggleAccordion(plan._id);
                  setSelectedPlan(plan);
                }}>
                <View style={styles.priceAndType}>
                  <Text style={styles.typeText}>{plan.name}</Text>
                  <View>
                    {plan.cost[0].price === 0 ? (
                      <Text style={styles.priceText}>FREE</Text>
                    ) : (
                      plan.cost.map((cost, constIndex) => (
                        <Text key={constIndex} style={styles.priceText}>
                          ₹{cost.price} {cost.duration}
                        </Text>
                      ))
                    )}
                  </View>
                </View>
                <Text style={styles.typeDescription}>{desc[index]}</Text>
              </TouchableOpacity>
              {isExpanded === plan._id && (
                <View>
                  <View style={styles.featureContainer}>
                    <Text style={styles.featureText}>Advanced Tools</Text>
                    <Text style={styles.valueText}>{plan.advancedTools}</Text>
                  </View>
                  <View style={styles.featureContainer}>
                    <Text style={styles.featureText}>Catalogue Creation</Text>
                    <Text style={styles.valueText}>
                      {plan.catalogCreation > 999
                        ? 'Unlimited'
                        : plan.catalogCreation}
                    </Text>
                  </View>
                  <View style={styles.featureContainer}>
                    <Text style={styles.featureText}>Custom Pricing</Text>
                    <Text style={styles.valueText}>
                      {plan.customPricing ? 'Yes' : 'No'}
                    </Text>
                  </View>
                  <View style={styles.featureContainer}>
                    <Text style={styles.featureText}>Image Upload Limit</Text>
                    <Text style={styles.valueText}>
                      {plan.imageUploadLimit > 999
                        ? 'Unlimited'
                        : plan.imageUploadLimit}
                    </Text>
                  </View>
                  <View style={styles.featureContainer}>
                    <Text style={styles.featureText}>Licensing Options</Text>
                    <Text style={styles.valueText}>
                      {plan.licensingOptions}
                    </Text>
                  </View>
                  <View style={styles.featureContainer}>
                    <Text style={styles.featureText}>Priority Support</Text>
                    <Text style={styles.valueText}>{plan.prioritySupport}</Text>
                  </View>
                  <View style={styles.featureContainer}>
                    <Text style={styles.featureText}>Promotional Tools</Text>
                    <Text style={styles.valueText}>
                      {plan.promotionalTools}
                    </Text>
                  </View>
                  <View style={styles.featureContainer}>
                    <Text style={styles.featureText}>Sales Reports</Text>
                    <Text style={styles.valueText}>{plan.salesReports}</Text>
                  </View>
                  <View style={styles.featureContainer}>
                    <Text style={styles.featureText}>
                      Social Media Auto Posting
                    </Text>
                    <Text style={styles.valueText}>
                      {plan.socialMediaAutoPosting}
                    </Text>
                  </View>
                  <View style={styles.featureContainer}>
                    <Text style={styles.featureText}>
                      Social Media Integration
                    </Text>
                    <Text style={styles.valueText}>
                      {plan.socialMediaIntegration}
                    </Text>
                  </View>
                  <View style={styles.featureContainer}>
                    <Text style={styles.featureText}>Watermarking Tools</Text>
                    <Text style={styles.valueText}>
                      {plan.watermarkingTools}
                    </Text>
                  </View>
                </View>
              )}
            </LinearGradient>
          ))}
        </View>
      </ScrollView>
      <View style={{width: '100%', paddingHorizontal: 16}}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Select Plan</Text>
                {selectedPlan?.cost.map((option, index) => (
                  <Pressable
                    key={index}
                    onPress={() => {
                      setModalVisible(false);
                      handlePayment(
                        selectedPlan._id,
                        option.price,
                        option.duration,
                      );
                    }}>
                    <Text style={styles.modalOption}>
                      ₹{option.price} - {option.duration}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <Button
          disabled={activePlan === selectedPlan?._id || !selectedPlan}
          btnText={'Purchase'}
          onPress={() => setModalVisible(true)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    flex: 1,
    gap: 20,
    backgroundColor: 'black',
    alignItems: 'center',
    paddingBottom: 20,
  },
  headerContainer: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.8,
    resizeMode: 'cover',
  },
  contentContainer: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
    gap: 16,
  },
  headingText: {
    color: 'white',
    fontSize: 32,
    fontFamily: 'Outfit-bold',
  },
  subHeadingText: {
    color: 'white',
    fontSize: 16,
    paddingHorizontal: 30,
    fontFamily: 'Outfit-medium',
    textAlign: 'center',
  },
  optionsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  planContainer: {
    flexDirection: 'column',
    marginVertical: 10,
    backgroundColor: '#1e1e1e',
    gap: 40,
    paddingHorizontal: 16,
    paddingVertical: 20,
    position: 'relative',
  },
  summary: {
    gap: 10,
  },
  priceAndType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  typeText: {
    fontFamily: 'Outfit-bold',
    fontSize: 24,
    color: 'white',
  },
  priceText: {
    fontFamily: 'Outfit-bold',
    fontSize: 16,
    color: 'white',
  },
  typeDescription: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Outfit-medium',
  },
  featureContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  featureText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Outfit-bold',
    width: '40%',
  },
  valueText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Outfit-regular',
    width: '40%',
    textAlign: 'left',
  },
  checkIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    height: 45,
    width: 45,
    zIndex: 1,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    width: '80%',
    gap: 10,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  modalOption: {
    fontSize: 18,
    width: '100%',
    paddingVertical: 10,
    color: 'white',
  },
});

export default Membership;
