import { Box, Typography } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import { LoremIpsum } from 'lorem-ipsum';
import React, { Fragment } from 'react';
import { InView } from 'src/shared/in-view/InView';
import { useInViewContext } from 'src/shared/in-view/InViewContext';
import { Overlayscrollbars } from 'src/shared/overlayscrollbars';
import { storyWrapperDecorator, themeDecorator } from 'src/stories/decorators';

const Component = () => {
  const { topInView, bottomInView } = useInViewContext();
  const color = topInView ? 'blue' : bottomInView ? 'red' : 'black';
  return (
    <Fragment>
      <div style={{ position: 'fixed', top: 0 }}>
        <Typography>{`topInView: ${topInView}`}</Typography>
        <Typography>{`bottomInView: ${bottomInView}`}</Typography>
      </div>
      <Box color={color}>{new LoremIpsum().generateParagraphs(10)}</Box>
    </Fragment>
  );
};

storiesOf('In View', module)
  .addDecorator(themeDecorator())
  .addDecorator(storyWrapperDecorator({}))
  .add('default', () => (
    <Overlayscrollbars style={{ height: '100%' }}>
      <InView>
        <Component />
      </InView>
    </Overlayscrollbars>
  ));