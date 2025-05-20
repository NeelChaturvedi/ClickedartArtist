import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import DropdownModal from '@components/DropdownModal';

const ImageScreen = () => {
  const options = [
    {id: 1, name: 'Image'},
    {id: 2, name: 'Video'},
    {id: 3, name: 'Audio'},
  ];

  const handleSelect = item => {
    Alert.alert('Selected', item.name);
    // Or do something with the selected item
  };
  return (
    <SafeAreaView style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer} />
        <View style={styles.formContainer}>
          <Text style={styles.headingTitle}>Cooling-Off</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.nameText}>Bhanu Sharma</Text>
            <Text style={styles.nameText}>₹ 14,000</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.nameText}>Media Type</Text>
            <DropdownModal options={options} onSelect={handleSelect} />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.subSection}>
              <Text style={styles.nameText}>Media Type</Text>
              <DropdownModal options={options} onSelect={handleSelect} />
            </View>
            <View style={styles.subSection}>
              <Text style={styles.nameText}>Media Type</Text>
              <DropdownModal options={options} onSelect={handleSelect} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ImageScreen;
