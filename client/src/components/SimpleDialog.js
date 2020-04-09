import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

function SimpleDialog(props) {
  // const { onClose, selectedValue, open } = props;

  const handleClose = (e) => {
    props.onClose(props.selectedValue);
  };

  const handleListItemClick = (value) => {
    // document.cookie = `lang_id=${value}; max-age=60*1000`;
    console.log(props.language)
    props.onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
      {/* <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle> */}
      <List className="lang-list">
        {props.languages.types.map((lan, i) => (
          <ListItem className="lang-list-item" key={i} button onClick={() => {handleListItemClick(i)}}>
            <ListItemText primary={lan.language} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default SimpleDialog;