import {StyleSheet} from 'react-native';

export const createAccountStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 16,
  },
  invoiceCard: {
    backgroundColor: theme.card,
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
    color: theme.text,
    fontSize: 16,
    fontWeight: '600',
  },
  amount: {
    color: theme.text,
    fontSize: 16,
    fontWeight: '700',
  },
  date: {
    color: '#888',
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
    backgroundColor: theme.card,
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
    color: theme.text,
    fontSize: 16,
    fontFamily: 'CircularStd-Bold',
  },
  orderType: {
    color: '#888',
    fontSize: 14,
    marginVertical: 4,
  },
  statusText: {
    color: '#000',
    fontSize: 12,
    paddingVertical: 1,
    fontFamily: 'CircularStd-Regular',
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
    color: theme.text,
    fontFamily: 'CircularStd-Bold',
    fontSize: 14,
    marginBottom: 4,
  },
  metaText: {
    color: '#888',
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // loading: {
  //   color: theme.text,
  //   fontSize: 18,
  //   textAlign: 'center',
  // },
  notFoundContainer: {
    flex: 1,
    marginTop: 100,
    textAlign: 'center',
  },
  notFoundTitle: {
    color: theme.text,
    fontSize: 16,
    fontFamily: 'CircularStd-Medium',
    textAlign: 'center',
  },
  notFoundDesc: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    fontFamily: 'CircularStd-Regular',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: theme.card,
    width: '90%',
    maxHeight: '85%',
    gap: 30,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'CircularStd-Bold',
    color: theme.text,
    textAlign: 'center',
  },
  modalDescription:{
    fontSize: 16,
    fontFamily: 'CircularStd-Regular',
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
    fontFamily: 'CircularStd-Medium',
    color: theme.text,
  },
  wordCount:{
    color:theme.text,
    fontSize: 12,
    fontFamily: 'CircularStd-Regular',
    marginTop: -6,
  },
  trackingList:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trackingTitle:{
    fontFamily: 'CircularStd-Bold',
    width: '40%',
    fontSize: 16,
    color: theme.text,
    textAlign: 'left',
  },
  trackingStatus:{
    fontFamily: 'CircularStd-Medium',
    fontSize: 16,
    width: '60%',
    color: theme.text,
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
