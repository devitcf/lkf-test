import { Breakpoint, Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { memo, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  onClose?: () => void;
  open: boolean;
  fullWidth?: boolean;
  maxWidth?: false | Breakpoint;
};

const StyledDialog = memo(({ children, onClose, open, fullWidth = true, maxWidth = "sm" }: Props) => {
  return (
    <Dialog data-testid="StyledDialog" open={open} onClose={onClose} fullWidth={fullWidth} maxWidth={maxWidth}>
      <DialogContent className={`bg-white`}>{children}</DialogContent>
      <IconButton className={"absolute top-3 right-3"}>
        <CloseIcon onClick={onClose} />
      </IconButton>
    </Dialog>
  );
});

StyledDialog.displayName = "StyledDialog";

export default StyledDialog;
