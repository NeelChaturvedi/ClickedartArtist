import {StyleSheet, SafeAreaView, View, Text} from 'react-native';
import React from 'react';
import AutoGrowTextInput from '@components/AutoGrowTextInput';
import Button from '@components/button';

const ChangePassword = () => {
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <View gap={24}>
          <View gap={14}>
            <Text style={styles.title}>Email</Text>
            <AutoGrowTextInput placeholder={'Enter your registered email'} />
          </View>
          <View gap={14}>
            <Text style={styles.title}>New Password</Text>
            <AutoGrowTextInput placeholder={'Enter your new password'}/>
          </View>
          <View gap={14}>
            <Text style={styles.title}>Verify Password</Text>
            <AutoGrowTextInput placeholder={'Verify your new password'}/>
          </View>
        </View>
        <Button btnText={'Change Password'} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Outfit-medium',
  },
});

export default ChangePassword;
