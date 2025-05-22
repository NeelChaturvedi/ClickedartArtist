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
    gap: 24,
    marginBottom: 10,
    alignItems: 'flex-start',
    flexGrow: 1,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#1E1E1E',
    borderWidth: 0.5,
    overflow: 'hidden',
    borderColor: 'white',
  },
  title: {
    fontFamily: 'Outfit-bold',
    fontSize: 20,
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
