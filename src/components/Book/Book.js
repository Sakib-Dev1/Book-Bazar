import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function Book(props) {
  const { _id, name, author, price, image } = props;
  const history = useHistory();
  const classes = useStyles();

  return (
    <Card style={{ marginTop: '6rem' }} className={classes.root}>
      <CardActionArea>
        <CardMedia
          component='img'
          alt='Contemplative Reptile'
          height='140'
          image={image}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {name}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {author}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='large' color='primary'>
          ${price}
        </Button>
        <Button
          size='large'
          color='primary'
          onClick={() => history.push(`book/${_id}`)}
        >
          Buy Now
        </Button>
      </CardActions>
    </Card>
  );
}
