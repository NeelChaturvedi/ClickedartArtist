import {StyleSheet} from 'react-native';

export const imageScreenStyles = (theme) => StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.background,
  },
  container: {
    flex: 1,
    padding: 20,
    gap: 40,
    justifyContent: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 247,
    overflow: 'hidden',
    backgroundColor: theme.card,
    position: 'relative',
  },
  formContainer: {
    gap: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  section: {
    gap: 16,
    width: '100%',
    alignItems: 'flex-start',
  },
  headingTitle: {
    fontFamily: 'Calibri-Bold',
    fontSize: 20,
    color: theme.text,
  },
  nameText: {
    fontFamily: 'Calibri-Medium',
    color: theme.text,
    fontSize: 18,
  },
  discountedText: {
    fontFamily: 'Calibri-Medium',
    color: theme.text,
    fontSize: 18,
    opacity: 0.7,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  priceText: {
    fontFamily: 'Calibri-Bold',
    color: theme.text,
    fontSize: 18,
  },
  discountPercentage: {
    fontFamily: 'Calibri-Medium',
    color: '#ed3147',
    fontSize: 18,
    opacity: 1,
  },
  subSection: {
    gap: 16,
    width: '48%',
    alignItems: 'flex-start',
  },
  detailsContainer: {
    width: '100%',
    padding: 16,
    backgroundColor: theme.card,
    borderColor: theme.border,
    borderWidth: 0.5,
    gap: 14,
  },
  aboutText: {
    fontFamily: 'Calibri-Regular',
    color: theme.text,
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: theme.card,
    width: '80%',
    gap: 10,
    padding: 20,
    borderRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalOption: {
    fontSize: 18,
    width: '100%',
    paddingVertical: 10,
    color: theme.text,
  },
  guideText:{
    fontFamily: 'Calibri-Regular',
    color: '#ED3147',
    fontSize: 14,
    textDecorationLine:'underline',
  },
});
