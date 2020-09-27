import React from 'react';
import {Button, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const Photo = () => {
  return (
    <View>
      <Button
        onPress={() => {
          ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          }).then((image) => {
            console.log(image);
          });
        }}
        title="拍照后剪裁图片"
      />

      <Button
        onPress={() => {
          ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
          }).then((image) => {
            console.log(image);
          });
        }}
        title="相册选择后剪裁照片"
      />
    </View>
  );
};

export default Photo;
