import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    background:{
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
        alignItems:'center',
    },
    container:{
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
    headingText:{
        fontFamily: 'Outfit-bold',
        fontSize: 28,
        color: 'white',
    },
    header: {
        flexDirection:'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 10,
        paddingVertical: 10,
    },
    options:{
        flexDirection:'row',
        alignItems: 'center',
        gap:20,
        padding:20,
    },
    aboutBlog:{
        gap:24,
        flexDirection: 'column',
        alignItems:'flex-start',
    },
    dateText: {
        color:'#888',
        fontFamily: 'Outfit-medium',
        fontSize: 16,
    },
    summary:{
        color: 'white',
        fontSize: 20,
        lineHeight: 24,
    },
    coverImage:{
        maxHeight: 300,
        width: '100%',
        resizeMode: 'contain',
    },
    description:{
        color: 'white',
        fontFamily: 'Outfit-regular',
        fontSize: 16,
    },
    blogOwner:{
        height: 70,
        width:70,
        resizeMode: 'fill',
        borderRadius: 50,
    },
    aboutOwner:{
        flexDirection:'row',
        alignItems:'center',
        gap:20,
    },
    ownerDetails:{
        flexDirection:'column',
        alignItems:'flex-start',
        gap:5,
    },
    nameText:{
        color:'white',
        fontFamily: 'Outfit-Medium',
        fontSize: 20,
    },
    typeText:{
        color:'#888',
        fontFamily: 'Outfit-regular',
        fontSize: 16,
    },
});
