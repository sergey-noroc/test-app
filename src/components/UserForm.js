import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {getUserById, updateUser} from "../api";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(20),
    },

}));

const UserForm = (props) => {

    const classes = useStyles();
    let history = useHistory();
    const [form, setForm] = useState({});

    useEffect(() => {
        const { id } = props.match.params;
        getUserById(id).then((result) => {
           const user = result;
           setForm(user);
        });
    }, [props.match.params]);


    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;

        setForm({
            ...form,
            [name]: target.value
        })
    };

    const submitForm = () => {
        updateUser(form).then(() => {
            history.push("/")
        });
    };

    return (
        <div className={classes.root}>
            <ValidatorForm onSubmit={submitForm} onError={errors => console.log(errors)} autoComplete="off">
                <TextValidator
                    label="First Name"
                    onChange={handleChange}
                    name="firstName"
                    value={form.firstName}
                    validators={['required']}
                    errorMessages={['This field is required']}
                    variant="outlined"
                    fullWidth
                />
                <br />
                <TextValidator
                    label="Last Name"
                    onChange={handleChange}
                    name="lastName"
                    value={form.lastName}
                    validators={['required']}
                    errorMessages={['This field is required']}
                    variant="outlined"
                    fullWidth
                />
                <br />
                <TextValidator
                    label="Email"
                    onChange={handleChange}
                    name="email"
                    value={form.email}
                    validators={['required', 'isEmail']}
                    errorMessages={['This field is required', 'Email is not valid']}
                    variant="outlined"
                    fullWidth
                />
                <Button type="submit" variant="contained" style={{ marginTop: 10 }} color="primary">Save</Button>
            </ValidatorForm>
        </div>
    )
};

export default UserForm;