import graphql from 'babel-plugin-relay/macro';
import React, { useCallback } from 'react';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from 'src/shared/expansion-panel';
import { FCProps } from 'src/shared/types/FCProps';
import { Grid, Theme, Typography, createStyles, makeStyles } from '@material-ui/core';
import { MultilineOutput } from 'src/shared/multiline-output';
import { QuoteBox } from 'src/shared/quote-box';
import { Styles } from 'src/shared/types/Styles';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { i18n } from '@lingui/core';
import { useBiDiSnackbar } from 'src/shared/snackbar';
import { useFragment } from 'react-relay/hooks';

import { PeerReviewProjectExpansionPanel_projectReview$key } from './__generated__/PeerReviewProjectExpansionPanel_projectReview.graphql';
import { PeerReviewProjectsForm, PeerReviewProjectsFormValue } from '../projects-form/PeerReviewProjectsForm';
import { useSaveProjectComment } from './saveProjectComment.mutation';

const fragment = graphql`
  fragment PeerReviewProjectExpansionPanel_projectReview on ProjectReviewNode {
    id
    reviewee {
      ...getUserLabel_user
    }
    projectName
    text
    comment {
      ...PeerReviewProjectsForm_projectComment
    }
  }
`;

interface OwnProps {
  projectReview: PeerReviewProjectExpansionPanel_projectReview$key;
}

type Props = FCProps<OwnProps> & StyleProps;

export function PeerReviewProjectExpansionPanel(props: Props) {
  const projectReview = useFragment(fragment, props.projectReview);
  const classes = useStyles(props);
  const saveProjectComment = useSaveProjectComment();
  const projectReviewId = projectReview.id;
  const { enqueueSnackbar } = useBiDiSnackbar();

  const handleSubmit = useCallback(
    (input: PeerReviewProjectsFormValue) => {
      saveProjectComment({ input: { ...input, projectReviewId } })
        .then((res) => {
          enqueueSnackbar(i18n._('Successfully saved.'), { variant: 'success' });
        })
        .catch((error) => {
          enqueueSnackbar(i18n._('Something went wrong.'), { variant: 'error' });
        });
    },
    [saveProjectComment, projectReviewId, enqueueSnackbar],
  );

  const projectName = projectReview.projectName;
  const name = getUserLabel(projectReview.reviewee);

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary>
        <Typography variant="h5">{projectName}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="button" className={classes.detailTypography}>
              {i18n._("{name}'s comment about his/her achievements in this project", { name })}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <QuoteBox>
              <MultilineOutput value={projectReview.text} enableTruncating />
            </QuoteBox>
          </Grid>
          {projectReview.comment && (
            <>
              <Grid item xs={12}>
                <Typography variant="button" className={classes.detailTypography}>
                  {i18n._("Your comment about {name}'s performance in this project", { name })}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <PeerReviewProjectsForm onSubmit={handleSubmit} projectComment={projectReview.comment} />
              </Grid>
            </>
          )}
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    detailTypography: {
      color: theme.palette.grey[700],
    },
  });

const useStyles = makeStyles(styles, { name: 'PeerReviewProjectExpansionPanel' });
type StyleProps = Styles<typeof styles>;
