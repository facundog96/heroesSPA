import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui";

const mockedUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}));

describe('Pruebas en el componente de Navbar', () => { 

    const contextValue ={
        logged: true,
        user: {
            name: 'Juancito'
        },
        logout: jest.fn()
    }
    
    beforeEach(()=> jest.clearAllMocks());

    test('debe mostrar el nombre del usuario', () => {  
       

        render(
            <MemoryRouter>    
                <AuthContext.Provider value={contextValue}>
                    <Navbar/>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByText('Juancito')).toBeTruthy();
    });
    
    test('debe de llamar el logout y navigate cuando se hace click en el boton', () => {
        
        render(
            <MemoryRouter>    
                <AuthContext.Provider value={contextValue}>
                    <Navbar/>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        const logoutBtn = screen.getByRole('button');
        fireEvent.click(logoutBtn);

        expect(contextValue.logout).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalledWith('/login', {"replace": true});
    });


});