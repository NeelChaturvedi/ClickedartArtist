import {View, Text, Pressable, SafeAreaView, TextInput} from 'react-native';
import {styles} from './styles';
import { useRegistrationStore } from '../../store/registration';

const Contact = () => {
  const { formData, setField, setNestedField } = useRegistrationStore();
  console.log('Form Data', formData);
  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.heading}>Contact Details</Text>
      <View style={styles.form}>
        <View style={styles.formField}>
          <Text style={styles.inputTitle}>MOBILE NO</Text>
          <TextInput
            style={styles.inputbox}
            placeholder="Optional"
            placeholderTextColor={'#D9D9D9'}
            keyboardType="phone-pad"
            value={formData.mobileNo}
            onChangeText={text => setField('mobileNo', text)}
          />
        </View>
        <View style={styles.formField}>
          <Text style={styles.inputTitle}>ADDRESS</Text>
          <TextInput
            style={styles.inputbox}
            placeholder="Optional"
            placeholderTextColor={'#D9D9D9'}
            value={formData.shippingAddress.address}
            onChangeText={(text) => setNestedField('shippingAddress', 'address', text)}
          />
        </View>
        <View style={styles.formField}>
          <Text style={styles.inputTitle}>City</Text>
          <TextInput
            style={styles.inputbox}
            placeholder="Required"
            placeholderTextColor={'#D9D9D9'}
            value={formData.shippingAddress.city}
            onChangeText={(text) => setNestedField('shippingAddress', 'city', text)}
          />
        </View>
        <View style={styles.formField}>
          <Text style={styles.inputTitle}>COUNTRY</Text>
          <TextInput
            style={styles.inputbox}
            placeholder="Required"
            placeholderTextColor={'#D9D9D9'}
            value={formData.shippingAddress.country}
            onChangeText={(text) => setNestedField('shippingAddress', 'country', text)}
          />
        </View>
        <View style={styles.formField}>
          <View style={styles.row}>
            <View style={styles.twoField}>
            <Text style={styles.inputTitle}>STATE</Text>
              <TextInput
                style={styles.inputbox}
                placeholder="Required"
                placeholderTextColor={'#D9D9D9'}
                value={formData.shippingAddress.state}
                onChangeText={(text) => setNestedField('shippingAddress', 'state', text)}
              />
            </View>
            <View style={styles.twoField}>
            <Text style={styles.inputTitle}>PINCODE</Text>
              <TextInput
                style={styles.inputbox}
                placeholder="Optional"
                placeholderTextColor={'#D9D9D9'}
                value={formData.shippingAddress.pincode}
                onChangeText={(text) => setNestedField('shippingAddress', 'pincode', text)}
              />
            </View>
          </View>
        </View>
      </View>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Contact;
