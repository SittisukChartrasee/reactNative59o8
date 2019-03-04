import React from 'react';
import { storiesOf } from '@storybook/react-native';
import Welcome from '../../src/screen/welcome'
import Keyboard from '../../src/component/keyboard'
import { storyBookStore } from '../../src/redux/store'

storiesOf('Screen', module)
  .add('Welcome', () => storyBookStore(Welcome));

storiesOf('Component', module)
  .add('Keyboard', () => <Keyboard />);

