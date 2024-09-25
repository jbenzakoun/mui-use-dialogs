import { useCallback, useState } from "react";
import buildOptions from "../common/buildOptions";
import ConfirmDialog from "./ConfirmDialog";
import ConfirmDialogContext from "./ConfirmDialogContext";
import { ConfirmDialogOptions } from "./ConfirmDialogOptions";

type ConfirmDialogProviderProps = {
    children: React.ReactNode;
    defaultOptions?: ConfirmDialogOptions;
};

type StateType = {
    parentId: string;
    rejectOnCancel: boolean;
    resolve: (confirmed: boolean) => void;
    reject: () => void;
};

const ConfirmDialogProvider = ({
    children,
    defaultOptions = {},
}: ConfirmDialogProviderProps) => {
    const [state, setState] = useState<StateType | null>(null);
    const [message, setMessage] = useState<string | undefined | null>(null);
    const [options, setOptions] = useState<ConfirmDialogOptions>({});
    const [key, setKey] = useState(0);

    const confirmBase = useCallback(
        (
            parentId: string,
            message: string | undefined | null,
            options: ConfirmDialogOptions = {},
        ) => {
            return new Promise<boolean>((resolve, reject) => {
                setKey((key) => ++key);
                setMessage(message);
                setOptions(options);
                setState({
                    resolve,
                    reject,
                    parentId,
                    rejectOnCancel: options.rejectOnCancel!,
                });
            });
        },
        [],
    );

    const closeOnParentUnmount = useCallback((parentId: string) => {
        setState((state) => {
            return state?.parentId == parentId ? null : state;
        });
    }, []);

    const handleClose = useCallback(() => setState(null), []);

    const handleCancel = useCallback(() => {
        setState((state) => {
            if (state?.rejectOnCancel && state?.reject) {
                state.reject();
            } else if (!state?.rejectOnCancel && state?.resolve) {
                state.resolve(false);
            }

            return null;
        });
    }, []);

    const handleSave = useCallback(() => {
        setState((state) => {
            if (state?.resolve) state.resolve(true);

            return null;
        });
    }, []);

    return (
        <>
            <ConfirmDialogContext.Provider
                value={{ confirmBase, closeOnParentUnmount }}
            >
                {children}
            </ConfirmDialogContext.Provider>

            <ConfirmDialog
                key={key}
                open={state !== null}
                message={message}
                options={buildOptions(defaultOptions, options)}
                onClose={handleClose}
                onCancel={handleCancel}
                onConfirm={handleSave}
            />
        </>
    );
};

export default ConfirmDialogProvider;
