import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
type Props = {
  id: string;
  name: string;
  units: number;
};

function IndividualOrderProduct(props: Props): JSX.Element {

  let imageRef: string = require("../static/images/" + props.id + ".png");

  return (
    <Card sx={{ width: {xs: 250, md: 345}, height: 300, bgcolor: "background.card", borderRadius: 8, boxShadow: '10' }}>
      <CardMedia
        component="img"
        height="200"
        image={imageRef}
        alt={props.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{ typography: { md: 'h5', xs: 'h6' } }}>
          {props.name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div" sx={{ typography: { md: 'h5', xs: 'h6' } }}>
          Ordered: {props.units}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default IndividualOrderProduct;