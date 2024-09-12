import { useCallback, useContext, useEffect, useMemo } from 'react';
import PromptDialogContext from './PromptDialogContext';
import { buildOptions, PromptDialogOptions } from './PromptDialogOptions';

let idCounter = 0;

const usePromptId = () => {
    const id = useMemo(() => idCounter++, []);
    return `prompt-${id}`;
}

const usePromptDialog = (hookOptions?: PromptDialogOptions) => {

    const parentId = usePromptId();
    const { promptBase, closeOnParentUnmount } = useContext(PromptDialogContext);

    const save = useCallback((message?: string | null, options: PromptDialogOptions = {}) => {
        const builtOptions = buildOptions(hookOptions, options);
        return promptBase(parentId, message, builtOptions);
    }, [hookOptions, parentId, promptBase]);

    useEffect(() => {
        return () => {
            closeOnParentUnmount(parentId);
        }
    }, [closeOnParentUnmount, parentId]);

    return save;
}

export default usePromptDialog;