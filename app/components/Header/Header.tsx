import * as React from "react";
import "./style.scss";
import { useTranslation } from "react-i18next";
import { Link, withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { History } from "history";

const Header = ({ title, history }: { title: string; history: History }) => {
  const { t } = useTranslation();

  return (
    <header className="header">
      <AppBar position="static">
        <Toolbar className={"toolbar"}>
          <IconButton
            className={"navigate_before"}
            color="inherit"
            aria-label="Back"
            onClick={history.goBack}
          >
            <Icon>navigate_before</Icon>
          </IconButton>
          <Typography variant={"subtitle1"} className={"grow"}>
            <Link to={"/"} color={"inherit"}>
              <Button color="secondary">{title}</Button>
            </Link>
          </Typography>
          <IconButton className={"menu"} color="inherit" aria-label="Menu">
            <Icon>person</Icon>
          </IconButton>
        </Toolbar>
      </AppBar>
    </header>
  );
};
// @ts-ignore
export default withRouter(Header);