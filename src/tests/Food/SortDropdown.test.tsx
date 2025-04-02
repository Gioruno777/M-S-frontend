import SortDropdown from '@/components/SortDropdown'
import { render, screen } from '@testing-library/react'
import { describe, test, vi, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

describe("SortDropdown", () => {
    test("renders the trigger button", () => {
        render(<SortDropdown onClick={() => { }} />)
        expect(screen.getByText('▼排序')).toBeInTheDocument()
    })

    test('shows dropdown and handles click on ', async () => {
        const onClick = vi.fn();
        render(<SortDropdown onClick={onClick} />);
        const user = userEvent.setup();

        await user.click(screen.getByText('▼排序'));
        await user.click(screen.getByText('綜合'));
        expect(onClick).toHaveBeenCalledWith('-_id');

        await user.click(screen.getByText('▼排序'));
        await user.click(screen.getByText('價格:由高到低'));
        expect(onClick).toHaveBeenCalledWith('-price');

        await user.click(screen.getByText('▼排序'));
        await user.click(screen.getByText('價格:由低到高'));
        expect(onClick).toHaveBeenCalledWith('price');

        await user.click(screen.getByText('▼排序'));
        await user.click(screen.getByText('卡路里:由高到低'));
        expect(onClick).toHaveBeenCalledWith('-calories');

        await user.click(screen.getByText('▼排序'));
        await user.click(screen.getByText('卡路里:由低到高'));
        expect(onClick).toHaveBeenCalledWith('calories')

        expect(onClick).toHaveBeenCalledTimes(5);
    })
})