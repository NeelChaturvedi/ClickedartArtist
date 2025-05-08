import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Modal,
  Pressable,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {styles} from './styles';
import Button from '../../../components/button';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {useRegistrationStore} from '../../../store/registration';

const Personal = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const {formData, setField, nextStep, setConnectedAccount} =
    useRegistrationStore();
  const options = ['Facebook', 'Instagram', 'LinkedIn', 'Twitter'];
  console.log('Form Data', formData);

  return (
    <SafeAreaView style={styles.background}>
      <Text style={styles.heading}>Personal Details</Text>
      <View style={styles.form}>
        <View style={styles.row}>
          <View style={styles.twoField}>
            <Text style={styles.inputTitle}>FIRST NAME</Text>
            <TextInput
              style={styles.inputbox}
              placeholder="Required"
              placeholderTextColor={'#D9D9D9'}
              value={formData.firstName}
              onChangeText={text => setField('firstName', text)}
            />
          </View>
          <View style={styles.twoField}>
            <Text style={styles.inputTitle}>LAST NAME</Text>
            <TextInput
              style={styles.inputbox}
              placeholder="Optional"
              placeholderTextColor={'#D9D9D9'}
              value={formData.lastName}
              onChangeText={text => setField('lastName', text)}
            />
          </View>
        </View>
        <View style={styles.formField}>
          <Text style={styles.inputTitle}>BIO</Text>
          <TextInput
            style={styles.inputbox}
            placeholder="Optional"
            placeholderTextColor={'#D9D9D9'}
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
            value={formData.bio}
            onChangeText={text => setField('bio', text)}
          />
        </View>
        <View style={styles.formField}>
          <Text style={styles.inputTitle}>DATE OF BIRTH</Text>
          <TextInput
            style={styles.inputbox}
            placeholder="Required"
            placeholderTextColor={'#D9D9D9'}
            value={formData.dateOfBirth}
            onChangeText={text => setField('dateOfBirth', text)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.formField}>
          <Text style={styles.inputTitle}>SOCIAL MEDIA LINK</Text>
          <View style={styles.row}>
            <View style={styles.twoField}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setModalVisible(!modalVisible);
                }}>
                <TouchableWithoutFeedback
                  onPress={() => setModalVisible(false)}>
                  <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Select Social Media</Text>
                    <View style={styles.modalContent}>
                      {options.map((option, index) => (
                        <Pressable
                          key={index}
                          onPress={() => {
                            setModalVisible(false);
                            setConnectedAccount(0, 'accountName', option);
                          }}>
                          <Text style={styles.modalOption}>{option}</Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
              <Pressable onPress={() => setModalVisible(true)}>
                <Text
                  style={styles.selectionText}
                  placeholder="Required"
                  placeholderTextColor={'#D9D9D9'}>
                  {formData.connectedAccounts[0].accountName
                    ? formData.connectedAccounts[0].accountName
                    : 'Select Social Media'}
                </Text>
              </Pressable>
            </View>
            <View style={styles.twoField}>
              <TextInput
                style={styles.inputbox}
                placeholder="Required"
                placeholderTextColor={'#D9D9D9'}
                value={formData.connectedAccounts[0].accountLink}
                onChangeText={text =>
                  setConnectedAccount(0, 'accountLink', text)
                }
              />
            </View>
          </View>
        </View>
      </View>
      <Button
        btnText={'Next'}
        onPress={() => {
          nextStep();
          navigation.navigate('Contact');
        }}
      />
    </SafeAreaView>
  );
};

export default Personal;
