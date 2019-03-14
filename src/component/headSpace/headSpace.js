import React from 'react'
import {
  View,
  Image,
  StatusBar,
  TouchableOpacity
} from 'react-native'
import { TText, TSemiBold, TLight } from '../texts';
import colors from '../../config/colors';
import dotComponent from './dotComponent'
import images from '../../config/images';

export default ({
  title="Test title",
  labelBtn="ลืมรหัส",
  dis,
  dot,
  forgetbtn,
  children=({ dot }) => dotComponent({ dot })
}) => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomRightRadius: 8,
      borderBottomLeftRadius: 8,
    }}
  >
    <TSemiBold color={colors.white} fontSize={28}>{title}</TSemiBold>
    { dis && <TLight color={colors.smoky} fontSize={16}>{dis}</TLight> }
    { children({ dot }) }

    {
      forgetbtn && typeof forgetbtn === 'function' && (
        <TouchableOpacity
          onPress={forgetbtn}
          style={{
            position: 'absolute',
            bottom: '5%',
          }}
        >
          <TSemiBold 
            style={{ textDecorationLine: 'underline', textDecorationColor: 'white' }}
            color={colors.smoky}
          >
            {labelBtn}
          </TSemiBold>
        </TouchableOpacity>
      )
    }
    
  </View>
)