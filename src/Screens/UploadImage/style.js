import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    background:{
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
    },
    container:{
        flexGrow: 1,
        padding: 20,
        gap: 20,
    },
    uploadContainer:{
        height: 250,
        borderWidth: 0.5,
        borderRadius: 10,
        gap: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        width: '100%',
        backgroundColor: '#1E1E1E',
    },
    uploadText: {
        color:'white',
        fontSize: 20,
        fontFamily: 'Outfit-medium',
    },
    tabContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        gap: 20,
    },
    tabText: {
        color:'#999',
        fontFamily: 'Outfit-medium',
        fontSize: 16,
    },
    addContainer:{
        backgroundColor: '#1E1E1E',
        height: 60,
        borderRadius: 10,
        padding: 20,
    },
    watermarkImage:{
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between',
    },
    uploadBtn:{
        backgroundColor: '#ED3147',
        padding:10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
});
