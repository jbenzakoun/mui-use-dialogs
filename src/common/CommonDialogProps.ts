type CommonDialogProps<TOptions> = {
    open: boolean;
    options?: TOptions;
    onClose: () => void;
};

export default CommonDialogProps;
