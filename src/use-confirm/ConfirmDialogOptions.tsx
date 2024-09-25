import CheckIcon from "@mui/icons-material/Check";
import { ButtonProps, DialogContentTextProps } from "@mui/material";
import { ReactNode } from "react";
import CommonDialogOptions from "../common/CommonDialogOptions";

export type ConfirmDialogOptions = CommonDialogOptions & {
    message?: string;
    yesButtonText?: string;
    yesButtonIcon?: ReactNode | null;
    slotProps?: {
        message?: Partial<DialogContentTextProps>;
        yesButton?: Partial<ButtonProps>;
    };
};

export const CONFIRM_DEFAULT_OPTIONS: ConfirmDialogOptions = {
    title: "Confirm",
    message: "Are you sure?",
    yesButtonText: "OK",
    yesButtonIcon: <CheckIcon />,
};
