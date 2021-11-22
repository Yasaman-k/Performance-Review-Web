import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box, Grid, Typography } from '@material-ui/core';
import { Evaluation } from 'src/global-types';
import { EvaluationOutput } from 'src/shared/evaluation-output';
import { FCProps } from 'src/shared/types/FCProps';
import { MultilineOutput } from 'src/shared/multiline-output';
import { i18n } from '@lingui/core';
import { useFragment } from 'react-relay/hooks';

import { ProjectCommentOutput_comment$key } from './__generated__/ProjectCommentOutput_comment.graphql';

const fragment = graphql`
  fragment ProjectCommentOutput_comment on ProjectCommentNode {
    text
    rating
  }
`;

interface OwnProps {
  comment: ProjectCommentOutput_comment$key;
}

type Props = FCProps<OwnProps>;

export function ProjectCommentOutput(props: Props) {
  const comment = useFragment(fragment, props.comment);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography color="textSecondary" gutterBottom>
          {i18n._('Evaluation')}:
        </Typography>
        <Box width={240}>
          <EvaluationOutput value={comment.rating as Evaluation} type="peer" />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography color="textSecondary" gutterBottom>
          {i18n._('Accomplishments Description')}:
        </Typography>
        <MultilineOutput value={comment.text} />
      </Grid>
    </Grid>
  );
}
