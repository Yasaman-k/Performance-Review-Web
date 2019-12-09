import { Container, Grid } from '@material-ui/core';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { DictInput, Forminator, SubmitButton } from 'src/shared/forminator';
import Review from 'src/shared/review/Review';
import { themeDecorator } from 'src/stories/decorators/themeDecorator';

storiesOf('Review', module)
  .addDecorator(themeDecorator())
  .add('simple', () => {
    return (
      <Container>
        <Forminator onSubmit={action('submit')}>
          <DictInput>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Review title="سحابی بودن" prefix="sahabi" />
              </Grid>
              <Grid item xs={12}>
                <Review title="تیم" prefix="team" />
              </Grid>
              <Grid item>
                <SubmitButton variant="contained" color="primary">
                  ثبت
                </SubmitButton>
              </Grid>
            </Grid>
          </DictInput>
        </Forminator>
      </Container>
    );
  });
