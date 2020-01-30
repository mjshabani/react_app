import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import ImageUploader from "react-images-upload";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Container from "@material-ui/core/Container";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

import { setUpdateConsultantDialog, setAlert } from "../redux/actions";

function UpdateConsultant(props) {
  const [name, setName] = React.useState("");
  const [family, setFamily] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [summaryInfo, setSummaryInfo] = React.useState("");
  const [furtherInfo, setFurtherInfo] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [image, setImage] = React.useState("");

  React.useEffect(() => {
    let consultant = props.state.dialog.updateConsultant.consultant;
    setName(consultant.name);
    setFamily(consultant.family);
    setTitle(consultant.title);
    setSummaryInfo(consultant.summary_info);
    setFurtherInfo(consultant.further_info);
    setAddress(consultant.address);
    setPhoneNumber(consultant.phone_number);
    setImage(consultant.image);
  }, [props.state]);

  const handleClose = () => {
    props.setUpdateConsultantDialog({
      open: false,
      afterUpdate: () => {},
      consultant: {}
    });
  };

  function onDrop(picture) {
    console.log("dropped");

    let form = new FormData();
    form.append("file", picture[0]);
    console.log(form);
    console.log("form created");
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
  function handleTitleChange(e) {
    setTitle(e.target.value);
  }
  function handleFurtherInfoChange(e) {
    setFurtherInfo(e.target.value);
  }
  function handleAddressChange(e) {
    setAddress(e.target.value);
  }
  function handleSummaryInfoChange(e) {
    setSummaryInfo(e.target.value);
  }
  function handlePhoneNumberChange(e) {
    setPhoneNumber(e.target.value);
  }

  function handleUpdate(
    name,
    family,
    title,
    summaryInfo,
    furtherInfo,
    address,
    phoneNumber,
    image
  ) {
    axios
      .put(`/consultant/${props.state.dialog.updateConsultant.consultant.id}`, {
        name: name,
        family: family,
        title: title,
        summary_info: summaryInfo,
        further_info: furtherInfo,
        address: address,
        phone_number: phoneNumber,
        image: image
      })
      .then(function(response) {
        props.state.dialog.updateConsultant.afterUpdate();
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
      open={props.state.dialog.updateConsultant.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title" dir="rtl">
        بروزرسانی اطلاعات مشاور
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
              defaultValue={title}
              id="title"
              label="Title"
              onChange={handleTitleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              defaultValue={summaryInfo}
              id="summaryInfo"
              label="َSummary Information"
              onChange={handleSummaryInfoChange}
            />
          </Grid>
          <Grid item>
            <TextField
              defaultValue={furtherInfo}
              multiline
              rows="2"
              id="furtherInfo"
              label="Further Information"
              onChange={handleFurtherInfoChange}
            />
          </Grid>
          <Grid item>
            <TextField
              defaultValue={address}
              id="address"
              label="Address"
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item>
            <TextField
              defaultValue={phoneNumber}
              id="phoneNumber"
              label="Phone Number"
              onChange={handlePhoneNumberChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="secondary">
          لغو
        </Button>
        <Button
          onClick={() =>
            handleUpdate(
              name,
              family,
              title,
              summaryInfo,
              furtherInfo,
              address,
              phoneNumber,
              image
            )
          }
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
  setUpdateConsultantDialog,
  setAlert
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateConsultant);
