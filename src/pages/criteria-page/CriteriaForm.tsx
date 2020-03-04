import graphql from 'babel-plugin-relay/macro';
import React, { useContext } from 'react';
import { CriterionItem } from 'src/shared/criterion-item';
import { DictInput, Forminator, SubmitButton } from 'src/shared/forminator';
import { FCProps } from 'src/shared/types/FCProps';
import { Grid } from '@material-ui/core';
import { MDXContext } from '@mdx-js/react';
import { SectionGuide } from 'src/shared/section-guide';
import { ServerValueProvider } from 'src/shared/server-value';
import { StickyActionBar } from 'src/shared/sticky-action-bar/StickyActionBar';
import { i18n } from '@lingui/core';
import { importMDX } from 'mdx.macro';
import { useFragment } from 'react-relay/hooks';

import { CriteriaFormValue } from './CriteriaFormValue';
import { CriteriaForm_review$key } from './__generated__/CriteriaForm_review.graphql';

// self review helper texts
const OrganizationCultureAdoptionContentSelfReview = importMDX.sync(
  './help-texts/self-review/OrganizationCultureAdoptionContent.mdx',
);
const ProblemSolvingContentSelfReview = importMDX.sync('./help-texts/self-review/ProblemSolvingContent.mdx');
const ExecutionContentSelfReview = importMDX.sync('./help-texts/self-review/ExecutionContent.mdx');
const LeadershipContentSelfReview = importMDX.sync('./help-texts/self-review/LeadershipContent.mdx');
const ThoughtLeadershipContentSelfReview = importMDX.sync('./help-texts/self-review/ThoughtLeadershipContent.mdx');
const PresenceContentSelfReview = importMDX.sync('./help-texts/self-review/PresenceContent.mdx');
const DescriptionContentSelfReview = importMDX.sync('./help-texts/self-review/DescriptionContent.mdx');

// peer review helper texts
const OrganizationCultureAdoptionContentPeerReview = importMDX.sync(
  './help-texts/peer-review/OrganizationCultureAdoptionContent.mdx',
);
const ProblemSolvingContentPeerReview = importMDX.sync('./help-texts/peer-review/ProblemSolvingContent.mdx');
const ExecutionContentPeerReview = importMDX.sync('./help-texts/peer-review/ExecutionContent.mdx');
const LeadershipContentPeerReview = importMDX.sync('./help-texts/peer-review/LeadershipContent.mdx');
const ThoughtLeadershipContentPeerReview = importMDX.sync('./help-texts/peer-review/ThoughtLeadershipContent.mdx');
const PresenceContentPeerReview = importMDX.sync('./help-texts/peer-review/PresenceContent.mdx');
const DescriptionContentPeerReview = importMDX.sync('./help-texts/peer-review/DescriptionContent.mdx');

const fragment = graphql`
  fragment CriteriaForm_review on PersonReviewNode {
    sahabinessComment
    sahabinessRating
    problemSolvingComment
    problemSolvingRating
    executionComment
    executionRating
    thoughtLeadershipComment
    thoughtLeadershipRating
    leadershipComment
    leadershipRating
    presenceComment
    presenceRating
  }
`;

interface OwnProps {
  review: CriteriaForm_review$key | null;
  isSelfReview: boolean;
  onSubmit: (data: CriteriaFormValue) => void;
}

type Props = FCProps<OwnProps>;

export function CriteriaForm(props: Props) {
  const { onSubmit, isSelfReview } = props;
  const components = useContext(MDXContext);
  const review = useFragment(fragment, props.review);
  const reviewType = isSelfReview ? 'self' : 'peer';

  // if review properties are null, replace it with undefined
  let value: CriteriaFormValue = {};
  for (const key in review) {
    Object.assign(value, { [key]: review?.[key as keyof CriteriaFormValue] ?? undefined });
  }

  return (
    <ServerValueProvider value={value}>
      <Forminator onSubmit={onSubmit} initialValue={value}>
        <Grid container spacing={4}>
          <DictInput>
            <Grid item xs={12}>
              <SectionGuide>
                {isSelfReview ? (
                  <DescriptionContentSelfReview components={components} />
                ) : (
                  <DescriptionContentPeerReview components={components} />
                )}
              </SectionGuide>
            </Grid>
            <Grid item xs={12}>
              <CriterionItem
                title={i18n._('Organization Culture Adoption')}
                type={reviewType}
                details={
                  isSelfReview ? (
                    <OrganizationCultureAdoptionContentSelfReview components={components} />
                  ) : (
                    <OrganizationCultureAdoptionContentPeerReview components={components} />
                  )
                }
                prefix="sahabiness"
              />
            </Grid>
            <Grid item xs={12}>
              <CriterionItem
                title={i18n._('Problem Solving')}
                type={reviewType}
                details={
                  isSelfReview ? (
                    <ProblemSolvingContentSelfReview components={components} />
                  ) : (
                    <ProblemSolvingContentPeerReview components={components} />
                  )
                }
                prefix="problemSolving"
              />
            </Grid>
            <Grid item xs={12}>
              <CriterionItem
                title={i18n._('Execution')}
                type={reviewType}
                details={
                  isSelfReview ? (
                    <ExecutionContentSelfReview components={components} />
                  ) : (
                    <ExecutionContentPeerReview components={components} />
                  )
                }
                prefix="execution"
              />
            </Grid>
            <Grid item xs={12}>
              <CriterionItem
                title={i18n._('Thought Leadership')}
                type={reviewType}
                details={
                  isSelfReview ? (
                    <ThoughtLeadershipContentSelfReview components={components} />
                  ) : (
                    <ThoughtLeadershipContentPeerReview components={components} />
                  )
                }
                prefix="thoughtLeadership"
              />
            </Grid>
            <Grid item xs={12}>
              <CriterionItem
                title={i18n._('Leadership')}
                type={reviewType}
                details={
                  isSelfReview ? (
                    <LeadershipContentSelfReview components={components} />
                  ) : (
                    <LeadershipContentPeerReview components={components} />
                  )
                }
                prefix="leadership"
              />
            </Grid>
            <Grid item xs={12}>
              <CriterionItem
                title={i18n._('Presence')}
                type={reviewType}
                details={
                  isSelfReview ? (
                    <PresenceContentSelfReview components={components} />
                  ) : (
                    <PresenceContentPeerReview components={components} />
                  )
                }
                prefix="presence"
              />
            </Grid>
          </DictInput>
          <StickyActionBar>
            <SubmitButton variant="contained" color="primary">
              {i18n._('Save')}
            </SubmitButton>
          </StickyActionBar>
        </Grid>
      </Forminator>
    </ServerValueProvider>
  );
}
