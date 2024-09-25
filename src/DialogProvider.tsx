import { PropsWithChildren } from "react";
import { ConfirmDialogProvider } from "./use-confirm";
import { ConfirmDialogOptions } from "./use-confirm/ConfirmDialogOptions";
import { PromptDialogProvider } from "./use-prompt";
import { PromptDialogOptions } from "./use-prompt/PromptDialogOptions";

type DialogProviderProps = PropsWithChildren<{
    prompt?: PromptDialogOptions;
    confirm?: ConfirmDialogOptions;
}>;

const DialogProvider = ({
    prompt: promptOptions,
    confirm: confirmOptions,
    children,
}: DialogProviderProps) => (
    <PromptDialogProvider defaultOptions={promptOptions}>
        <ConfirmDialogProvider defaultOptions={confirmOptions}>
            {children}
        </ConfirmDialogProvider>
    </PromptDialogProvider>
);

export default DialogProvider;
