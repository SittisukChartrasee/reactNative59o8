import React from 'react'
import {
  View,
  Image,
  StatusBar,
  TouchableOpacity
} from 'react-native'
import { TText, TSemiBold, TLight, TBold } from '../texts';
import colors from '../../config/colors';
import images from '../../config/images';

const findCursor = (arr, index) => index === arr.indexOf(false)

export default ({
  dot=['','','','','','']
}) => (
  <View style={{ marginTop: 32, flexDirection: 'row', justifyContent: 'space-around' }}>
    {
      dot.map((d, key) => (
        <View key={key}>
          {
            d
              ? (
                <View>
                  <View
                    style={{
                      width: 32,
                      marginLeft: key === 0 ? 0 : 4
                    }}
                  >
                    <TBold fontSize={28} color={colors.white}>{d}</TBold>
                    <View style={{ width: '100%', backgroundColor: colors.white, height: 2, opacity: .2 }} />
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    width: 32,
                    marginLeft: key === 0 ? 0 : 4
                  }}
                >
                  <TBold fontSize={28} color={colors.white}>{` `}</TBold>
                  <View style={{ width: '100%', backgroundColor: colors.white, height: 2, opacity: findCursor(dot, key) ? 1 : .2 }} />
                </View>
              )
          }
        </View>
      ))
    }
  </View>
)