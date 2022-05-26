import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SwipeableTextMobileStepper from "../../app/components/SwipeableTextMobileStepper";
import ProductCardSkeleton from "../catalog/ProductCardSkeleton";
import agent from "../../app/api/agent";
import ReviewedProduct from "./ReviewedProduct";
import ReviewedProductType from "../../app/models/ReviewedProduct";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ReviewedProductType[] | null>(null);

  useEffect(() => {
    agent.Catalog.listReviewed(4)
      .then((response) => setProducts(response))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SwipeableTextMobileStepper />
      <Typography sx={{ color: "#ed6c02" }} variant="h6">
        <EmojiEventsIcon color="warning" /> Most rated products
      </Typography>
      <Grid container spacing={4} sx={{ mb: 2 }}>
        {loading && (
          <>
            {[...Array(4)].map((e, i) => (
              <Grid item xs={3} key={i}>
                <ProductCardSkeleton />
              </Grid>
            ))}
          </>
        )}
        {!loading && (
          <>
            {products?.map((product) => (
              <Grid item xs={3} key={product.id}>
                <ReviewedProduct product={product} />
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </>
  );
}
