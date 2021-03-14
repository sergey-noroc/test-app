import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles((theme) => ({
    appBar: {zIndex: theme.zIndex.drawer + 1,},
    icon: {
        marginRight: theme.spacing(3.5),
        marginLeft: theme.spacing(-0.7),
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none'
    }
}));

const TopBar = () => {
    
    const classes = useStyles();

    return (
        <>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolbar}/>
            </AppBar>
        </>
    )
};

export default TopBar