import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Button from '../../../components/button';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const [secure, setSecure] = useState(true);

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.title}>
        <Text style={styles.heading}>Sign In</Text>
        <Text style={styles.subHeading}>Hi! Welcome Back</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.formField}>
          <Text style={styles.inputTitle}>EMAIL</Text>
          <TextInput
            style={styles.inputbox}
            placeholder="Enter Email"
            placeholderTextColor="#ffffff"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.inputTitle}>PASSWORD</Text>
          <View style={styles.passwordInput}>
            <TextInput
              style={styles.passwordTextInput}
              placeholder="Enter Password"
              placeholderTextColor="#ffffff"
              secureTextEntry={secure}
            />
            <TouchableOpacity onPress={() => setSecure(!secure)}>
              <FontAwesome5
                name={secure ? 'eye-slash' : 'eye'}
                size={20}
                color="#ffffff"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </View>
      </View>

      <View style={styles.formField}>
        <Button
          btnText={'Login'}
          onPress={() => navigation.navigate('BottomTab')}
        />
        <Text style={styles.createAccountText}>
          Don't have an account?{' '}
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text style={styles.createNowText}>Create Now</Text>
          </Pressable>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;
