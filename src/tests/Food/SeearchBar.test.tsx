import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SearchBar from '@/components/SearchBar'
import { describe, test, vi, beforeEach, expect } from 'vitest'

// Mock useNavigate & useLocation
const mockedNavigate = vi.fn()
const mockedUseLocation = vi.fn()

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
        ...actual,
        useNavigate: () => mockedNavigate,
        useLocation: () => mockedUseLocation()
    }
})

const renderSearchBar = (searchQuery?: string) => {
    return render(<SearchBar searchQuery={searchQuery} />)
}

describe('SearchBar component', () => {
    beforeEach(() => {
        mockedNavigate.mockClear()
        mockedUseLocation.mockReturnValue({ pathname: '/products' })
    })

    test('renders input and button', () => {
        renderSearchBar()
        expect(screen.getByRole('textbox')).toBeInTheDocument()
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    test('sets default value from props', () => {
        renderSearchBar('預設搜尋詞')
        expect(screen.getByRole('textbox')).toHaveValue('預設搜尋詞')
    })

    test('submits search query and navigates', async () => {
        renderSearchBar()
        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: { value: '牛肉' } })

        const button = screen.getByRole('button')
        fireEvent.click(button)

        await waitFor(() => {
            expect(mockedNavigate).toHaveBeenCalledWith({
                pathname: '/products/search',
                search: `?keyword=${encodeURIComponent('牛肉')}`
            })
        })
    })

    test('uses correct basePath from pathname', async () => {
        mockedUseLocation.mockReturnValue({ pathname: '/menu/category/search' })

        renderSearchBar()
        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: { value: '蛋白質' } })

        const button = screen.getByRole('button')
        fireEvent.click(button)

        await waitFor(() => {
            expect(mockedNavigate).toHaveBeenCalledWith({
                pathname: '/menu/category/search',
                search: `?keyword=${encodeURIComponent('蛋白質')}`
            })
        })
    })

})
