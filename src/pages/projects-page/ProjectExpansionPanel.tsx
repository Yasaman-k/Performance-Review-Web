import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box, ExpansionPanelProps, IconButton, Typography } from '@material-ui/core';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from 'src/shared/expansion-panel';
import { FCProps } from 'src/shared/types/FCProps';
import { FormChangeDetector } from 'src/shared/form-change-detector';
import { ReviewersInputProps } from 'src/shared/reviewers-input/ReviewersInput';
import { useDialog } from 'src/shared/hooks';
import { useFragment } from 'react-relay/hooks';

import { DeleteProjectReviewMutationInput } from './__generated__/deleteProjectReviewMutation.graphql';
import { ProjectExpansionPanel_projectReview$key } from './__generated__/ProjectExpansionPanel_projectReview.graphql';
import { ProjectForm, ProjectFormData } from './ProjectForm';
import { ProjectReviewTitleModal } from './project-review-title-editor';

interface OwnProps {
  projectReview: ProjectExpansionPanel_projectReview$key;
  initialProjectIds: Set<string>;
  saveProject: (data: ProjectFormData) => void;
  deleteProject: (input: DeleteProjectReviewMutationInput) => void;
  users: ReviewersInputProps['users'];
}

type Props = FCProps<OwnProps>;

export function ProjectExpansionPanel(props: Props) {
  const { initialProjectIds, saveProject, deleteProject, users } = props;
  const projectReview = useFragment(fragment, props.projectReview);
  const [isExpanded, setIsExpanded] = React.useState(() => !initialProjectIds.has(projectReview.id));
  const {
    dialog: { onClose, open },
    button: { onClick },
  } = useDialog(false);

  const handleShowModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick();
  };

  const handleExpanded: ExpansionPanelProps['onChange'] = (e, expanded) => {
    setIsExpanded(expanded);
  };

  return (
    <React.Fragment>
      <FormChangeDetector>
        <ExpansionPanel expanded={isExpanded} onChange={handleExpanded}>
          <ExpansionPanelSummary>
            <Box display="flex" alignItems="center">
              <Typography variant="h6">{projectReview.projectName}</Typography>
              {isExpanded && (
                <IconButton onClick={handleShowModal}>
                  <EditIcon />
                </IconButton>
              )}
            </Box>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <ProjectForm onSubmit={saveProject} onDelete={deleteProject} projectReview={projectReview} users={users} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </FormChangeDetector>
      <ProjectReviewTitleModal open={open} onClose={onClose} projectReview={projectReview} />
    </React.Fragment>
  );
}

const fragment = graphql`
  fragment ProjectExpansionPanel_projectReview on ProjectReviewNode {
    id
    projectName
    ...ProjectForm_projectReview
    ...ProjectReviewEditForm_projectReview
  }
`;
