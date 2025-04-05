describe('API Routes', () => {

    const URL = "";

    test('should respond to Login Endpoint', async () => {
        const loginData = {
            identifier: "usuario@ejemplo.com", // o nombre de usuario
            password: "contraseñaSegura123"
        };

        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        const data = await response.json();

        // Aserciones básicas
        expect(response.status).toBe(200);
        expect(data).toHaveProperty('token'); // Esperar un token JWT
        expect(data.token).toMatch(/^[A-Za-z0-9-_]+(\.[A-Za-z0-9-_]+){2}$/);
        expect(typeof data.token).toBe('string');
    });

    // Caso de prueba para credenciales incorrectas
    test('should reject invalid credentials', async () => {
        const invalidData = {
            identifier: "usuario@incorrecto.com",
            password: "contraseñaErronea"
        };

        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(invalidData)
        });

        expect(response.status).toBe(401); // No autorizado
    });
});