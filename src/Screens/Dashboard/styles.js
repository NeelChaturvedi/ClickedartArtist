import {StyleSheet} from 'react-native';

export const createDashboardStyles = (theme) => StyleSheet.create({
  background: {
    backgroundColor: theme.background,
    height: '100%',
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
    backgroundColor: theme.card,
    borderWidth: 0.5,
    overflow: 'hidden',
    borderColor: theme.border,
  },
  title: {
    fontFamily: 'Outfit-bold',
    fontSize: 20,
    color: theme.text,
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
    color: theme.text,
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
    color: '#888',
  },
});
