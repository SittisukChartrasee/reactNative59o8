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
  title = "Test title",
  labelBtn = "ลืมรหัสผ่าน",
  dis,
  dot,
  forgetbtn,
  onPrevPage=undefined,
  component = ({ dot }) => dotComponent({ dot })
}) => (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.8, justifyContent: 'flex-end' }}>
        <View style={{ alignItems: 'flex-start', paddingTop: 60, marginLeft: 16 }}>
          { onPrevPage &&
            <TouchableOpacity
              onPress={onPrevPage}
              style={{ paddingRight: 30 }}
            >
              <Image source={images.iconback} />
            </TouchableOpacity>
          }
        </View>
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
          {dis && <TLight color={colors.smoky} fontSize={16}>{dis}</TLight>}
          {component({ dot })}

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
      </View>
    </View>
  )