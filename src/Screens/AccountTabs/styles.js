import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
  },
  invoiceCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  invoiceText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  amount: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  date: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 6,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginTop: 6,
  },
  invoiceStatus: {
    fontWeight: '600',
    fontSize: 12,
    width: '100%',
    color: '#000',
    textTransform: 'capitalize',
  },
  paid: {
    backgroundColor: '#C6F6D5',
  },
  pending: {
    backgroundColor: '#FDE68A',
  },

  //Orders
  orderCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    marginBottom: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    rowGap: 16,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textSection: {
    flex: 1,
    alignItems: 'flex-start',
    gap: 4,
    paddingRight: 10,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Outfit-bold',
  },
  orderType: {
    color: '#A1A1A1',
    fontSize: 14,
    marginVertical: 4,
  },
  statusText: {
    color: '#000',
    fontSize: 12,
    paddingVertical: 1,
    fontFamily: 'Outfit-regular',
    textTransform: 'capitalize',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  metaSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  shippingSection: {
    flex: 1,
    width: '50%',
  },
  dateSection: {
    alignItems: 'flex-end',
    width: '50%',
  },
  metaLabel: {
    color: 'white',
    fontFamily: 'Outfit-bold',
    fontSize: 14,
    marginBottom: 4,
  },
  metaText: {
    color: '#A1A1A1',
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // loading: {
  //   color: 'white',
  //   fontSize: 18,
  //   textAlign: 'center',
  // },
  notFoundContainer: {
    flex: 1,
    marginTop: 100,
    textAlign: 'center',
  },
  notFoundTitle: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Outfit-medium',
    textAlign: 'center',
  },
  notFoundDesc: {
    color: '#A1A1A1',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    fontFamily: 'Outfit-regular',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    width: '90%',
    maxHeight: '85%',
    gap: 30,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Outfit-bold',
    color: 'white',
    textAlign: 'center',
  },
  modalDescription:{
    fontSize: 16,
    fontFamily: 'Outfit-regular',
    color: '#888888',
  },
  inputSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 16,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Outfit-medium',
    color: 'white',
  },
  wordCount:{
    color:'white',
    fontSize: 12,
    fontFamily: 'Outfit-regular',
    marginTop: -6,
  },
  trackingList:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trackingTitle:{
    fontFamily: 'Outfit-bold',
    width: '40%',
    fontSize: 16,
    color: 'white',
    textAlign: 'left',
  },
  trackingStatus:{
    fontFamily: 'Outfit-medium',
    fontSize: 16,
    width: '60%',
    color: 'white',
    textAlign: 'right',
  },
  closeModalBtn:{
    position: 'absolute',
    right: -6,
    top: -4,
    width: 40,
    height: 40,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#ED3147',
    borderRadius: 20,
  },
});
