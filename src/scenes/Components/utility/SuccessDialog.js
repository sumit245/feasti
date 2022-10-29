import * as React from "react";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";

const SuccessDialog = ({ title, text, showDialog, okHandler }) => {
  const [show, setShow] = React.useState(showDialog);
  const hideDialog = () => setShow(false);
  const done = () => {
    setShow(false);
  };
  return (
      <Portal>
        <Dialog visible={show} onDismiss={hideDialog}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{text}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={done}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
  );
};

export default SuccessDialog;
