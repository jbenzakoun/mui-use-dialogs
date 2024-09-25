import CommonDialogOptions, {
    COMMON_DIALOG_DEFAULTS,
} from "./CommonDialogOptions";

export const buildOptions = <TOptions extends CommonDialogOptions>(
    defaultOptions?: TOptions,
    hookOptions?: TOptions,
    paramOptions?: TOptions,
) => ({
    ...COMMON_DIALOG_DEFAULTS,
    ...defaultOptions,
    ...hookOptions,
    ...paramOptions,

    slotProps: {
        ...COMMON_DIALOG_DEFAULTS.slotProps,
        ...defaultOptions?.slotProps,
        ...hookOptions?.slotProps,
        ...paramOptions?.slotProps,

        dialog: {
            ...COMMON_DIALOG_DEFAULTS.slotProps?.dialog,
            ...defaultOptions?.slotProps?.dialog,
            ...hookOptions?.slotProps?.dialog,
            ...paramOptions?.slotProps?.dialog,
        },
        dialogTitle: {
            ...COMMON_DIALOG_DEFAULTS.slotProps?.dialogTitle,
            ...defaultOptions?.slotProps?.dialogTitle,
            ...hookOptions?.slotProps?.dialogTitle,
            ...paramOptions?.slotProps?.dialogTitle,
        },
        dialogContent: {
            ...COMMON_DIALOG_DEFAULTS.slotProps?.dialogContent,
            ...defaultOptions?.slotProps?.dialogContent,
            ...hookOptions?.slotProps?.dialogContent,
            ...paramOptions?.slotProps?.dialogContent,
        },
        dialogActions: {
            ...COMMON_DIALOG_DEFAULTS.slotProps?.dialogActions,
            ...defaultOptions?.slotProps?.dialogActions,
            ...hookOptions?.slotProps?.dialogActions,
            ...paramOptions?.slotProps?.dialogActions,
        },
        closeButton: {
            ...COMMON_DIALOG_DEFAULTS.slotProps?.closeButton,
            ...defaultOptions?.slotProps?.closeButton,
            ...hookOptions?.slotProps?.closeButton,
            ...paramOptions?.slotProps?.closeButton,
        },
    },
});

export default buildOptions;
