import { Paper } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { themeDecorator } from 'src/stories/decorators';
import { Lorem } from 'src/stories/helpers';
import { Overlay } from './Overlay';

storiesOf('Overlay', module)
  .addDecorator(themeDecorator())
  .add('default', () => (
    <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', height: '100vh' }}>
      <Paper style={{ position: 'relative', width: 300 }}>
        <Lorem paragraphCount={2} />
        <Overlay>With Overlay</Overlay>
      </Paper>
    </div>
  ));