/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import {useRegistrationStore} from '../../store/registration';
import Button from '../../components/button';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../../components/Backbutton';
import {useState} from 'react';

const Contact = () => {
  const {formData, setField, setNestedField} = useRegistrationStore();
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required.';
    } else if (!/^\d+$/.test(formData.mobile)) {
      newErrors.mobile = 'Invalid mobile number format.';
    } else if (formData.mobile.length !== 10) {
      newErrors.mobile = 'Mobile number must be 10 digits.';
    }
    if (!formData.shippingAddress.city.trim()) {
      newErrors.city = 'City is required.';
    }
    if (!formData.shippingAddress.country.trim()) {
      newErrors.country = 'Country is required.';
    }
    if (!formData.shippingAddress.state.trim()) {
      newErrors.state = 'State is required.';
    }
    return newErrors;
  };

  const handleNext = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    navigation.navigate('ProfilePhoto');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexGrow: 1,
                justifyContent: 'space-between',
                paddingVertical: 70,
                position: 'relative',
              }}>
              <View style={styles.backButtonContainer}>
                <BackButton />
              </View>

              <Text style={styles.heading}>Contact Details</Text>

              <View style={styles.form}>
                <View style={styles.formField}>
                  <Text style={styles.inputTitle}>MOBILE NO</Text>
                  <TextInput
                    style={styles.inputbox}
                    placeholder="Required"
                    placeholderTextColor={'#D9D9D9'}
                    keyboardType="phone-pad"
                    value={formData.mobile}
                    onChangeText={text => setField('mobile', text)}
                  />
                  {errors.mobile && (
                    <Text style={styles.errorText}>{errors.mobile}</Text>
                  )}
                </View>

                <View style={styles.formField}>
                  <Text style={styles.inputTitle}>ADDRESS</Text>
                  <TextInput
                    style={styles.inputbox}
                    placeholder="Optional"
                    placeholderTextColor={'#D9D9D9'}
                    value={formData.shippingAddress.address}
                    onChangeText={text =>
                      setNestedField('shippingAddress', 'address', text)
                    }
                  />
                </View>

                <View style={styles.formField}>
                  <Text style={styles.inputTitle}>CITY</Text>
                  <TextInput
                    style={styles.inputbox}
                    placeholder="Required"
                    placeholderTextColor={'#D9D9D9'}
                    value={formData.shippingAddress.city}
                    onChangeText={text =>
                      setNestedField('shippingAddress', 'city', text)
                    }
                  />
                  {errors.city && (
                    <Text style={styles.errorText}>{errors.city}</Text>
                  )}
                </View>

                <View style={styles.formField}>
                  <Text style={styles.inputTitle}>COUNTRY</Text>
                  <TextInput
                    style={styles.inputbox}
                    placeholder="Required"
                    placeholderTextColor={'#D9D9D9'}
                    value={formData.shippingAddress.country}
                    onChangeText={text =>
                      setNestedField('shippingAddress', 'country', text)
                    }
                  />
                  {errors.country && (
                    <Text style={styles.errorText}>{errors.country}</Text>
                  )}
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
                        onChangeText={text =>
                          setNestedField('shippingAddress', 'state', text)
                        }
                      />
                      {errors.state && (
                        <Text style={styles.errorText}>{errors.state}</Text>
                      )}
                    </View>

                    <View style={styles.twoField}>
                      <Text style={styles.inputTitle}>PINCODE</Text>
                      <TextInput
                        style={styles.inputbox}
                        placeholder="Optional"
                        placeholderTextColor={'#D9D9D9'}
                        keyboardType="phone-pad"
                        maxLength={6}
                        value={formData.shippingAddress.pincode}
                        onChangeText={text =>
                          setNestedField('shippingAddress', 'pincode', text)
                        }
                      />
                      {errors.pincode && (
                        <Text style={styles.errorText}>{errors.pincode}</Text>
                      )}
                    </View>
                  </View>
                </View>
              </View>
              <View style={[styles.form, {marginTop: 30}]}>
                <Button btnText={'Next'} onPress={handleNext} />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Contact;
