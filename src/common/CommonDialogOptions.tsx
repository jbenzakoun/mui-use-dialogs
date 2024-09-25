import CloseIcon from "@mui/icons-material/Close";
import {
    ButtonProps,
    DialogActionsProps,
    DialogContentProps,
    DialogProps,
    DialogTitleProps,
} from "@mui/material";
import { ReactNode } from "react";

type CommonDialogOptions = {
    title?: string;
    label?: string;
    rejectOnCancel?: boolean;
    autoFocus?: boolean;
    allowClose?: boolean;
    closeButtonShow?: boolean;
    closeButtonText?: string;
    closeButtonIcon?: ReactNode | null;
    slotProps?: {
        dialog?: Partial<DialogProps>;
        dialogTitle?: Partial<DialogTitleProps>;
        dialogContent?: Partial<DialogContentProps>;
        dialogActions?: Partial<DialogActionsProps>;
        closeButton?: Partial<ButtonProps>;
    };
};

export const COMMON_DIALOG_DEFAULTS: CommonDialogOptions = {
    rejectOnCancel: true,
    autoFocus: true,
    allowClose: false,
    closeButtonShow: true,
    closeButtonText: "Close",
    closeButtonIcon: <CloseIcon />,
    slotProps: {},
};

export default CommonDialogOptions;
