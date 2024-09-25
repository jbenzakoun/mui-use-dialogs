import { createContext } from "react";
import { ConfirmDialogOptions } from "./ConfirmDialogOptions";

const confirmDialogContext = createContext({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    confirmBase: (
        parentId: string,
        message: string | null | undefined,
        options: ConfirmDialogOptions,
    ): Promise<boolean> => {
        throw new Error("Missing ConfirmDialogProvider");
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    closeOnParentUnmount: (parentId: string) => {},
});

export default confirmDialogContext;
