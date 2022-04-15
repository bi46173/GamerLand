import { LoadingButton } from "@mui/lab";
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/product";

export default function ProductDeatils() {
  const {basket,setBasket,removeItem} = useStoreContext();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity,setQuantity] = useState(0);
  const [submitting,setSubmitting] = useState(false);
  const item = basket?.items.find(i => i.productId === product?.id);

  useEffect(() => {
    if(item) setQuantity(item.quantity);
    agent.Catalog.details(Number(id))
      .then((response) => setProduct(response))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id, item]);

  function handleInputChange(event:any){
    if(event.target.value >= 0){
    setQuantity(parseInt(event.target.value));
    }
  }

  function handleUpdateCart(){
    setSubmitting(true);
    if (!item || quantity > item.quantity){
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      agent.Basket.addItem(product?.id!,updatedQuantity)
      .then(basket=> setBasket(basket))
      .catch(error=>console.log(error))
      .finally(()=> setSubmitting(false))
    }else{
      const updatedQuantity = item.quantity - quantity;
      agent.Basket.removeItem(product?.id!,updatedQuantity)
      .then(()=> removeItem(product?.id!,updatedQuantity))
      .catch(error => console.log(error))
      .finally(()=> setSubmitting(false))
    }
  }



  if (loading) return <LoadingComponent message='Loading product...'></LoadingComponent>

  if (!product) return <NotFound />;

  return (
    <Grid container>
      <Grid item xs={3}>
        <img src={product.pictureUrl} alt={product.name}
                  style={{
                    maxWidth: "100%",
                  }}
        />
      </Grid>

      <Grid item xs={6}>
        <Typography variant="h5">{product.name}</Typography>
        <Divider sx={{ mb: 2 }}></Divider>
        <Typography variant="h6" color="secondary">
          ${(product.price / 1).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>➤</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>➤</TableCell>
                <TableCell>{product.information1}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>➤</TableCell>
                <TableCell>{product.information2}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>➤</TableCell>
                <TableCell>{product.information3}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>➤</TableCell>
                <TableCell>{product.information4}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>➤</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField 
                       onChange={handleInputChange}
                       variant='outlined' 
                       type='number'
                       label='Quantity in Cart'
                       fullWidth
                       value={quantity}
                       />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
            disabled={item?.quantity === quantity || !item && quantity === 0}
              loading={submitting}
              onClick={handleUpdateCart}
              sx={{height:'55px'}}
              color='primary'
              size='large'
              variant='contained'
              fullWidth
            >
              {item ? 'Update quantity' : 'Add to Cart'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

