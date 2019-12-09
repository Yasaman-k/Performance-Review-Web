import { CircularProgress, makeStyles, Theme, Typography } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React from 'react';
import { NumberOutput } from 'src/shared/number-output/NumberOutput';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps {
  count: number;
  max: number;
}

type Props = FCProps<OwnProps> & StyleProps;

function Counter({ count, max, ...props }: Props) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.circularProgress} variant="static" size={20} value={(count * 100) / max} />
      <Typography className={classes.typography}>
        <NumberOutput>
          {count} / {max}
        </NumberOutput>
      </Typography>
    </div>
  );
}

export default Counter;

const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing(0.5),
  } as CSSProperties,
  circularProgress: {
    marginRight: theme.spacing(),
  } as CSSProperties,
  typography: {
    display: 'inline-block',
    direction: 'ltr',
    flip: false,
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'Counter' });
type StyleProps = Styles<typeof styles>;
