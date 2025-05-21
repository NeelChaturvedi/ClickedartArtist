import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
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
    backgroundColor: '#1E1E1E',
    position: 'relative',
  },
  formContainer: {
    gap: 40,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  section: {
    gap: 16,
    width: '100%',
    alignItems: 'flex-start',
  },
  headingTitle: {
    fontFamily: 'Outfit-bold',
    fontSize: 20,
    color: 'white',
  },
  nameText: {
    fontFamily: 'Outfit-medium',
    color: 'white',
    fontSize: 18,
  },
  subSection: {
    gap: 16,
    width: '48%',
    alignItems: 'flex-start',
  },
  detailsContainer: {
    width: '100%',
    padding: 16,
    backgroundColor: '#1E1E1E',
    borderColor: 'white',
    borderWidth: 0.5,
    gap: 14,
  },
  aboutText: {
    fontFamily: 'Outfit-regular',
    color: 'white',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
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
    color: 'white',
  },
});
