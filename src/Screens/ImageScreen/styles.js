import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    background:{
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
    },
    container:{
        flex: 1,
        padding: 20,
        gap: 40,
    },
    imageContainer:{
        width: '100%',
        height: 250,
        backgroundColor: '#1E1E1E',
        borderColor: 'white',
        borderWidth: 0.5,
    },
    formContainer:{
        gap:40,
    },
    infoContainer:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    section:{
        gap: 16,
        width:'100%',
        alignItems:'flex-start',
    },
    headingTitle:{
        fontFamily: 'Outfit-bold',
        fontSize: 20,
        color:'white',
    },
    nameText:{
        fontFamily: 'Outfit-medium',
        color:'white',
        fontSize: 18,
    },
    subSection:{
        gap: 16,
        width:'48%',
        alignItems:'flex-start',
    }
});
