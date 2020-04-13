import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';

function SimpleDialog(props) {
  const handleClose = (e) => {
    props.onClose(props.selectedValue);
  };

  const handleListItemClick = (value) => {
    props.chLang(value)
    props.onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
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