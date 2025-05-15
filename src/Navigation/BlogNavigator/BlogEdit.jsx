/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackButton from '../../components/Backbutton';
import Icon from 'react-native-vector-icons/FontAwesome';
import AutoGrowTextInput from '../../components/AutoGrowTextInput';
import Button from '../../components/button';

const BlogEdit = () => {
  return (
    <SafeAreaView style={style.background}>
      <View style={style.container}>
        <View>
          <BackButton />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{gap: 30}}>
          <View style={style.section}>
            <Text style={style.headingText}>Blog Image</Text>
            <View style={style.uploadContainer}>
              <TextInput
                style={style.imageName}
                editable={false}
                value="Upload Image"
              />
              <View style={style.uploadBtn}>
                <Icon name="upload" size={20} color={'black'} />
              </View>
            </View>
          </View>
          <View style={style.section}>
            <Text style={style.headingText}>Blog Title</Text>
            <AutoGrowTextInput />
          </View>
          <View style={style.section}>
            <Text style={style.headingText}>Blog Summary</Text>
            <AutoGrowTextInput />
          </View>
          <View style={style.section}>
            <Text style={style.headingText}>Blog Body</Text>
            <AutoGrowTextInput />
          </View>
        </ScrollView>
        <Button btnText={'Save Changes'} />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: '100%',
    height: '100%',
    gap: 30,
  },
  section: {
    alignItems: 'flex-start',
    gap: 16,
  },
  headingText: {
    fontFamily: 'Outfit-bold',
    fontSize: 24,
    color: 'white',
  },
  uploadContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 5,
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageName: {
    width: '88%',
    fontSize: 18,
    fontFamily: 'Outfit-medium',
    color: 'white',
  },
  uploadBtn: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default BlogEdit;
