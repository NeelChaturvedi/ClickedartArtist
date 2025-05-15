/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './style';
import BackButton from '../../components/Backbutton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../utils/apiClient';
import {useNavigation, useRoute} from '@react-navigation/native';
import AutoHeightWebView from 'react-native-autoheight-webview';

const Blog = () => {
  const {blogId} = useRoute().params;
  console.log(blogId);
  const [blog, setBlog] = React.useState({});

  const navigation = useNavigation();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get(`/blog/get-blog-by-id?id=${blogId}`);
        const data = response.data;
        console.log('Blog data:', data);
        setBlog(data.blog);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [blogId]);

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <View style={styles.backButtonContainer}>
          <BackButton />
        </View>
        <View style={styles.options}>
          <Pressable onPress={()=> navigation.navigate('BlogEdit')}>
            <Icon name="edit" size={24} color={'white'} />
          </Pressable>
          <Pressable>
            <Icon name="share" size={24} color={'white'} />
          </Pressable>
        </View>
      </View>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{gap: 30}}>
          <View style={styles.aboutBlog}>
            <View gap={10}>
              <Text style={styles.headingText}>{blog.content?.title}</Text>
              <Text style={styles.dateText}>
                {blog.createdAt &&
                  new Date(blog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
              </Text>
            </View>
            <View style={styles.aboutOwner}>
              <Image
                style={styles.blogOwner}
                source={{uri: blog.authorInfo?.author.profileImage}}
              />
              <View style={styles.ownerDetails}>
                <Text style={styles.nameText}>
                  {blog.authorInfo?.author.firstName || ''}{' '}
                  {blog.authorInfo?.author.lastName || ''}
                </Text>
                <Text style={styles.typeText}>
                  {blog.authorInfo?.author.rank}
                </Text>
              </View>
            </View>
          </View>

          <View gap={24}>
            <Text style={styles.summary}>{blog.content?.summary}</Text>
            {blog.coverImage && (
              <Image
                style={styles.coverImage}
                source={{uri: blog.coverImage[0]}}
              />
            )}
            <AutoHeightWebView
              style={{
                width: Dimensions.get('window').width - 15,
                marginTop: 35,
                marginBottom: 100,
                backgroundColor: 'black',
              }}
              customStyle={`
                body {
                  background-color: #000 !important;
                  font-family: 'Outfit', sans-serif;
                }

                p, span, div, li, h1, h2, h3, h4, h5, h6 {
                  color: #fff;
                }

                *[style*="color: #000"],
                *[style*="color:#000"],
                *[style*="color: #000000"],
                *[style*="color:#000000"],
                *[style*="color: rgb(0, 0, 0)"],
                *[style*="color:rgba(0,0,0,1)"],
                *[style*="color: rgb(1,1,1)"],
                *[style*="color: black"],
                *[style*="color: rgba(1,1,1,1)"] {
                  color: #ffffff !important;
                }

                *[style*="color: rgb(10, 10, 10); background-color: rgb(255, 255, 255);"] {
                  color: rgb(255, 255, 255) !important; 
                  background-color: rgb(0, 0, 0) !important;
                }

                a {
                  color: #4FC3F7;
                }
              `}
              onSizeUpdated={size => console.log(size.height)}
              files={[
                {
                  href: 'cssfileaddress',
                  type: 'text/css',
                  rel: 'stylesheet',
                },
              ]}
              source={{
                html: blog.content?.body,
              }}
              scalesPageToFit={false}
              viewportContent={'width=device-width, user-scalable=no'}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Blog;
