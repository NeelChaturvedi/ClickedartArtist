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

const Membership = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = (id) => {
    setIsExpanded(prevId => (prevId === id ? null : id));
  };

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
          <View key={plan.id} style={styles.planContainer}>
            <TouchableOpacity style={styles.summary} onPress={() => toggleAccordion(plan.id)}>
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
          </View>
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
    alignItems: 'center',
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
});

export default Membership;
