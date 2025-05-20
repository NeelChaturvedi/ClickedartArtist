import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import {styles} from './styles';
import DropdownModal from '@components/DropdownModal';
import Button from '@components/button';

const ImageScreen = () => {
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
            <View style={styles.imageContainer} />
            <View style={styles.formContainer}>
              <Text style={styles.headingTitle}>Cooling-Off</Text>
              <View style={styles.infoContainer}>
                <Text style={styles.nameText}>Bhanu Sharma</Text>
                <Text style={styles.nameText}>₹ 14,000</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.nameText}>Image Description</Text>
                <Text style={styles.aboutText}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id
                  corporis fugit cumque libero placeat doloribus obcaecati
                  reprehenderit earum aspernatur architecto! Expedita, nobis!
                  Soluta vel provident voluptatem odit at. Officia beatae
                  commodi, necessitatibus similique facere iste, nemo neque
                  officiis, doloremque expedita accusamus? Recusandae rerum
                  tempore cumque suscipit labore quaerat totam odio minus, autem
                  ducimus. Iste ex, distinctio id tenetur nesciunt possimus
                  fugit et consequatur excepturi libero enim dicta fugiat sint
                  voluptatum.
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
