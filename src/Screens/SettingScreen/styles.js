import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  background: {
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    gap: 30,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 30,
  },
  headingText: {
    fontFamily: 'Outfit-bold',
    fontSize: 32,
    color: 'white',
  },
  settingsItem:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
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
  itemText:{
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
