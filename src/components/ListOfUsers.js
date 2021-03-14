import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import UserFormModal from "./UserFormModal";
import {createUser, deleteUser, getUsers} from "../api";
import {NavLink} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    table: {
        minWidth: 650,
    },
    paper: {
        marginTop: theme.spacing(10)
    },
}));

const ListOfUsers = () => {

    const[users, setUsers] = useState([]);
    const[updated, setUpdated] = useState();
    const classes = useStyles();

    useEffect(() => {
        getUsers()
            .then(response => {
                setUsers(response);
            })
            .catch(err => {
                console.log(err)
            });
    }, [updated]);

    const handleCreateUser = (user) => {
        setUpdated(false);
        createUser(user).then(() => {
            setUpdated(true);
        })
    };

    const handleDeleteUser = (id) => {
        setUpdated(false);
        deleteUser(id).then(() => {
          setUpdated(true);
      })
    };

    return (
        <div className={classes.paper}>
            <UserFormModal handleFormSubmit={handleCreateUser}/>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell align="right">Last Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">{user.firstName}</TableCell>
                                <TableCell align="right">{user.lastName}</TableCell>
                                <TableCell align="right">{user.email}</TableCell>
                                <TableCell align="right">
                                    <div className={classes.root}>
                                        <NavLink to={`/user/${user.id}`}>
                                            <Button variant="contained" color="primary">Edit</Button>
                                        </NavLink>
                                        <Button onClick={() => handleDeleteUser(user.id)} variant="contained" color="secondary">Remove</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
};

export default ListOfUsers;