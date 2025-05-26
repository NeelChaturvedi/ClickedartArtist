/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ScrollView,
  Text,
  View,
  Dimensions,  SafeAreaView,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {blogPageStyles} from './style';
import api from '../../utils/apiClient';
import {useRoute} from '@react-navigation/native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { useTheme } from 'src/themes/useTheme';

const Blog = ({setBlogSlug, setBlogName, setBlogId, setVal, val}) => {
  const {blogId} = useRoute().params;
  const [blog, setBlog] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const theme = useTheme();
  const styles = useMemo(() => blogPageStyles(theme), [theme]);

  const onRefresh = () => {
    setLoading(true);
    fetchBlog();
  };


  const fetchBlog = React.useCallback(async () => {
    try {
      const response = await api.get(`/blog/get-blog-by-id?id=${blogId}`);
      const data = response.data;
      setBlog(data.blog);
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
      setVal(false);
    }
  }, [blogId, setVal]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog, val]);

  useEffect(() => {
    if (!blog) {
      return;
    }
    setBlogSlug(blog?.slug);
    setBlogName(blog?.content?.title);
    setBlogId(blog?._id);
  }, [blog, setBlogSlug, setBlogName, setBlogId]);

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={onRefresh}
              tintColor={'#fff'}
            />
          }
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
                width: Dimensions.get('window'),
                marginTop: 35,
                marginBottom: 100,
                backgroundColor: theme.background,
              }}
              customStyle={`
                body {
                  background-color: ${theme.background} !important;
                  font-family: 'Outfit', sans-serif;
                  line-height: 1.3;
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
                *[style*="background-color: rgb(255, 255, 255); color: rgb(10, 10, 10);"] {
                  background-color: rgb(0, 0, 0) !important;
                  color: rgb(255, 255, 255) !important; 
                }

                a {
                  color: #4FC3F7;
                }
              `}
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
