import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    TextField,
} from "@mui/material";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import CommonDialogProps from "../common/CommonDialogProps";
import {
    PROMPT_DEFAULT_OPTIONS,
    PromptDialogOptions,
} from "./PromptDialogOptions";

export type PromptDialogProps = CommonDialogProps<PromptDialogOptions> & {
    message?: string | null;
    onCancel: () => void;
    onSave: (text: string) => void;
};

const PromptDialog = ({
    open,
    message,
    onCancel,
    onSave,
    onClose,
    options = PROMPT_DEFAULT_OPTIONS,
}: PromptDialogProps) => {
    const textFieldRef = useRef<HTMLInputElement>();
    const [isTextFieldVisible, setTextFieldVisible] = useState(false);
    const [value, setValue] = useState<string>(options.defaultText || "");

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

    const handleSave = useCallback(() => {
        onSave(value);
        onClose();
    }, [onClose, onSave, value]);

    useEffect(() => {
        // autofocus the text field
        // This needs to happen AFTER the default text is loaded and the textFieldRef is set,
        // thus the 'isTextFieldVisible' state
        if (
            options.autoFocus &&
            open &&
            textFieldRef.current &&
            isTextFieldVisible
        ) {
            textFieldRef.current.focus();
            textFieldRef.current.click();
            textFieldRef.current.setSelectionRange(9999, 9999);
        }
    }, [options.defaultText, open, isTextFieldVisible, options.autoFocus]);

    return (
        <Dialog
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
                    <TextField
                        fullWidth
                        value={value}
                        onChange={(x) => setValue(x.currentTarget.value)}
                        label={options.label}
                        multiline={options.multiline}
                        minRows={
                            options.multiline ? options.minRows : undefined
                        }
                        maxRows={
                            options.multiline ? options.maxRows : undefined
                        }
                        autoFocus={options.autoFocus}
                        inputRef={(x) => {
                            textFieldRef.current = x;
                            setTextFieldVisible(true);
                        }}
                        onKeyDown={(e) => {
                            if (
                                options.saveOnEnter &&
                                e.key === "Enter" &&
                                e.shiftKey === false
                            ) {
                                handleSave();
                            }
                        }}
                        {...options.slotProps?.textField}
                    />
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
                    onClick={handleSave}
                    startIcon={options.saveButtonIcon || undefined}
                    {...options.slotProps?.saveButton}
                >
                    {options.saveButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default memo(PromptDialog);
