import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { AuthPage } from 'src/pages/auth/AuthPage';
import { FCProps } from 'src/shared/types/FCProps';
import { AuthGuardQuery } from './__generated__/AuthGuardQuery.graphql';
import { UserContext } from './UserContext';

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function AuthGuard(props: Props) {
  const data = useLazyLoadQuery<AuthGuardQuery>(authGuardQuery, {});
  const { me } = data.viewer;
  const user = useMemo(() => (me ? { username: me.username, id: me.id } : null), [me]);

  if (user) {
    return <UserContext.Provider value={user}>{props.children}</UserContext.Provider>;
  } else {
    return <AuthPage />;
  }
}

const authGuardQuery = graphql`
  query AuthGuardQuery {
    viewer {
      me {
        id
        username
      }
    }
  }
`;