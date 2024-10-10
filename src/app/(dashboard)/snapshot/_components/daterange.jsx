'use client';
import * as React from 'react';
import { format, addDays } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDates } from '../../../../state/selectedDatesSlice'; // Adjust the path as needed
import { cn } from '@src/lib/utils';
import { Button } from '../../../ui/button';
import { Calendar } from '../../../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../../ui/popover';

export function DatePickerWithRange({ className }) {
  const dispatch = useDispatch();
  const { startDate, endDate } = useSelector((state) => state.selectedDates);

  // Get today's date (stable reference)
  const todayRef = React.useRef(new Date());
  const today = todayRef.current;

  // Compute the adjusted start date
  const adjustedStartDate = React.useMemo(() => {
    if (today.getDate() === 1) {
      return new Date(today.getFullYear(), today.getMonth() - 1, 1);
    } else {
      return new Date(startDate); // Use Redux startDate
    }
  }, [today, startDate]);

  // Compute the adjusted end date
  const adjustedEndDate = React.useMemo(() => {
    if (today.getDate() === 1) {
      // Last day of the previous month
      return new Date(today.getFullYear(), today.getMonth(), 0);
    } else {
      // Yesterday
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return yesterday;
    }
  }, [today]);

  // Initialize component's local state with the adjusted dates
  const [date, setDate] = React.useState({
    from: adjustedStartDate,
    to: adjustedEndDate,
  });

  // Dispatch the adjusted dates into Redux only once on mount
  React.useEffect(() => {
    dispatch(
      setSelectedDates({
        startDate: adjustedStartDate,
        endDate: adjustedEndDate,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleSelect = (range) => {
    if (range?.from && range?.to) {
      setDate(range);
      dispatch(setSelectedDates({ startDate: range.from, endDate: range.to }));
    } else if (range?.from) {
      setDate((prevDate) => ({
        ...prevDate,
        from: range.from,
        to: prevDate.to && range.from > prevDate.to ? range.from : prevDate.to,
      }));
      dispatch(
        setSelectedDates({
          startDate: range.from,
          endDate: range.from > date.to ? range.from : date.to,
        })
      );
    } else if (range?.to) {
      setDate((prevDate) => ({
        ...prevDate,
        to: range.to,
      }));
      dispatch(
        setSelectedDates({
          startDate: date.from,
          endDate: range.to,
        })
      );
    }
  };

  return (
    <div className='flex items-center'>
      <div className='text-xs pr-2 flex-col items-center text-center'>
        <h1 className='font-[800] text-nowrap'>Date Range</h1>
        <h2 className='opacity-50 text-nowrap'>Default MTD</h2>
      </div>
      <div className={cn('grid gap-2', className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id='date'
              variant={'outline'}
              className={cn(
                'w-[260px] max-md:w-[240px] justify-start text-left font-normal bg-white rounded-xl text-black border-white hover:bg-gray-300 hover:text-black',
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
              onSelect={handleSelect}
              numberOfMonths={2}
              className='bg-white text-black'
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
