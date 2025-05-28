import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ProfileSkeleton = () => {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <SkeletonPlaceholder.Item>
        {/* Cover Image */}
        <SkeletonPlaceholder.Item height={180} width="100%" />

        {/* Profile Image */}
        <SkeletonPlaceholder.Item
          width={80}
          height={80}
          borderRadius={40}
          alignSelf="center"
          marginTop={-40}
        />

        {/* Name & Address */}
        <SkeletonPlaceholder.Item alignItems="center" marginTop={10}>
          <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} />
          <SkeletonPlaceholder.Item
            width={100}
            height={15}
            borderRadius={4}
            marginTop={6}
          />
        </SkeletonPlaceholder.Item>

        {/* Bio */}
        <SkeletonPlaceholder.Item alignItems="center" marginTop={10}>
          <SkeletonPlaceholder.Item width="90%" height={40} borderRadius={4} />
        </SkeletonPlaceholder.Item>

        {/* Stats */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-around"
          marginTop={20}>
          {[1, 2, 3].map(index => (
            <SkeletonPlaceholder.Item key={index} alignItems="center">
              <SkeletonPlaceholder.Item width={60} height={15} />
              <SkeletonPlaceholder.Item
                width={40}
                height={20}
                borderRadius={4}
                marginTop={4}
              />
            </SkeletonPlaceholder.Item>
          ))}
        </SkeletonPlaceholder.Item>

        {/* Tabs */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-around"
          marginTop={20}>
          {[1, 2, 3].map(index => (
            <SkeletonPlaceholder.Item key={index} width={70} height={20} />
          ))}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default ProfileSkeleton;
