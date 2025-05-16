/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../../components/button';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackButton from '../../components/Backbutton';
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
  const [plans, setPlans] = useState([]);
  const [selectedPlanPrice, setSelectedPlanPrice] = useState();
  const [selectedPlanDuration, setSelectedPlanDuration] = useState();

  const toggleAccordion = id => {
    setIsExpanded(prevId => (prevId === id ? null : id));
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
            setSelectedPlan(planId);
            setSelectedPlanPrice(price);
            setSelectedPlanDuration(duration);
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
        handleSubscribe(selectedPlan, selectedPlanPrice, selectedPlanDuration);
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
      console.error('req', error.request);
      console.error('res', error.response);
    }
  };

  useEffect(() => {
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
    fetchPlans();
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.headerContainer}>
        <View style={styles.backButtonContainer}>
          <BackButton />
        </View>
        <Image
          style={styles.image}
          source={require('../../assets/images/membershipHeader.png')}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.headingText}>Choose a Plan</Text>
          <Text style={styles.subHeadingText}>
            Unlock exclusive features to showcase your creativity and boost your
            sales!
          </Text>
        </View>
      </View>
      <ScrollView style={styles.scrollContainer}>
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
              selectedPlan === plan._id &&
                plan.name !== 'Basic' && {
                  borderWidth: 3,
                  borderColor: 'white',
                },
            ]}>
            {selectedPlan === plan._id && plan.name !== 'Basic' && (
              <View style={styles.checkIcon}>
                <Icon name="flash-on" size={24} color="#1E1E1E" />
              </View>
            )}
            <TouchableOpacity
              style={styles.summary}
              onPress={() => {
                toggleAccordion(plan._id);
                setSelectedPlan(plan._id);
                setSelectedPlanPrice(plan.cost[0].price);
                setSelectedPlanDuration(plan.cost[0].duration);
              }}>
              <View style={styles.priceAndType}>
                <Text style={styles.typeText}>{plan.name}</Text>
                <View>
                  {plan.cost[0].price === 0 ? (
                    <Text style={styles.subHeadingText}>FREE</Text>
                  ) : (
                    plan.cost.map((cost, constIndex) => (
                      <Text key={constIndex} style={styles.subHeadingText}>
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
                  <Text style={styles.valueText}>{plan.licensingOptions}</Text>
                </View>
                <View style={styles.featureContainer}>
                  <Text style={styles.featureText}>Priority Support</Text>
                  <Text style={styles.valueText}>{plan.prioritySupport}</Text>
                </View>
                <View style={styles.featureContainer}>
                  <Text style={styles.featureText}>Promotional Tools</Text>
                  <Text style={styles.valueText}>{plan.promotionalTools}</Text>
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
                  <Text style={styles.valueText}>{plan.watermarkingTools}</Text>
                </View>
              </View>
            )}
          </LinearGradient>
        ))}
      </ScrollView>
      <View style={{width: '100%', paddingHorizontal: 16}}>
        <Button
          btnText={'Purchase'}
          onPress={() =>
            handlePayment(selectedPlan, selectedPlanPrice, selectedPlanDuration)
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    gap: 20,
    backgroundColor: 'black',
    alignItems: 'center',
    paddingBottom: 24,
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
    borderBottomRightRadius: 60,
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
    fontSize: 36,
    fontFamily: 'Outfit-bold',
  },
  subHeadingText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Outfit-medium',
    textAlign: 'center',
  },
  scrollContainer: {
    paddingHorizontal: 16,
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
    alignItems: 'center',
  },
  typeText: {
    fontFamily: 'Outfit-bold',
    fontSize: 24,
    color: 'white',
  },
  priceText: {
    fontFamily: 'Outfit-bold',
    fontSize: 20,
    color: 'white',
  },
  typeDescription: {
    color: 'white',
    fontSize: 16,
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
});

export default Membership;
