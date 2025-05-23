import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import Blog from '../../Screens/Blogs/Blog';
import BlogEdit from './BlogEdit';
import {Pressable, Share, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

enableScreens();

const Stack = createNativeStackNavigator();

function BlogHeaderRight({blogName, blogSlug, blogId, callBack}) {
  const navigation = useNavigation();
  const onShare = async () => {
    await Share.share({
      message: `${blogName}: https://clickedart.com/blog/${blogSlug}`,
    });
  };
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', gap: 16}}>
      <Pressable
        // style={{marginRight: 12}}
        onPress={() => navigation.navigate('BlogEdit', {blogId, callBack})}>
        <Icon name="edit" size={24} color={'white'} />
      </Pressable>
      <Pressable onPress={() => onShare()}>
        <Icon name="share" size={24} color={'white'} />
      </Pressable>
    </View>
  );
}

export default function BlogNavigator() {
  const [blogSlug, setBlogSlug] = React.useState({});
  const [blogName, setBlogName] = React.useState({});
  const [blogId, setBlogId] = React.useState({});
  const [val, setVal] = React.useState(false);
  const callBack = value => {
    setVal(value);
  };

  const renderHeaderRight = React.useCallback(
    () => (
      <BlogHeaderRight
        blogName={blogName}
        blogSlug={blogSlug}
        blogId={blogId}
        callBack={callBack}
      />
    ),
    [blogName, blogSlug, blogId],
  );

  return (
    <Stack.Navigator
      initialRouteName="Blogs"
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: 'black',
        },

        headerTintColor: 'white',
      }}>
      <Stack.Screen
        name="Blogs"
        options={{
          headerRight: renderHeaderRight,
          headerTitle: '',
        }}
        // component={Blog}
        children={props => (
          <Blog
            {...props}
            setBlogSlug={setBlogSlug}
            setBlogName={setBlogName}
            setBlogId={setBlogId}
            setVal={setVal}
            val={val}
          />
        )}
      />
      <Stack.Screen
        options={{headerTitle: 'Edit Blog'}}
        name="BlogEdit"
        children={props => <BlogEdit {...props} />}
      />
    </Stack.Navigator>
  );
}
