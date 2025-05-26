import {StyleSheet} from 'react-native';

export const blogPageStyles = (theme) => StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.background,
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
    width: '100%',
  },
  headingText: {
    fontFamily: 'Outfit-bold',
    fontSize: 28,
    color: theme.text,
  },
  aboutBlog: {
    gap: 24,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  dateText: {
    color: '#888',
    fontFamily: 'Outfit-medium',
    fontSize: 16,
  },
  summary: {
    color: theme.text,
    fontSize: 20,
    lineHeight: 24,
  },
  coverImage: {
    height: 200,
    width: '100%',
    resizeMode: 'cover',
  },
  description: {
    color: theme.text,
    fontFamily: 'Outfit-regular',
    fontSize: 16,
  },
  blogOwner: {
    height: 70,
    width: 70,
    resizeMode: 'fill',
    borderRadius: 50,
  },
  aboutOwner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  ownerDetails: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 5,
  },
  nameText: {
    color: theme.text,
    fontFamily: 'Outfit-Medium',
    fontSize: 20,
  },
  typeText: {
    color: '#888',
    fontFamily: 'Outfit-regular',
    fontSize: 16,
    textTransform: 'capitalize',
    paddingRight: 10,
  },
});
