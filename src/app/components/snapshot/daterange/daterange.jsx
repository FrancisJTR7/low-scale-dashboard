'use client';

import * as React from 'react';
import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { cn } from '@src/lib/utils';
import { Button } from '../../../ui/button';
import { Calendar } from '../../../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../../ui/popover';

export function DatePickerWithRange({ className }) {
  const [date, setDate] = React.useState({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  return (
    <div className='flex items-center   '>
      <div className='text-xs text-black pr-2 flex-col items-center text-center '>
        <h1 className='font-[800] text-nowrap'> Date Range</h1>
        <h2 className='opacity-50 text-nowrap'> Default MTD</h2>
      </div>
      <div className={cn('grid gap-2  ', className)}>
        <Popover className=''>
          <PopoverTrigger asChild>
            <Button
              id='date'
              variant={'outline'}
              className={cn(
                'w-[260px] max-md:w-[240px]  justify-start text-left font-normal bg-white rounded-xl text-black border-white hover:bg-gray-300 hover:text-black ',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'LLL dd, y')} -{' '}
                    {format(date.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(date.from, 'LLL dd, y')
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='start'>
            <Calendar
              initialFocus
              mode='range'
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              className='bg-white text-black'
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
