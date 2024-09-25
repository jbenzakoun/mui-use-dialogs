import SaveIcon from "@mui/icons-material/Save";
import {
    ButtonProps,
    DialogContentTextProps,
    TextFieldProps,
} from "@mui/material";
import { ReactNode } from "react";
import CommonDialogOptions from "../common/CommonDialogOptions";

export type PromptDialogOptions = CommonDialogOptions & {
    defaultText?: string;
    saveButtonText?: string;
    saveButtonIcon?: ReactNode | null;
    saveOnEnter?: boolean;
    rejectOnCancel?: boolean;
    multiline?: boolean;
    minRows?: number;
    maxRows?: number;
    slotProps?: {
        message?: Partial<DialogContentTextProps>;
        textField?: Partial<TextFieldProps>;
        saveButton?: Partial<ButtonProps>;
    };
};

export const PROMPT_DEFAULT_OPTIONS: PromptDialogOptions = {
    title: "Prompt",
    saveButtonText: "OK",
    saveOnEnter: true,
    multiline: false,
    saveButtonIcon: <SaveIcon />,
};
