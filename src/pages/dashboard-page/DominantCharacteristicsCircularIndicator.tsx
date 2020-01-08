import { i18n } from '@lingui/core';
import { Typography } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import { FCProps } from 'src/shared/types/FCProps';
import { DominantCharacteristicsCircularIndicator_review$key } from './__generated__/DominantCharacteristicsCircularIndicator_review.graphql';
import { DashboardPageCircularIndicator } from './DashboardPageCircularIndicator';
import { getDominantCharacteristicsValue, getNumberOfFilledFieldsOfDominantCharacteristics } from './utils';

interface OwnProps {
  review: DominantCharacteristicsCircularIndicator_review$key | null;
}

type Props = FCProps<OwnProps>;

const MAX_STRENGTHS = 3;
const MAX_WEAKNESSES = 3;

export function DominantCharacteristicsCircularIndicator(props: Props) {
  const review = useFragment(fragment, props.review);

  const { numberOfStrengths, numberOfWeaknesses } = getNumberOfFilledFieldsOfDominantCharacteristics(review);
  const value = getDominantCharacteristicsValue(review);
  const color = getColor(numberOfStrengths, numberOfWeaknesses);
  const text = getText(numberOfStrengths, numberOfWeaknesses);

  return (
    <DashboardPageCircularIndicator value={value} color={color}>
      <Typography>{text}</Typography>
    </DashboardPageCircularIndicator>
  );
}

export const fragment = graphql`
  fragment DominantCharacteristicsCircularIndicator_review on PersonReviewNode {
    strengths
    weaknesses
  }
`;

const getColor = (numberOfStrengths: number, numberOfWeaknesses: number) => {
  if (numberOfStrengths === 0 || numberOfWeaknesses === 0) {
    return 'low';
  }
  if (numberOfWeaknesses === MAX_WEAKNESSES && numberOfStrengths === MAX_STRENGTHS) {
    return 'complete';
  }
  if (numberOfWeaknesses + numberOfStrengths >= 4) {
    return 'high';
  }
  return 'medium';
};

const getText = (numberOfStrengths: number, numberOfWeaknesses: number) => {
  if (numberOfStrengths === 0 && numberOfWeaknesses === 0) {
    return i18n._("You haven't entered anything yet!");
  }
  if (numberOfStrengths === 0) {
    return i18n._('I thought you forgot to write your strengths!');
  }
  if (numberOfWeaknesses === 0) {
    return i18n._("It'd be a good idea to write a weakness!");
  }
  if (numberOfWeaknesses === MAX_WEAKNESSES && numberOfStrengths === MAX_STRENGTHS) {
    return i18n._("It's complete!");
  }
  if (numberOfWeaknesses + numberOfStrengths >= 4) {
    return i18n._("You're almost there!");
  }
  return i18n._("It'd be good if u wrote more!");
};