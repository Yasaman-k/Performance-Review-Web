import LogoutIcon from '@material-ui/icons/PowerSettingsNew';
import React, { useCallback } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { IconButton, Theme, Typography, createStyles, makeStyles } from '@material-ui/core';
import { Styles } from 'src/shared/types/Styles';
import { useAuthGuardUser } from 'src/core/auth';

import { useLogoutMutation } from './logout.mutation';

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export function NavbarUser(props: Props) {
  const classes = useStyles(props);

  const { userLabel } = useAuthGuardUser();

  const logoutMutation = useLogoutMutation();

  const handleLogout = useCallback(() => {
    return logoutMutation();
  }, [logoutMutation]);

  return (
    <div className={classes.root}>
      <Typography variant="body2" className={classes.label}>
        {userLabel}
      </Typography>
      <IconButton onClick={handleLogout} color="inherit">
        <LogoutIcon />
      </IconButton>
    </div>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    label: {
      marginRight: theme.spacing(),
    },
  });

const useStyles = makeStyles(styles, { name: 'NavbarUser' });
type StyleProps = Styles<typeof styles>;
