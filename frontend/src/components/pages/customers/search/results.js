import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { useGutterBorderedGridStyles } from '@mui-treasury/styles/grid/gutterBordered';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(10)
  } ,
  card: {
    borderRadius: 12,
    minWidth: 256,
    /* textAlign: 'left', */
  },
  avatar: {
    width: 60,
    height: 60,
    margin: 'left',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginTop: 8,
    marginBottom: 0,
    margin:'left',
  },
  subheader: {
    fontSize: 14,
    color: "grey",
    marginBottom: '0.875em',
  },
  descriptionSubheader: {
    fontSize: 14,
    color: "grey",
    marginBottom: '0.875em',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: "grey",
    marginBottom: '0.875em',
    textAlign:'center',
  },
  statLabel: {
    fontSize: 12,
    color: "grey",
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: 0,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    letterSpacing: '1px',
  },
}));

export const Results = React.memo(function ProfileCard() {
  const styles = useStyles();
  const shadowStyles = useFadedShadowStyles();
  const borderedGridStyles = useGutterBorderedGridStyles({
    borderColor: 'rgba(0, 0, 0, 0.08)',
    height: '50%',
  });
  return (
    <Container className={styles.container}>
    <Card className={cx(styles.card, shadowStyles.root)}>
      <CardContent>
      <Box display={'flex'}>
        <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
        <Avatar className={styles.avatar} src={''} />
        <h3 className={styles.heading}>Ali Makkawi</h3>
        <span className={styles.subheader}>Electrician</span>
        </Box>
        <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
        <h3 className={styles.descriptionSubheader}>Description</h3>
        <p className={styles.description}>Electrician with many years experience. worked in all of Lebanon.</p>
        </Box>
      </Box>
      </CardContent>
      <Divider light />
      <Box display={'flex'}>
        <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
          <p className={styles.statLabel}>Distance</p>
          <p className={styles.statValue}>5 kms</p>
        </Box>
        <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
          <p className={styles.statLabel}>Rating</p>
          <p className={styles.statValue}>5</p>
        </Box>
      </Box>
    </Card>
    </Container>
  );
});

export default Results