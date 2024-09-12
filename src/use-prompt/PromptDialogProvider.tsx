import { useCallback, useState } from 'react';
import PromptDialog from './PromptDialog';
import PromptDialogContext from './PromptDialogContext';
import { buildOptions, PromptDialogOptions } from './PromptDialogOptions';

type PromptDialogProviderProps = {
    children: React.ReactNode;
    defaultOptions?: PromptDialogOptions;
}


type StateType = {
    parentId: string;
    rejectOnCancel: boolean;
    resolve: (text: string | null) => void;
    reject: () => void;
}

const PromptDialogProvider = ({
    children,
    defaultOptions = {}
}: PromptDialogProviderProps) => {

    const [state, setState] = useState<StateType | null>(null);
    const [message, setMessage] = useState<string | undefined | null>(null);
    const [options, setOptions] = useState<PromptDialogOptions>({});
    const [key, setKey] = useState(0);


    const promptBase = useCallback((parentId: string, message: string | undefined | null, options: PromptDialogOptions = {}) => {
        return new Promise<string | null>((resolve, reject) => {
            setKey(key => ++key);
            setMessage(message);
            setOptions(options);
            setState({ resolve, reject, parentId, rejectOnCancel: options.rejectOnCancel! });
        });
    }, []);

    const closeOnParentUnmount = useCallback((parentId: string) => {
        setState(state => {
            return state?.parentId == parentId
                ? null
                : state;
        });
    }, []);

    const handleClose = useCallback(() => setState(null), []);

    const handleCancel = useCallback(() => {
        setState(state => {
            if (state?.rejectOnCancel && state?.reject) {
                state.reject();
            } else if (!state?.rejectOnCancel && state?.resolve) {
                state.resolve(null);
            }

            return null;
        });
    }, []);

    const handleSave = useCallback((message: string) => {
        setState(state => {
            if (state?.resolve)
                state.resolve(message);

            return null;
        })
    }, []);

    return (
        <>
            <PromptDialogContext.Provider value={{ promptBase, closeOnParentUnmount }}>
                {children}
            </PromptDialogContext.Provider>

            <PromptDialog
                key={key}
                open={state !== null}
                message={message}
                options={buildOptions(defaultOptions, options)}
                onClose={handleClose}
                onCancel={handleCancel}
                onSave={handleSave}
            />
        </>
    )
}

export default PromptDialogProvider;