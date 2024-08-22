'use client';

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../state/themeSlice';
import clsx from 'clsx';

const Switch = React.forwardRef(({ className, ...props }, ref) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <SwitchPrimitives.Root
      className={clsx(
        'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
        darkMode ? 'bg-pine' : 'bg-berry', // Change color based on dark mode state
        className
      )}
      checked={darkMode}
      onCheckedChange={handleToggle}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={clsx(
          'pointer-events-none ml-[1.5px] block h-[1.15rem] w-[1.15rem] rounded-full bg-white shadow-lg ring-0 transition-transform',
          darkMode ? 'translate-x-[1.25rem]' : 'translate-x-0'
        )}
      />
    </SwitchPrimitives.Root>
  );
});

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
