import { useCallback, useContext, useEffect, useMemo } from "react";
import buildOptions from "../common/buildOptions";
import ConfirmDialogContext from "./ConfirmDialogContext";
import {
    CONFIRM_DEFAULT_OPTIONS,
    ConfirmDialogOptions,
} from "./ConfirmDialogOptions";

let idCounter = 0;

const useConfirmId = () => {
    const id = useMemo(() => idCounter++, []);
    return `confirm-${id}`;
};

const useConfirmDialog = (hookOptions?: ConfirmDialogOptions) => {
    const parentId = useConfirmId();
    const { confirmBase, closeOnParentUnmount } =
        useContext(ConfirmDialogContext);

    const save = useCallback(
        (message?: string | null, options: ConfirmDialogOptions = {}) => {
            const builtOptions = buildOptions(
                CONFIRM_DEFAULT_OPTIONS,
                hookOptions,
                options,
            );
            return confirmBase(parentId, message, builtOptions);
        },
        [hookOptions, parentId, confirmBase],
    );

    useEffect(() => {
        return () => {
            closeOnParentUnmount(parentId);
        };
    }, [closeOnParentUnmount, parentId]);

    return save;
};

export default useConfirmDialog;
