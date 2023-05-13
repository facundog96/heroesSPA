import { fireEvent, getByRole, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes/pages/SearchPage';


const mockedUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}));


describe('Prubas en SearchPage', () => { 

    beforeEach(() => jest.clearAllMocks());

    test('debe mostrarse correctamente con valores por defecto', () => { 

        const {container} = render(
            <MemoryRouter>
                <SearchPage/>
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();

     });

    test('debe mostrar a batman y el input con el valor del queryString', () => { 

        const {container} = render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage/>
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');
        
        const img = screen.getByRole('img');
        expect(img.src).toContain('/assets/heroes/dc-batman.jpg')

        const alert = screen.getByLabelText('alert')
        expect(alert.style.display).toContain('none')

     });

     test('deberia mostrar un error si no se encuentra el heroe (batman123)', () => { 

        const {container} = render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage/>
            </MemoryRouter>
        );

        const alert = screen.getByLabelText('alert')
        expect(alert.style.display).toBeFalsy()

      });

    test('debe llamar el navigate a la pantalla nueva', () => { 
        
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage/>
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {name: 'searchText', value: 'superman'}})

        const form = screen.getByLabelText('form');
        fireEvent.submit(form)

        expect(mockedUseNavigate).toHaveBeenCalledWith('?q=superman')
    });
     
 });