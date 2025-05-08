 import {View, Text, SafeAreaView, TextInput} from 'react-native';
import { styles } from './styles';
import Button from '../../../components/button';
import { useNavigation } from '@react-navigation/native';

const Personal = () => {
  const navigation = useNavigation();
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
            />
          </View>
          <View style={styles.twoField}>
            <Text style={styles.inputTitle}>LAST NAME</Text>
            <TextInput
              style={styles.inputbox}
              placeholder="Optional"
              placeholderTextColor={'#D9D9D9'}
            />
          </View>
        </View>
        <View style={styles.formField}>
          <Text style={styles.inputTitle}>BIO</Text>
          <TextInput
            style={styles.inputbox}
            placeholder="Optional"
            placeholderTextColor={'#D9D9D9'}
          />
        </View>
        <View style={styles.formField}>
          <Text style={styles.inputTitle}>DATE OF BIRTH</Text>
          <TextInput
            style={styles.inputbox}
            placeholder="Required"
            placeholderTextColor={'#D9D9D9'}
          />
        </View>
        <View style={styles.formField}>
          <Text style={styles.inputTitle}>SOCIAL MEDIA LINK</Text>
          <View style={styles.row}>
            <View style={styles.twoField}>
              <TextInput
                style={styles.inputbox}
                placeholder="Required"
                placeholderTextColor={'#D9D9D9'}
              />
            </View>
            <View style={styles.twoField}>
              <TextInput
                style={styles.inputbox}
                placeholder="Optional"
                placeholderTextColor={'#D9D9D9'}
              />
            </View>
          </View>
        </View>
      </View>
     <Button btnText={'Next'} onPress={() => {navigation.navigate('Contact');}}/>
    </SafeAreaView>
  );
};

export default Personal;
