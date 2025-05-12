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
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  amount: {
    color: '#fff',
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
    color: '#000',
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
  color: '#fff',
  fontSize: 16,
  fontFamily: 'Outfit-bold',
},
orderType: {
  color: '#A1A1A1',
  fontSize: 14,
  marginVertical: 4,
},
statusTag: {
  backgroundColor: '#63D471',
  paddingHorizontal: 12,
  paddingVertical: 4,
  borderRadius: 12,
  alignSelf: 'flex-start',
},
statusText: {
  color: '#000',
  fontSize: 12,
  fontFamily: 'Outfit-regular',
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
  color: '#fff',
  fontFamily: 'Outfit-bold',
  fontSize: 14,
  marginBottom: 4,
},
metaText: {
  color: '#A1A1A1',
  fontSize: 12,
},
});
