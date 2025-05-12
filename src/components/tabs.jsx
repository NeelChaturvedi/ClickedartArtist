import {
  Pressable,
  Text,
  View,
  Animated,
  StyleSheet,
  Easing,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const Tabs = ({tabs, contentComponents}) => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [isLoading, setIsLoading] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleTabPress = (tabKey, index) => {
    setIsLoading(true);
    Animated.timing(slideAnim, {
      toValue: index * 140,
      duration: 500,
      easing: Easing.out(Easing.exp),
      useNativeDriver: false,
    }).start(() => {
      setActiveTab(tabKey);
      setIsLoading(false);
    });
  };

  return (
    <SafeAreaView style={style.background}>
      <View style={style.tabContainer}>
        <Animated.View style={[style.activeTab, {left: slideAnim}]} />
        {tabs.map((tab, index) => (
          <Pressable
            key={tab.key}
            onPress={() => handleTabPress(tab.key, index)}
            style={style.tabs}>
            <Text style={style.tabText}>{tab.label}</Text>
          </Pressable>
        ))}
      </View>
      <View style={style.content}>
        {isLoading ? (
          <View style={style.loading}>
            <ActivityIndicator size="large" color="#ED3147" />
          </View>
        ) : (
          contentComponents[activeTab]
        )}
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  background: {
    backgroundColor: '#000',
    flex: 1,
    gap: 20,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    paddingBottom: 80,
  },
  tabContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    width: '70%',
    borderRadius: 100,
    backgroundColor: '#1E1E1E',
    borderWidth: 0.5,
    borderColor: 'white',
    position: 'relative',
    overflow: 'hidden',
  },
  tabs: {
    width: '50%',
    alignItems: 'center',
  },
  activeTab: {
    position: 'absolute',
    width: '50%',
    borderRadius: 100,
    height: 60,
    backgroundColor: '#ED3147',
  },
  tabText: {
    fontFamily: 'Outfit-medium',
    fontSize: 20,
    color: 'white',
  },
  content: {
    width: '100%',
    height: '100%',
    paddingBottom: 50,
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  loading:{
    flex: 1,
    justifyContent: 'center',
  },
});

export default Tabs;
