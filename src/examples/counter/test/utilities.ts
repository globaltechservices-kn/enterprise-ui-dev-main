// import '@testing-library/jest-dom/extend-expect';

/**
 * For a complete example, see: test/utilities.ts
 */
import { render as renderComponent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

export * from '@testing-library/react';

export const render = (ui: React.ReactElement, options?: Parameters<typeof renderComponent>[1]) => {
    return {
        ...renderComponent(ui, options),
        user: userEvent.setup()
    }
}