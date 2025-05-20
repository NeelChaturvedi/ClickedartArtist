/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
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
import {RichText, Toolbar, useEditorBridge} from '@10play/tentap-editor';

const BlogEdit = () => {
  const {blogId, callBack} = useRoute().params;
  const navigation = useNavigation();
  const [blog, setBlog] = useState(null); // Start with null
  const [uploading, setUploading] = useState(false);
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: blog?.content?.body || '',
  });

  const handleImageLibraryLaunch = async () => {
    const result = await ImagePicker.openPicker({
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
    const fetchBlog = async () => {
      try {
        const response = await api.get(`/blog/get-blog-by-id?id=${blogId}`);
        const data = response.data;
        setBlog({...data.blog, blogId: data.blog._id, isActive: false});
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleSaveChanges = async () => {
    try {
      const updatedContent = await editor.getHTML(); // Get updated body
      const updatedBlog = {
        ...blog,
        content: {
          ...blog.content,
          body: updatedContent,
        },
      };
      await api.post('/blog/update-blog', updatedBlog);
      callBack(true);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating blog:', error.response?.data || error);
    }
  };

  if (!blog) {
    return <ActivityIndicator size="large" color="white" />;
  }

  return (
    <SafeAreaView nestedScrollEnabled={true} style={style.background}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
        <View style={{flex: 1}}>
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
                <View style={style.richTextContainer}>
                  <View style={{flex: 1, paddingHorizontal: 16}}>
                    <RichText nestedScrollEnabled={true} editor={editor} />
                  </View>

                  <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={style.keyboardAvoidingView}>
                    <Toolbar editor={editor} />
                  </KeyboardAvoidingView>
                </View>
              </View>
            </ScrollView>

            <Button
              btnText={'Save Changes'}
              onPress={() => {
                handleSaveChanges();
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
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
  richTextContainer: {
    borderRadius: 5,
    minHeight: 200,
    maxHeight: 400,
    borderWidth: 0.5,
    backgroundColor: 'white',
    width: '100%',
    borderColor: 'white',
    overflow: 'hidden',
    paddingBottom: 50,
  },
  keyboardAvoidingView: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'white',
    padding: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});

export default BlogEdit;
