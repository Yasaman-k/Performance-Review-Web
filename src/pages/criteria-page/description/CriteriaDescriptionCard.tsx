import { i18n } from '@lingui/core';
import { Card, CardContent, CardHeader, Container } from '@material-ui/core';
// @ts-ignore
import { MDXContext } from '@mdx-js/react';
import { importMDX } from 'mdx.macro';
import React, { useContext } from 'react';
import { FCProps } from 'src/shared/types/FCProps';

const Content = React.lazy(() => importMDX('./Content.mdx'));

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function CriteriaDescriptionCard(props: Props) {
  const components = useContext(MDXContext);

  return (
    <Card>
      <CardHeader title={i18n._('Performance Competencies')} />
      <CardContent>
        <Container maxWidth="sm">
          <Content components={components} />
        </Container>
      </CardContent>
    </Card>
  );
}