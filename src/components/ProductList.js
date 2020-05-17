import React, { useContext, useState } from "react";
import Product from "./Product";
import { Context } from "../context";
import { fade, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.main, 0.45),
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.25),
    },
    marginTop: 90,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function ProductList() {
  const { products } = useContext(Context);
  const classes = useStyles();
  const [term, setTerm] = useState("");

  const searchingForName = (term) => {
    return (x) => x.title.toLowerCase().includes(term.toLowerCase()) || !term;
  };

  const pageElements = products
    .filter(searchingForName(term))
    .map((product) => <Product key={product.id} product={product} />);

  const searchHandler = (e) => {
    setTerm(e.target.value);
  };

  return (
    <>
      {/* <form className={classes.form_text}>
        <input
          type="text"
          value={term}
          onChange={searchHandler}
          className={classes.input_text}
        />
      </form> */}
      <Toolbar className={classes.root}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            onChange={searchHandler}
            value={term}
            type="text"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
      </Toolbar>
      <Grid container className={classes.root}>
        {pageElements}
      </Grid>
    </>
  );
}
