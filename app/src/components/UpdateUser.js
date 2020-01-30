import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { connect } from "react-redux";

import ImageUploader from "react-images-upload";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

import { setUpdateUserDialog, setAlert } from "../redux/actions";

function UpdateUser(props) {
  const [name, setName] = React.useState("");
  const [family, setFamily] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [image, setImage] = React.useState("");

  React.useEffect(() => {
    let user = props.state.dialog.updateUser.user;
    setName(user.name);
    setFamily(user.family);
    setUsername(user.username);
    setImage(user.image);
  }, [props.state]);

  const handleClose = () => {
    props.setUpdateUserDialog({
      open: false,
      afterUpdate: () => {},
      user: {}
    });
  };

  function onDrop(picture) {
    let form = new FormData();
    form.append("file", picture[0]);
    axios
      .post("upload", form, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        setImage(response.data.url);
      })
      .catch(function(error) {
        if (error.response) {
          props.setAlert({
            open: true,
            type: "error",
            title: "BadRequest",
            content: error.response.data
          });
        } else {
          props.setAlert({
            open: true,
            type: "error",
            title: "ارتباط با سرور برقرار نیست.",
            content: ""
          });
        }
      });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleFamilyChange(e) {
    setFamily(e.target.value);
  }
  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handleUpdate(name, family, username, image) {
    axios
      .put(`/user/${props.state.dialog.updateUser.user.id}`, {
        name: name,
        family: family,
        username: username,
        image: image
      })
      .then(function(response) {
        props.state.dialog.updateUser.afterUpdate();
      })
      .catch(function(error) {
        if (error.response) {
          props.setAlert({
            open: true,
            type: "error",
            title: "BadRequest",
            content: error.response.data
          });
        } else {
          props.setAlert({
            open: true,
            type: "error",
            title: "ارتباط با سرور برقرار نیست.",
            content: ""
          });
        }
      });
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth="xs"
      open={props.state.dialog.updateUser.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title" dir="rtl">
        بروزرسانی اطلاعات کاربر
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          spacing={1}
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item>
            <ImageUploader
              withIcon={false}
              withLabel={false}
              withPreview={true}
              buttonText="بارگذاری عکس"
              onChange={onDrop}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
            />
          </Grid>
          <Grid item>
            <TextField
              defaultValue={name}
              id="name"
              label="َName"
              onChange={handleNameChange}
            />
          </Grid>
          <Grid item>
            <TextField
              defaultValue={family}
              id="family"
              label="Family"
              onChange={handleFamilyChange}
            />
          </Grid>
          <Grid item>
            <TextField
              defaultValue={username}
              id="username"
              label="Username"
              onChange={handleUsernameChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="secondary">
          لغو
        </Button>
        <Button
          onClick={() => handleUpdate(name, family, username, image)}
          variant="contained"
          color="primary"
        >
          بروزرسانی
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = {
  setUpdateUserDialog,
  setAlert
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
