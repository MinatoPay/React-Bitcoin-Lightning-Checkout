import * as React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import StarIcon from "@mui/icons-material/StarBorder"
import Typography from "@mui/material/Typography"
import GlobalStyles from "@mui/material/GlobalStyles"
import Container from "@mui/material/Container"
import axios from "axios"
import { useEffect, useState } from "react"

const tiers = [
  {
    title: "Starter",
    price: "10",
    description: [
      "10 users included",
      "2 GB of storage",
      "Help center access",
      "Email support"
    ],
    buttonText: "Get Invoice",
    buttonVariant: "outlined"
  },
  {
    title: "Pro",
    subheader: "Most popular",
    price: "100",
    description: [
      "20 users included",
      "10 GB of storage",
      "Help center access",
      "Priority email support"
    ],
    buttonText: "Get Invoice",
    buttonVariant: "contained"
  },
  {
    title: "Enterprise",
    price: "1000",
    description: [
      "50 users included",
      "30 GB of storage",
      "Help center access",
      "Phone & email support"
    ],
    buttonText: "Get Invoice",
    buttonVariant: "outlined"
  }
]

const API_KEY = "Tzor54f2.1sPXHusPLzLfwt3nlWdIlLJKmKVD7M4P" // REPLACE WITH YOUR API KEY FROM app.minatopay.com

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Api-Key ${API_KEY}`
  }
}

const handleClick = async (invoice_amount) => {
  const body = JSON.stringify({
    amount: invoice_amount,
    ttl: 10,
    callback_url: "https://webhook.site/2026fa5c-3528-4607-9124-0944652189df",
    success_url: "http://localhost:3000/",
    description: "demo description",
    order_id: "1337",
    customer_note: "demo customer note",
    customer_email: "demo_customer_email@email.com"
  })

  axios
    .post("https://api.minatopay.com/v1/invoices/", body, config)
    .then((res) => {
      console.log(res.data.results)
      const { hosted_checkout_url } = res.data.results
      window.location.href = hosted_checkout_url
    })
    .catch((err) => console.log(err))
}

const Pricing = () => {
  const [accountBalanceSats, setAccountBalanceSats] = useState()

  // ** Get data on mount
  useEffect(() => {
    axios
      .get("https://api.minatopay.com/v1/account/balance/", config)
      .then((res) => {
        setAccountBalanceSats(res.data.results.account_balance_sats)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Bitcoin Lightning Checkout Demo
        </Typography>
        <Typography
          variant="h3"
          align="center"
          color="green"
          component="p"
          marginBottom={2}
        >
          Account Balance: {accountBalanceSats} sats
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
          marginBottom={2}
        >
          This demo shows how you can integrate a Bitcoin Lightning Checkout in
          your app. Please note that you must change the API key in this demo
          for it to work.
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Click one of the bottons below to generate a Bitcoin Lightning
          checkout.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  action={tier.title === "Pro" ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: "center"
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700]
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h3"
                      color="text.primary"
                    >
                      {tier.price}
                    </Typography>
                    <Typography variant="h4" color="text.secondary">
                      &nbsp;
                    </Typography>
                    <Typography variant="h4" color="text.secondary">
                      sats
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant}
                    onClick={() => handleClick(tier.price)}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default Pricing
