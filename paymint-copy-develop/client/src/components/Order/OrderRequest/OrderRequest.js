import React from 'react';

import Paper from '@material-ui/core/Paper';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
    theme => ({
        paper: {
            padding: '8px 18px 8px 18px',
            border:"solid 1px #ececec"
        },
        textArea: {
            width: "100%",
           
            borderRadius: 4,
            border:"solid 1px #DADADA",
            margin:'10px 0px 0px 0px'
        }
    }));


function OrderRequest (props) {
    const classes = useStyles();
    const onChangeOrderRequest = (e) =>{
        props.setOrderRequest(e.target.value);
    }
   
    return(
        <Paper className={classes.paper} square={true}>
            <div>주문 요청사항</div>
            <TextareaAutosize  className={classes.textArea} rows={4} placeholder="요청사항을 적어주세요." onChange={onChangeOrderRequest} />
        </Paper>
    )

}

export default OrderRequest;