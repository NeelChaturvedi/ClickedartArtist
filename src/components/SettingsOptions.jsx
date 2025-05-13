import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const SettingsOptions = ({icon, label, screen}) => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity style={style.settingsItem} onPress={() => navigation.navigate(screen)}>
      <View style={style.options}>
        <View style={style.iconContainer}>
          <Icon name={icon} size={24} color="white" />
        </View>
        <Text style={style.itemText}>{label}</Text>
      </View>
      <Feather name="chevron-right" size={24} color="white" />
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '50%',
    gap: 20,
  },
  itemText: {
    fontFamily: 'Outfit-regular',
    fontSize: 16,
    color: 'white',
  },
  iconContainer: {
    height: 30,
    width: 30,
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SettingsOptions;
