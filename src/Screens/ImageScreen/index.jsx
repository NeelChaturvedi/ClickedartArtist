/* eslint-disable react-native/no-inline-styles */
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import DropdownModal from '@components/DropdownModal';
import Button from '@components/button';
import LinearGradient from 'react-native-linear-gradient';

const ImageScreen = () => {
  const [startColor, setStartColor] = useState('rgb(0, 136, 209)');
  const [endColor, setEndColor] = useState('rgb(0, 50, 150)');

  const [imageUri, setImageUri] = useState(
    require('../../assets/images/mockup.webp'),
  );

  const options = [
    {id: 1, name: 'Image'},
    {id: 2, name: 'Video'},
    {id: 3, name: 'Audio'},
  ];

  const handleSelect = item => {
    Alert.alert('Selected', item.name);
  };

  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={{flex: 1}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{padding: 20, gap: 40}}>
            <LinearGradient
              colors={[startColor, endColor]}
              style={styles.imageContainer}>
              <Image
                source={imageUri}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                resizeMode="contain"
              />
            </LinearGradient>
            <View style={styles.formContainer}>
              <Text style={styles.headingTitle}>Cooling-Off</Text>
              <View style={styles.infoContainer}>
                <Text style={styles.nameText}>Bhanu Sharma</Text>
                <Text style={styles.nameText}>₹ 14,000</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.nameText}>Image Description</Text>
                <Text style={styles.aboutText}>
                  Witness the majestic male elephant enjoying a dust bath in the
                  wilderness of Dhikala Zone, Jim Corbett Tiger Reserve. The
                  monochrome effect captures the raw power, grace, and texture
                  of this magnificent being, making the moment feel even more
                  timeless. As he throws dust into the air, it's a display of
                  both playfulness and survival—keeping cool, protecting his
                  skin, and marking his presence in the wild.
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.nameText}>Media Type</Text>
                <DropdownModal options={options} onSelect={handleSelect} />
              </View>
              <View style={styles.infoContainer}>
                <View style={styles.subSection}>
                  <Text style={styles.nameText}>Size</Text>
                  <DropdownModal options={options} onSelect={handleSelect} />
                </View>
                <View style={styles.subSection}>
                  <Text style={styles.nameText}>Frame</Text>
                  <DropdownModal options={options} onSelect={handleSelect} />
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
            <Button btnText={'Add to cart'} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ImageScreen;
