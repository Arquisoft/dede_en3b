import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IOrder } from '../shared/shareddtypes';
import { useNavigate } from 'react-router-dom';

type Props = {
  item: IOrder;
};

function OrderItem(props: Props): JSX.Element {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 400, minWidth: 400, height: 250, bgcolor: "background.card", borderRadius: 8, boxShadow: '10' }}>
      <CardMedia
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {new Date(props.item.date).toUTCString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Delivering to {props.item.address.street_address} with Postal Code {props.item.address.postal_code} in {props.item.address.region}, in {props.item.address.country_name}.
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Total: {(props.item.totalPrice).toFixed(2)} €
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={event => navigate(`/orders/${props.item._id}`)}>See order</Button>
      </CardActions>
    </Card>
  );
};

export default OrderItem;