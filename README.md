# mui-use-dialogs [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/bdavis2-PCTY/mui-use-dialogs/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/mui-use-dialogs.svg)](https://www.npmjs.com/package/mui-use-dialogs)

This package provides basic and common dialogs to be used with [@mui/material](https://mui.com/)!

## Installation

```sh
npm install --save mui-use-dialogs
```

## Demo

[![Edit mui-use-dialogs demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/s9m2wr)

## Usage

### Setup DialogProvider

Wrap your app inside the `DialogProvider` component.

_Note: If you're using Material UI `ThemeProvider`, make sure `DialogProvider` is a child of it._

```jsx
import React from "react";
import { DialogProvider } from "mui-use-dialogs";

const App = () => {
  return (
    <DialogProvider>
      {/* your app... */}
    </DialogProvider>;
  )
};

export default App;
```

### Import a Dialog

You can import whichever dialog hook you wish to use from `mui-use-dialogs`.

The hooks currently available are:

-   `useConfirm`
-   `usePrompt`

_Note: These hooks return promises to allow you to use async/await._

See the example below or [the demo on CodeSandbox](https://codesandbox.io/p/sandbox/s9m2wr) on how to use one of these dialog hooks:

```jsx
import React from "react";
import Button from "@mui/material/Button";
import { useConfirm } from "material-ui-confirm";

const MyComponent = () => {
    const confirmAsync = useConfirm();

    const handleClick = async () => {
        const confirmed = await confirmAsync(
            "Are you sure?" 
            /*, { ...options }*/,
        );

        if (!confirmed) return;
        console.log("The user has confirmed!");
    };

    return <Button onClick={handleClick}>Click</Button>;
};

export default MyComponent;
```

### Specifying Options

This library provides several way to specify the options for your dialog.

These methods are as follows:

-   Within `DialogProvider`
-   Within the hook itself (ex. `useConfirm`/`usePrompt`)
-   Within the function call (ex. `confirm(message, options)`)

#### DialogProvider

You may change the default options for dialogs at the `DialogProvider` level.\
This will result in any hooks within that provider inheriting these options.

```jsx
const App = () => {
  return (
    <DialogProvider
        prompt={ /* options for usePrompt */}
        confirm={ /* options for useConfirm */}>
      {/* your app... */}
    </DialogProvider>;
  )
};
```

#### The Hook (`useConfirm`/`usePrompt`)

You may also specify default options within the hook function for the dialogs.

```jsx
import { useConfirm } from "mui-use-dialogs";

const MyComponent = () => {
    const confirmAsync = useConfirm({
        /* options */
    });
};
```

#### The Hook Function

Additionally, you may specify options within the returned function of The Hook.

```jsx
import { useConfirm } from "mui-use-dialogs";

const MyComponent = () => {
    const confirmAsync = useConfirm();

    const handleClick = async () => {
        const confirmed = await confirmAsync("Are you sure?", {
            /* options */
        });
    };
};
```

## Components & Props

### `DialogProvider`

This component is required in order to render a dialog in the component tree.

| Name          | Type     | Default | Description                                      |
| ------------- | -------- | ------- | ------------------------------------------------ |
| **`confirm`** | `object` | `{}`    | Overrides the default options used by useConfirm |
| **`prompt`**  | `object` | `{}`    | Overrides the default options used by usePrompt  |

### Common Options

| Name                  | Type            | Default                               | Description                         |
| --------------------- | --------------- | ------------------------------------- | ----------------------------------- |
| **`title`**           | `string?`       | _Varies_                              | Dialog title text.                  |
| **`label`**           | `string?`       | _Varies_                              | Dialog label text.                  |
| **`rejectOnCancel`**  | `boolean`       | true                                  | Throw an exception on cancel/close. |
| **`autoFocus`**       | `boolean`       | true                                  | Auto-focus the dialog.              |
| **`allowClose`**      | `boolean`       | false                                 | Allow the user to close the dialog  |
| **`closeButtonShow`** | `boolean`       | true                                  | Show/hide the Close button          |
| **`closeButtonText`** | `string?`       | `'Close'`                             | Text of the Close Button            |
| **`closeButtonIcon`** | `ReactNode?`    | CloseIcon `@mui/icons-material/Close` | Icon used for the Close Button      |
| **`slotProps`**       | `SlotPropsType` | `{}`                                  | Icon used for the Close Button      |

#### SlotPropsType

| Name                | Type                          | Description                             |
| ------------------- | ----------------------------- | --------------------------------------- |
| **`dialog`**        | `Partial<DialogProps>`        | Override props for `<Dialog>`           |
| **`dialogTitle`**   | `Partial<DialogTitleProps>`   | Override props for `<DialogTitle>`      |
| **`dialogContent`** | `Partial<DialogContentProps>` | Override props for `<DialogContent>`    |
| **`dialogActions`** | `Partial<DialogActionsProps>` | Override props for `<DialogActions>`    |
| **`closeButton`**   | `Partial<ButtonProps>`        | Override props for the Close `<Button>` |

## `useConfirm(message [, options]) => Promise<bool>`

This function opens a confirmation dialog and returns a promise
representing the user choice (resolved on confirmation and rejected on cancellation).

### Confirm Options

| Name                | Type         | Default                           | Description                                           |
| ------------------- | ------------ | --------------------------------- | ----------------------------------------------------- |
| **`title`**         | `string`     | Confirm                           | Dialog title text.                                    |
| **`message`**       | `string`     | `'Are you sure?'`                 | Confirmation message displayed. **Overrides `label`** |
| **`yesButtonText`** | `string`     | `'OK'`                            | Text shown for the Confirm Button.                    |
| **`yesButtonIcon`** | `ReactNode?` | Check `@mui/icons-material/Check` | Icon in the Confirm Button.                           |

#### Slot Props

| Name            | Type                              | Default - | Description                  |
| --------------- | --------------------------------- | --------- | ---------------------------- |
| **`message`**   | `Partial<DialogContentTextProps>` | `{}`      | Props for the dialog message |
| **`yesButton`** | `Partial<ButtonProps>`            | `{}`      | Props for the Confirm Button |

## `usePrompt(message [, options]) => Promise<string | null>`

This function opens a prompt dialog and returns a promise
representing the user text (resolved on OK and rejected on Close).

### Prompt Options

| Name                 | Type         | Default                         | Description                                                                     |
| -------------------- | ------------ | ------------------------------- | ------------------------------------------------------------------------------- |
| **`title`**          | `string`     | Prompt                          | Dialog title text.                                                              |
| **`defaultText`**    | `string`     | `undefined`                     | Default text shown in the text field.                                           |
| **`saveButtonText`** | `string`     | `'OK'`                          | Text shown for the Save Button.                                                 |
| **`saveButtonIcon`** | `ReactNode?` | Save `@mui/icons-material/Save` | Icon in the Save Button.                                                        |
| **`saveOnEnter`**    | `boolean`    | true                            | Save the prompt on `Enter` key                                                  |
| **`multiline`**      | `boolean`    | false                           | Whether or not the text field should allow/show multiple lines.                 |
| **`minRows`**        | `number`     | Check                           | Minimum number of rows for the text field. Only used when `multiline` is `true. |
| **`maxRows`**        | `number`     | `undefined`                     | Maximum number of rows for the text field. Only used when `multiline` is `true. |

#### Slot Props

| Name            | Type                              | Default - | Description                  |
| --------------- | --------------------------------- | --------- | ---------------------------- |
| **`message`**   | `Partial<DialogContentTextProps>` | `{}`      | Props for the dialog message |
| **`yesButton`** | `Partial<ButtonProps>`            | `{}`      | Props for the Confirm Button |

## `rejectOnCancel`

The `rejectOnCancel` prop is a little special! This prop determines the behavior for when a user clicks Close/Cancel/Whatever.

When `rejectOnCancel` is `TRUE`, an error will be thrown. Due to this, you will need to wrap The Hook Function in a try-catch block.

### useConfirm with `rejectOnCancel`=`true`

```jsx
import { useConfirm } from "mui-use-dialogs";

const Component = () => {
    const confirmAsync = useConfirm({ rejectOnCancel: true });

    const handleClick = async () => {
        try {
            // No need to use a variable since `confirm` will just throw an exception on fail..
            await confirmAsync("Are you sure?");

            // Confirmed! No error was thrown.
            console.log("The user confirmed!");
        } catch (error) {
            // NOT confirmed
            console.log("The user did not confirm!");
        }
    }
}
```

### useConfirm with `rejectOnCancel`=`false`

```jsx
import { useConfirm } from "mui-use-dialogs";

const Component = () => {
    const confirmAsync = useConfirm({ rejectOnCancel: false });

    const handleClick = async () => {
        // No need for a try-catch block since no exception will be thrown!
        // Need to use a variable to check the `confirm` response.
        const confirmed = await confirmAsync("Are you sure?");
        if (confirmed) {
            // Confirmed!
            console.log("The user confirmed!");
        } else {
            // NOT confirmed
            console.log("The user did not confirm!");
        }
    }
}
```
### usePrompt with `rejectOnCancel`=`true`
```jsx
import { usePrompt } from "mui-use-dialogs";

const Component = () => {
    const promptAsync = usePrompt({ rejectOnCancel: true });

    const handlePrompt = async () => {
        try {
            // Need to use a try-catch as an error will be thrown if "Cancel" is clicked.
            // No need to use a variable since `confirm` will just throw an exception on fail..
            const userPrompt = await promptAsync("Enter a prompt...");
            console.log(`The user entered the prompt: ${userPrompt}`);
        } catch (error) {
            // User closed out of the dialog.. Did not click "OK"
            console.log("The user cancelled out of the dialog...");
        }
    }
}
```

### usePrompt with `rejectOnCancel`=`false`
```jsx
import { usePrompt } from "mui-use-dialogs";

const Component = () => {
    const promptAsync = usePrompt({ rejectOnCancel: false });

    const handlePrompt = async () => {
        // No need for a try-catch!
        const userPrompt = await promptAsync ("Enter a prompt...");
        if(typeof userPrompt === "string"){
            console.log(`The user entered the prompt: ${userPrompt}`);
        } else { 
            // The user clicked Cancel
        }
    }
    // ...
}
```

## Credits

This package was heavily based on [jonatanklosko](https://github.com/jonatanklosko)'s [material-ui-confirm](https://github.com/jonatanklosko/material-ui-confirm). This package simply adds some more features.
