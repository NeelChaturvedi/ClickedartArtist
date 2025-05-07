import {View, Text, Pressable, SafeAreaView, TextInput} from 'react-native';
import {styles} from './styles';

const Contact = () => {
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
          />
        </View>
        <View style={styles.formField}>
          <Text style={styles.inputTitle}>ADDRESS</Text>
          <TextInput
            style={styles.inputbox}
            placeholder="Optional"
            placeholderTextColor={'#D9D9D9'}
          />
        </View>
        <View style={styles.formField}>
          <Text style={styles.inputTitle}>COUNTRY</Text>
          <TextInput
            style={styles.inputbox}
            placeholder="Required"
            placeholderTextColor={'#D9D9D9'}
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
              />
            </View>
            <View style={styles.twoField}>
            <Text style={styles.inputTitle}>PINCODE</Text>
              <TextInput
                style={styles.inputbox}
                placeholder="Optional"
                placeholderTextColor={'#D9D9D9'}
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
