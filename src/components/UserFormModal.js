import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles} from "@material-ui/core/styles";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(2),
        },
    },
    btn: {
        marginBottom: theme.spacing(2)
    }
}));


const UserFormModal = (props) => {

    const userData = {
        firstName: '',
        lastName: '',
        email: ''
    };

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [form, setForm] = useState(userData);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;

        setForm({
            ...form,
            [name]: target.value
        })
    };

    const submitForm = () => {
        props.handleFormSubmit({...form});
        setForm({});
        handleClose();
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen} className={classes.btn}>
                Add new User
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add new User</DialogTitle>
                <DialogContent>
                    <ValidatorForm onSubmit={submitForm} onError={errors => console.log(errors)}>
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
                        <br/>
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
                        <br/>
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
                        <div className={classes.root}>
                            <Button type="submit" color="primary" variant="contained">Add</Button>
                            <Button onClick={handleClose} color="primary">Cancel</Button>
                        </div>
                    </ValidatorForm>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UserFormModal;