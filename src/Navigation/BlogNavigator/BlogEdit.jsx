/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackButton from '../../components/Backbutton';
import Icon from 'react-native-vector-icons/FontAwesome';
import AutoGrowTextInput from '../../components/AutoGrowTextInput';
import Button from '../../components/button';
import {useNavigation, useRoute} from '@react-navigation/native';
import api from '../../utils/apiClient';
import ImagePicker from 'react-native-image-crop-picker';

const BlogEdit = () => {
  const {blogId, callBack} = useRoute().params;
  const [blog, setBlog] = useState({});
  const [uploading, setUploading] = useState(false);

  const handleImageLibraryLaunch = async () => {
    const result = await ImagePicker.openPicker({
      mediaType: 'photo',
      quality: 1,
    });

    console.log('Image result:', result);
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

  const navigation = useNavigation();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get(`/blog/get-blog-by-id?id=${blogId}`);
        const data = response.data;
        console.log('Blog data:', data.blog);
        setBlog({...data.blog, blogId: data.blog._id, isActive: false});
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleSaveChanges = async () => {
    try {
      await api.post('/blog/update-blog', blog);
      callBack(true);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating blog:', error.response.data);
    }
  };

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
                onPress={handleImageLibraryLaunch}
                style={style.uploadBtn}>
                <Icon name="upload" size={20} color={'white'} />
              </Pressable>
            </View>
          </View>

          <View style={style.section}>
            <Text style={style.headingText}>Blog Title</Text>
            <AutoGrowTextInput
              value={blog?.content?.title || ' '}
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
              value={blog?.content?.summary || ' '}
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
            <AutoGrowTextInput
              value={blog?.content?.body || ' '}
              onChangeText={text =>
                setBlog(prev => ({
                  ...prev,
                  content: {...prev.content, body: text},
                }))
              }
            />
          </View>
        </ScrollView>

        <Button
          btnText={'Save Changes'}
          onPress={() => {
            handleSaveChanges();
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
    width: '100%',
    borderRadius: 5,
    padding: 10,
    borderWidth: 0.5,
    gap: 20,
    borderColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  blogImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  uploadBtn: {
    width: '100%',
    height: 50,
    backgroundColor: '#ED3147',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default BlogEdit;
