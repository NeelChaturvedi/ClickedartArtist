/* eslint-disable react-native/no-inline-styles */
import {Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackButton from '../../components/Backbutton';
import Icon from 'react-native-vector-icons/FontAwesome';
import AutoGrowTextInput from '../../components/AutoGrowTextInput';
import Button from '../../components/button';
import {useNavigation, useRoute} from '@react-navigation/native';
import api from '../../utils/apiClient';
import { launchImageLibrary } from 'react-native-image-picker';

const BlogEdit = () => {
  const {blogId} = useRoute().params;
  const [blog, setBlog] = useState({});
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileName ,setFileName] = useState(null);

  const handleImageLibraryLaunch = async () => {
    setUploading(true);
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
      includeBase64: true,
      quality: 1,
      includeExif: true,
    });


    if (!result.didCancel && result.assets?.length) {
      setImageUri(result.assets[0].uri);
      setFileName(result.assets[0].fileName);
    }
    setUploading(false);
  };


  const navigation = useNavigation();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get(`/blog/get-blog-by-id?id=${blogId}`);
        const data = response.data;
        console.log('Blog data:', data.blog);
        setBlog(data.blog);
        setTitle(data.blog?.content?.title || '');
        setSummary(data.blog?.content?.summary || '');
        setBody(data.blog?.content?.body || '');
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [blogId]);

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
                value={fileName ? fileName : 'Uplaod Image'}
              />
              <Pressable onPress={handleImageLibraryLaunch} style={style.uploadBtn}>
                <Icon name="upload" size={20} color={'black'} />
              </Pressable>
            </View>
          </View>

          <View style={style.section}>
            <Text style={style.headingText}>Blog Title</Text>
            <AutoGrowTextInput value={title} onChangeText={setTitle} />
          </View>

          <View style={style.section}>
            <Text style={style.headingText}>Blog Summary</Text>
            <AutoGrowTextInput value={summary} onChangeText={setSummary} />
          </View>

          <View style={style.section}>
            <Text style={style.headingText}>Blog Body</Text>
            <AutoGrowTextInput value={body} onChangeText={setBody} />
          </View>
        </ScrollView>

        <Button
          btnText={'Save Changes'}
          onPress={() => {
          }}
        />
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
