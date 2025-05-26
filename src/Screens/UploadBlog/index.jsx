/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {style} from './styles';
import AutoGrowTextInput from '@components/AutoGrowTextInput';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RichText, Toolbar, useEditorBridge} from '@10play/tentap-editor';
import Button from '@components/button';
import {useUserStore} from 'src/store/auth';
import api from 'src/utils/apiClient';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';

const UploadBlog = () => {
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    placeholder: 'Write your blog here...',
    onChange: async () => {
      const html = await editor.getHTML();
      setBlog(prev => ({
        ...prev,
        content: {...prev.content, body: html},
      }));
    },
  });

  const navigation = useNavigation();

  const {user} = useUserStore();

  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [blog, setBlog] = useState({
    authorInfo: {
      author: undefined,
      authorType: 'Photographer',
    },
    slug: '',
    content: {
      title: '',
      summary: '',
      body: '',
    },
    coverImage: '',
    tags: [],
    photographer: undefined,
    achievements: [],
    blogType: 'blog',
  });

  const validateForm = () => {
    if (!blog.content.title.trim()) {
      ToastAndroid.show('Title is required.', ToastAndroid.SHORT);
      return false;
    }
    if (!blog.content.body.trim()) {
      ToastAndroid.show('Body is required.', ToastAndroid.SHORT);
      return false;
    }
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await api.post('/blog/add-blog', blog);
      navigation.goBack();
    } catch (err) {
      console.error(err);
      setError(err.response.data.message);
    }
  };

  const handleImageLibraryLaunch = async () => {
    const result = await ImageCropPicker.openPicker({
      mediaType: 'photo',
      quality: 1,
    });
    if (result) {
      await uploadImageToServer(result.path);
    }
  };

  const uploadImageToServer = async imageUri => {
    if (!imageUri) {
      ToastAndroid.show('No image selected', ToastAndroid.SHORT);
      return;
    }
    setUploading(true);
    const imgData = new FormData();
    imgData.append('image', {
      uri: imageUri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    try {
      const res = await api.post('/upload/uploadSingleImage', imgData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imageUrl = res.data;
      setBlog({...blog, coverImage: [imageUrl]});
      ToastAndroid.show('Image uploaded successfully!', ToastAndroid.SHORT);
    } catch (err) {
      console.error(err);
      ToastAndroid.show('Upload failed', ToastAndroid.SHORT);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setBlog(prev => ({
        ...prev,
        authorInfo: {author: user._id, authorType: 'Photographer'},
        photographer: user._id,
      }));
    }
  }, [user]);
  console.log(blog);
  return (
    <SafeAreaView nestedScrollEnabled={true} style={style.background}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
        <View style={{flex: 1}}>
          <View style={style.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{gap: 30}}>
              <View style={style.section}>
                <Text style={style.headingText}>Blog Image</Text>
                <View style={style.uploadContainer}>
                  {!uploading &&
                    blog?.coverImage &&
                    blog?.coverImage.length > 0 && (
                      <Image
                        style={style.blogImage}
                        source={{uri: blog?.coverImage[0]}}
                      />
                    )}
                  {uploading && <ActivityIndicator size={50} />}
                  <Pressable
                    style={style.uploadBtn}
                    onPress={handleImageLibraryLaunch}>
                    <Icon name="upload" size={20} color={'white'} />
                  </Pressable>
                </View>
              </View>

              <View style={style.section}>
                <Text style={style.headingText}>Blog Title</Text>
                <AutoGrowTextInput
                  onChangeText={text =>
                    setBlog(prev => ({
                      ...prev,
                      content: {...prev.content, title: text},
                    }))
                  }
                />
              </View>

              <View style={style.section}>
                <Text style={style.headingText}>Blog Summary</Text>
                <AutoGrowTextInput
                  onChangeText={text =>
                    setBlog(prev => ({
                      ...prev,
                      content: {...prev.content, summary: text},
                    }))
                  }
                />
              </View>

              <View style={style.section}>
                <Text style={style.headingText}>Blog Body</Text>
                <View style={style.richTextContainer}>
                  <View style={{flex: 1, paddingHorizontal: 16}}>
                    <RichText editor={editor} />
                  </View>

                  <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={style.keyboardAvoidingView}>
                    <Toolbar editor={editor} />
                  </KeyboardAvoidingView>
                </View>
              </View>

              <View style={style.section}>
                <Text style={style.headingText}>Tags</Text>
                <AutoGrowTextInput
                  placeholder={'Separate tags with ,'}
                  onChangeText={text =>
                    setBlog(prev => ({
                      ...prev,
                      tags: text.split(',').map(tag => tag.trim()),
                    }))
                  }
                />
              </View>
            </ScrollView>
            <Button onPress={handleSubmit} btnText={'Save Changes'} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UploadBlog;
