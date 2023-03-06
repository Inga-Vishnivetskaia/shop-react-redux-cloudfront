import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { formatAsPrice } from "~/utils/utils";
import AddProductToCart from "~/components/AddProductToCart/AddProductToCart";
import { useAvailableProducts } from "~/queries/products";
import { Box } from "@mui/material";

export default function Products() {
  const { data = [], isLoading } = useAvailableProducts();
  console.log("isLoading", isLoading);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12} md={12}>
        <header
          style={{
            position: "relative",
            height: "260px",
            backgroundImage: "linear-gradient(#1565c0, #42a5f5)",
          }}
        >
          <h1 style={{ textAlign: "center", color: "#fff", padding: "50px 0" }}>
            Excursions around the world
          </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              bottom: "0",
              width: "100%",
              height: "10vw",
            }}
          >
            <polygon fill="white" points="0,100 100,0 100,100" />
          </svg>
        </header>
      </Grid>
      {data.map((product, index) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            {/* <CardMedia
              sx={{ pt: "56.25%" }}
              image={`https://source.unsplash.com/random?sig=${index}`}
              title="Image title"
            /> */}
            <CardContent
              sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ flexGrow: 1 }}
              >
                {product.title}
              </Typography>

              <Typography
                gutterBottom
                variant="subtitle2"
                component="h2"
                style={{ alignSelf: "self-end" }}
              >
                Available {product.count} products.
              </Typography>
            </CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingLeft: "16px",
                backgroundColor: "#42a5f5",
              }}
            >
              <Typography variant="h6" component="p">
                {formatAsPrice(product.price)}
              </Typography>
              <CardActions>
                <AddProductToCart product={product} />
              </CardActions>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
