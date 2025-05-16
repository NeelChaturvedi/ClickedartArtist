import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
  background: {
    backgroundColor: '#000',
    height: '100%',
    paddingHorizontal: 20,
    width: '100%',
    gap: 24,
  },
  sections: {
    gap: 16,
    marginBottom: 10,
    alignItems: 'flex-start',
    width: '100%',
  },
  title: {
    fontFamily: 'Outfit-medium',
    fontSize: 24,
    color: 'white',
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    alignItems: 'center',
  },
  growthType: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  growthText: {
    color: 'white',
    fontFamily: 'Outfit-medium',
    fontSize: 16,
  },
  growthTypeIndicator: {
    width: 24,
    height: 16,
    backgroundColor: 'white',
  },
  smallText: {
    fontFamily: 'Outfit-regular',
    fontSize: 18,
    color: '#A0A0A0',
  },
});
