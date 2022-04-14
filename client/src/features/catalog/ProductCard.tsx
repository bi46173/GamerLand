import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Card,
  Button,
  CardActions,
  CardContent,
  Typography,
  CardHeader,
  Box,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { Product } from "../../app/models/product";

interface Props {
  product: Product;
}
export default function ProductCard({ product }: Props) {
  const [loading,setLoading] = useState(false);
  const {setBasket} = useStoreContext();

  function handleAddItem(productId:number){
    setLoading(true);
    agent.Basket.addItem(productId)
    .then(basket=> setBasket(basket))
    .catch(error => console.log(error))
    .finally(()=> setLoading(false))
  }
  return (
    <Card>
      <CardHeader
        avatar={<Avatar>{product.name.charAt(0).toUpperCase()}</Avatar>}
        title={product.name}
        titleTypographyProps={{
          sx: { fontweight: "bold", color: "primary.main" },
        }}
      />
      {/* <CardMedia
        component="img"
        sx={{
          height: 140,
          maxWidth: 80,
          backgroundsize: "contain",
        }}
        image={product.pictureUrl}
        alt={product.name}
      /> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          sx={{
            height: 125,
            width: 100,
            maxHeight: { xs: 180, md: 150 },
            maxWidth: { xs: 250, md: 200 },
          }}
          alt={product.name}
          src={product.pictureUrl}
        />
      </div>
      <CardContent>
        <Typography gutterBottom variant="h5" color="secondary">
          ${(product.price / 1).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.information1} - {product.information2}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton loading={loading} onClick={()=> handleAddItem(product.id)} size="small">Add to card</LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
}
