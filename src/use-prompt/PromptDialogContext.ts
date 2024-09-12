import { createContext } from 'react';
import { PromptDialogOptions } from './PromptDialogOptions';

const promptDialogContext = createContext({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    promptBase: (parentId: string, message: string | null | undefined, options: PromptDialogOptions): Promise<string | null> => {
        throw new Error("Missing PromptProvider")
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    closeOnParentUnmount: (parentId: string) => { }
});

export default promptDialogContext;