import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from 'src/themes/useTheme';
import AutoGrowTextInput from '@components/AutoGrowTextInput';
import DropdownModal from '@components/DropdownModal';
import {useUserStore} from 'src/store/auth';
import Button from '@components/button';
import api from 'src/utils/apiClient';

const Inquiry = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const {user} = useUserStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requestType: '',
    requestDescription: '',
  });

  const handleSubmit = async () => {
    try {
      await api.post(`/customenquiry/create-custom-request`, formData);
      setFormData(prev => ({
        ...prev,
        requestType: '',
        requestDescription: '',
      }));
      ToastAndroid.show(
        'Enquiry submitted successfully. We will get back to you soon.',
        ToastAndroid.SHORT,
      );
    } catch (error) {
      ToastAndroid.show(
        'Error submitting enquiry. Please try again later.',
        ToastAndroid.SHORT,
      );
      console.error('Error submitting enquiry:', error);
    }
  };

  const requestOptions = [
    {id: '1', name: 'Photography', value: 'Photography'},
    {id: '2', name: 'Print', value: 'print'},
    {id: '3', name: 'Both Print and Digital', value: 'Both Print and Digital'},
    {id: '4', name: 'Other', value: 'Other'},
  ];

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.firstName + ' ' + user.lastName,
        email: user.email,
        phone: user.mobile,
      }));
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        style={styles.background}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled">
          <Text style={styles.heading}>Have an inquiry</Text>
          <Text style={styles.subHeading}>
            If you have any questions, suggestions, or feedback, please feel
            free to reach out to us. We value your input and are here to assist
            you.
          </Text>

          <View style={styles.sectionContainer}>
            <Text style={styles.title}>NAME</Text>
            <AutoGrowTextInput
              value={formData?.name}
              onChangeText={text =>
                setFormData(prev => ({...prev, name: text}))
              }
            />
          </View>

          <View>
            <Text style={styles.title}>EMAIL</Text>
            <AutoGrowTextInput
              value={formData?.email}
              onChangeText={text =>
                setFormData(prev => ({...prev, email: text}))
              }
            />
          </View>

          <View>
            <Text style={styles.title}>PHONE</Text>
            <AutoGrowTextInput
              value={Number(formData?.phone)?.toString()}
              onChangeText={text =>
                setFormData(prev => ({...prev, phone: Number(text)}))
              }
            />
          </View>

          <View>
            <Text style={styles.title}>REQUEST TYPE</Text>
            <DropdownModal
              options={requestOptions}
              onSelect={item =>
                setFormData(prev => ({...prev, requestType: item.value}))
              }
              value={formData?.requestType}
            />
          </View>

          <View>
            <Text style={styles.title}>REQUEST DESCRIPTION</Text>
            <AutoGrowTextInput
              placeholder={'Enter your query'}
              onChangeText={text =>
                setFormData(prev => ({...prev, requestDescription: text}))
              }
              value={formData?.requestDescription}
            />
          </View>
        </ScrollView>
        <View style={styles.container}>
          <Button btnText={'Submit'} onPress={handleSubmit}/>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingBottom: 40,
      paddingTop: 20,
      backgroundColor: theme.background,
      gap: 30,
    },
    heading: {
      fontSize: 20,
      fontFamily: 'Calibri-Bold',
      color: theme.text,
      textAlign: 'center',
    },
    subHeading: {
      fontSize: 14,
      fontFamily: 'Calibri-Regular',
      color: '#888',
      textAlign: 'justify',
      lineHeight: 20,
    },
    sectionContainer: {
      gap: 10,
    },
    title: {
      fontSize: 16,
      fontFamily: 'Calibri-Bold',
      color: theme.text,
      marginBottom: 5,
    },
  });

export default Inquiry;
