import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../../components/button';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

const Membership = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = id => {
    setIsExpanded(prevId => (prevId === id ? null : id));
  };

  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 1,
      name: 'Basic',
      price: 'Free',
      desc: 'Perfect for newcomers! Create your first catalogue, test out essential tools, and start selling with zero cost.Great for trying before upgrading.',
      features: [
        {title: 'Advanced Tools', value: 'Not Available'},
        {title: 'Catalogue Creation', value: '1'},
        {title: 'Custom Pricing', value: 'Yes'},
        {title: 'Image Uplaod', value: '10'},
        {title: 'Licensing Options', value: 'Fixed licensing only'},
        {title: 'Priority Support', value: 'Not Available'},
        {title: 'Promotional Tools', value: 'No Promotions'},
        {title: 'Sales Reports', value: 'Simple monthly reports'},
        {title: 'Social Media Auto Posting', value: 'Not Available'},
        {title: 'Social Media Integration', value: 'Limited to sharing'},
        {title: 'Watermarking Tools', value: 'Basic watermark'},
      ],
    },
    {
      id: 2,
      name: 'Intermediate',
      price: '₹499/month',
      desc: 'Unlock your creative potential. With more catalogues, better tools, detailed analytics, and flexible licensing, this plan is built for serious sellers ready to scale.Best value for growing creators and freelancers.',
      features: [
        {title: 'Advanced Tools', value: 'Limited Templates'},
        {title: 'Catalogue Creation', value: '5'},
        {title: 'Custom Pricing', value: 'Yes'},
        {title: 'Image Uplaod', value: '50'},
        {
          title: 'Licensing Options',
          value: 'Fixed licensing (commerical, personal)',
        },
        {title: 'Priority Support', value: 'Standard (24-48 hrs response)'},
        {title: 'Promotional Tools', value: 'Seasonal Promotions'},
        {title: 'Sales Reports', value: 'Detailed sales analytics'},
        {title: 'Social Media Auto Posting', value: 'Single platform posting'},
        {
          title: 'Social Media Integration',
          value: 'Full integration (auto-posting tools)',
        },
        {title: 'Watermarking Tools', value: 'Custom watermark'},
      ],
    },
    {
      id: 3,
      name: 'Premium',
      price: '₹999/month',
      desc: 'Take full control of your brand. Enjoy unlimited uploads, complete customization, advanced insights, and priority support. Everything you need to sell smart and scale fast. Designed for professionals, businesses & power users.',
      features: [
        {
          title: 'Advanced Tools',
          value: 'Full customization and analytics dashboard',
        },
        {title: 'Catalogue Creation', value: 'Unlimited'},
        {title: 'Custom Pricing', value: 'Yes'},
        {title: 'Image Uplaod', value: 'Unlimited'},
        {title: 'Licensing Options', value: 'Full licensing customization'},
        {
          title: 'Priority Support',
          value: 'Premium (12-24 hrs response, dedicated)',
        },
        {
          title: 'Promotional Tools',
          value: 'Full promotional toolkit (coupons, discounts)',
        },
        {
          title: 'Sales Reports',
          value: 'Advanced analytics with customer insights',
        },
        {
          title: 'Social Media Auto Posting',
          value: 'Multi-platform posting with scheduling',
        },
        {
          title: 'Social Media Integration',
          value: 'Enhanced social media and website embeds',
        },
        {
          title: 'Watermarking Tools',
          value: 'Advanced watermark and branding options',
        },
      ],
    },
  ];
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.headerContainer}>
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
        {plans.map(plan => (
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
            key={plan.id}
            style={[
              styles.planContainer,
              selectedPlan === plan.id && {
                borderWidth: 3,
                borderColor: 'white',
              },
            ]}>
            {selectedPlan === plan.id && (
              <View style={styles.checkIcon}>
                <Icon name="check" size={20} color="black" />
              </View>
            )}
            <TouchableOpacity
              style={styles.summary}
              onPress={() => {
                toggleAccordion(plan.id);
                setSelectedPlan(plan.id);
              }}>
              <View style={styles.priceAndType}>
                <Text style={styles.typeText}>{plan.name}</Text>
                <Text style={styles.subHeadingText}>{plan.price}</Text>
              </View>
              <Text style={styles.typeDescription}>{plan.desc}</Text>
            </TouchableOpacity>
            {isExpanded === plan.id && (
              <View>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.featureContainer}>
                    <Text style={styles.featureText}>{feature.title}</Text>
                    <Text style={styles.valueText}>{feature.value}</Text>
                  </View>
                ))}
              </View>
            )}
          </LinearGradient>
        ))}
      </ScrollView>
      <Button btnText={'Purchase'} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
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
    marginTop: 20,
  },
  planContainer: {
    flexDirection: 'column',
    borderRadius: 10,
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
    height: 40,
    width: 40,
    zIndex: 1,
  },
});

export default Membership;
