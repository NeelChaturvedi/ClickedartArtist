import {Image, ScrollView, Text, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '@components/button';

const Cart = () => {
  const onboardingImage = require('../../assets/images/onboarding.png');
  const cards = [
    {
      id: 1,
      title: 'The Residency',
      owner: 'Bhanu Sharma',
      image: onboardingImage,
      size: '12 X 18 in',
      frame: 'Wooden',
      paper: 'Hahnemuhle Museum Etching 350 GSM 100% Acid Free Cotton Paper',
      price: '₹1058.4',
      subtotal: '₹1058.4',
    },
    {
      id: 2,
      title: 'The Residency',
      owner: 'Bhanu Sharma',
      image: onboardingImage,
      size: '12 X 18 in',
      frame: 'Wooden',
      paper: 'Hahnemuhle Museum Etching 350 GSM 100% Acid Free Cotton Paper',
      price: '₹1058.4',
      subtotal: '₹1058.4',
    },
    {
      id: 3,
      title: 'The Residency',
      owner: 'Bhanu Sharma',
      image: onboardingImage,
      size: '12 X 18 in',
      frame: 'Wooden',
      paper: 'Hahnemuhle Museum Etching 350 GSM 100% Acid Free Cotton Paper',
      price: '₹1058.4',
      subtotal: '₹1058.4',
    },
  ];
  return (
    <SafeAreaView style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Order Summary</Text>
        <View>
          {cards.map(item => (
            <View style={styles.card} key={item.id}>
              <View style={styles.imageInfo}>
                <Image style={styles.image} source={item.image} />
                <View style={styles.imageDetails}>
                  <View gap={6}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.owner}>{item.owner}</Text>
                  </View>
                  <Text style={styles.price}>{item.price}</Text>
                </View>
              </View>
              <View style={styles.line} />
              <View gap={20}>
                <Text style={styles.paper}>{item.paper}</Text>
                <View style={styles.otherOptions}>
                  <Text style={styles.size}>{item.size}</Text>
                  <Text style={styles.size}>{item.frame}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.btnContainer}>
        <Button btnText={'CheckOut'} />
      </View>
    </SafeAreaView>
  );
};

export default Cart;
