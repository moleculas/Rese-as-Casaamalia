import React, { Fragment } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const DialogComponente = (props) => {

    //funciones

    const handleCloseDialogBotones = (respuesta) => {
        props.prHandleCloseDialogBotones(respuesta);
    };

    return (
        <div>
            <Dialog
                open={props.prIsOpen}
                onClose={() => { handleCloseDialogBotones('acuerdo') }}
                fullWidth={props.prFullWidth ? true : false}
                maxWidth={props.prMaxWidth ? 'md' : 'xs'}
            >
                <DialogTitle id="alert-dialog-title">{props.prTituloDialog}</DialogTitle>
                <DialogContent>{!props.prFullWidth ? (
                    <DialogContentText id="alert-dialog-description">
                        {props.prDescripcionDialog}
                    </DialogContentText>
                ) : props.prDescripcionDialog}
                    {!props.prNoTieneBotones ? (
                        <Fragment>
                            <Button onClick={() => { handleCloseDialogBotones('acuerdo') }} color="primary">
                                D'acord
                            </Button>
                            <Button onClick={() => { handleCloseDialogBotones('desacuerdo') }} color="primary">
                                No
                            </Button>
                        </Fragment>
                    ) : null}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default DialogComponente