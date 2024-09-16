import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { ButtonProps, DialogActionsProps, DialogContentProps, DialogContentTextProps, DialogProps, DialogTitleProps, TextFieldProps } from '@mui/material';
import { ReactNode } from 'react';

export type PromptDialogOptions = {
    title?: string;
    label?: string;
    defaultText?: string;
    showCancel?: boolean;
    cancelButtonText?: string;
    cancelButtonIcon?: ReactNode | null;
    saveButtonText?: string;
    saveButtonIcon?: ReactNode | null;
    saveOnEnter?: boolean;
    rejectOnCancel?: boolean;
    allowClose?: boolean;
    multiline?: boolean;
    minRows?: number;
    maxRows?: number;
    autoFocus?: boolean;
    slotProps?: {
        dialog?: Partial<DialogProps>;
        dialogTitle?: Partial<DialogTitleProps>;
        dialogContent?: Partial<DialogContentProps>;
        dialogActions?: Partial<DialogActionsProps>;
        message?: Partial<DialogContentTextProps>;
        textField?: Partial<TextFieldProps>;
        cancelButton?: Partial<ButtonProps>;
        saveButton?: Partial<ButtonProps>;
    }
}

export const DEFAULT_OPTIONS: PromptDialogOptions = {
    title: "Prompt",
    showCancel: true,
    cancelButtonText: "Cancel",
    saveButtonText: "OK",
    saveOnEnter: true,
    rejectOnCancel: true,
    allowClose: false,
    multiline: false,
    autoFocus: true,
    cancelButtonIcon: <CloseIcon />,
    saveButtonIcon: <SaveIcon />,
    slotProps: {}
}

export const buildOptions = (
    hookOptions?: PromptDialogOptions,
    paramOptions?: PromptDialogOptions
): PromptDialogOptions => ({
    ...DEFAULT_OPTIONS || {},
    ...hookOptions || {},
    ...paramOptions || {},
    slotProps: {
        dialog: { ...DEFAULT_OPTIONS.slotProps?.dialog, ...hookOptions?.slotProps?.dialog, ...paramOptions?.slotProps?.dialog },
        dialogTitle: { ...DEFAULT_OPTIONS.slotProps?.dialogTitle, ...hookOptions?.slotProps?.dialogTitle, ...paramOptions?.slotProps?.dialogTitle },
        dialogContent: { ...DEFAULT_OPTIONS.slotProps?.dialogContent, ...hookOptions?.slotProps?.dialogContent, ...paramOptions?.slotProps?.dialogContent },
        dialogActions: { ...DEFAULT_OPTIONS.slotProps?.dialogActions, ...hookOptions?.slotProps?.dialogActions, ...paramOptions?.slotProps?.dialogActions },
        message: { ...DEFAULT_OPTIONS.slotProps?.message, ...hookOptions?.slotProps?.message, ...paramOptions?.slotProps?.message },
        textField: { ...DEFAULT_OPTIONS.slotProps?.textField, ...hookOptions?.slotProps?.textField, ...paramOptions?.slotProps?.textField },
        cancelButton: { ...DEFAULT_OPTIONS.slotProps?.cancelButton, ...hookOptions?.slotProps?.cancelButton, ...paramOptions?.slotProps?.cancelButton },
        saveButton: { ...DEFAULT_OPTIONS.slotProps?.saveButton, ...hookOptions?.slotProps?.saveButton, ...paramOptions?.slotProps?.saveButton },
    }
});