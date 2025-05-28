/* eslint-disable react-native/no-inline-styles */
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {View} from 'react-native';
import {useTheme} from 'src/themes/useTheme';

const ImageDetailsSkeleton = () => {
  const theme = useTheme();
  return (
    <SkeletonPlaceholder
      borderRadius={10}
      backgroundColor={theme.loaderBackground}
      highlightColor={theme.loaderColor}>
      <View style={{padding: 16, gap: 30}}>
        {/* Image Container with frame overlays */}
        <View
          style={{
            width: '100%',
            height: 247,
            borderRadius: 0,
            overflow: 'hidden',
            marginBottom: 20,
          }}
        />

        <View style={{gap: 10}}>
          <View style={{width: '30%', height: 25, marginBottom: 10}} />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <View style={{width: 80, height: 20}} />
            <View style={{width: 60, height: 20}} />
            <View style={{width: 60, height: 20}} />
          </View>
        </View>

        {/* Media Type Dropdown */}
        <View style={{gap: 16}}>
          <View style={{width: '30%', height: 25}} />
          <View style={{width: '100%', height: 50}} />
        </View>

        {/* Size and Frame Dropdowns */}
        <View style={{gap: 16}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: '48%', height: 30}} />
            <View style={{width: '48%', height: 30}} />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: '48%', height: 50}} />
            <View style={{width: '48%', height: 50}} />
          </View>
        </View>

        <View style={{borderWidth:2, borderColor: theme.border, padding: 10, borderRadius: 0, gap: 20}}>
            <View style={{width: '30%', height: 20}} />
            <View style={{width: '100%', height: 40}} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default ImageDetailsSkeleton;
