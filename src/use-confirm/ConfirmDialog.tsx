import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
} from "@mui/material";
import { memo, useCallback } from "react";
import CommonDialogProps from "../common/CommonDialogProps";
import {
    CONFIRM_DEFAULT_OPTIONS,
    ConfirmDialogOptions,
} from "./ConfirmDialogOptions";

export type ConfirmDialogProps = CommonDialogProps<ConfirmDialogOptions> & {
    message?: string | null;
    onCancel: () => void;
    onConfirm: () => void;
};

const ConfirmDialog = ({
    open,
    message,
    onCancel,
    onConfirm,
    onClose,
    options = CONFIRM_DEFAULT_OPTIONS,
}: ConfirmDialogProps) => {
    const handleClose = useCallback(() => {
        if (options && !options.allowClose) {
            return false;
        }

        return true;
    }, [options]);

    const handleCancel = useCallback(() => {
        onCancel();
        onClose();
    }, [onCancel, onClose]);

    const handleConfirm = useCallback(() => {
        onConfirm();
        onClose();
    }, [onClose, onConfirm]);

    return (
        <Dialog
            key="confirm-dialog"
            autoFocus
            fullWidth
            open={open}
            onClose={handleClose}
            {...options.slotProps?.dialog}
        >
            <DialogTitle {...options.slotProps?.dialogTitle}>
                {options.title}
            </DialogTitle>
            <DialogContent {...options.slotProps?.dialogContent}>
                <Stack direction="column">
                    <DialogContentText {...options.slotProps?.message}>
                        {message}
                    </DialogContentText>
                </Stack>
            </DialogContent>
            <DialogActions {...options.slotProps?.dialogActions}>
                {options.closeButtonShow && (
                    <Button
                        key="cancel"
                        variant="text"
                        color="secondary"
                        onClick={handleCancel}
                        startIcon={options.closeButtonIcon || undefined}
                        {...options.slotProps?.closeButton}
                    >
                        {options.closeButtonText}
                    </Button>
                )}

                <Button
                    key="save"
                    color="primary"
                    onClick={handleConfirm}
                    startIcon={options.yesButtonIcon || undefined}
                    {...options.slotProps?.yesButton}
                >
                    {options.yesButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default memo(ConfirmDialog);
