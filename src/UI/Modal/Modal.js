import React from "react";
import { connect } from "react-redux";
import { closeModal, addValue, auth, emptyForm } from "../../store/actions/actionMenu";
import Modal from "@material-ui/core/Modal";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CustomizedInput from '../Input/Input'
import Button from "../Button/Button";

const styles = theme => ({
 
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: "15px 30px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: '5px',
    outline: 0,
    textAlign: 'center',
    height: 241,
    boxSizing: 'border-box'
  },
  empty: {
    height: 150,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 19,
    fontWeight: 'bold',
    color: 'tomato'
  },
  errorData: {
    height: 150,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'tomato'
  }
});

class SimpleModal extends React.Component {
  
  handleClose = () => {
    this.props.closeModal();
  };

  valueHandler = (event) => {
    const {id, value} = event.currentTarget
    this.props.addValue(id, value)    
  }

  enterHandler = () => {
    if(this.props.VPlogin.trim() !=='' && this.props.VPpsw.trim() !== '') {
      this.props.auth(this.props.VPlogin.trim(), this.props.VPpsw.trim())          
    } else {
      this.props.emptyForm()
    }
  }

  render() {
    const { classes } = this.props;

    return (      
        <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" open={this.props.open} onClose={this.handleClose}>
          <div className={classes.paper}>
            <Typography variant="h6" align="center" id="modal-title">
              Форма входа
            </Typography>
            {this.props.clearInputs 
              ? <div className={classes.empty}>Поля не должны быть пустыми</div>
              : this.props.errorData 
                ?  <div className={classes.errorData}>Логин и/или пароль введены неверно</div>
                : <form noValidate autoComplete="on">
                    <CustomizedInput textLabel="Логин" type="text" id="VPloginInput" value={this.props.VPlogin} onChange={this.valueHandler}/>
                    <CustomizedInput textLabel="Пароль" type="password" id="VPpswInput" value={this.props.VPpsw} onChange={this.valueHandler} />
                    <Button text="Войти" class="enter" onClick={this.enterHandler}/>
                    <Button text="Отмена" onClick={this.handleClose} /> 
                  </form>           
            }                    
          </div>
        </Modal>)
  }
}

function mapStateToProps(state) {
  return {
    open: state.menuReducer.open,
    VPlogin: state.menuReducer.VPloginInput,
    VPpsw: state.menuReducer.VPpswInput,
    login: state.menuReducer.login,
    clearInputs: state.menuReducer.clearInputs,
    errorData: state.menuReducer.errorData    
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeModal: () => dispatch(closeModal()),
    addValue: (id, value) => dispatch(addValue(id, value)),
    auth: (login, password) => dispatch(auth(login, password)),
    emptyForm: () => dispatch(emptyForm())
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(SimpleModal)
); 

/* логин - admin, пароль - 12345 */