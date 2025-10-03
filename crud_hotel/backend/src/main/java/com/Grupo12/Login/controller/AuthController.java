// Esto es para exponer los endpoints para login y registro

package com.Grupo12.Login.controller;

import lombok.*;
import com.Grupo12.Login.service.AuthService;
import com.Grupo12.Login.entity.User;

import org.springframework.security.access.prepost.PreAuthorize;
// Importa las anotaciones para el controlador REST
import org.springframework.web.bind.annotation.*;

// Para indicar que la clase es un controlador REST
@RestController
// Para definir la ruta base
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    // Para definir endpoints POST en la ruta /login
    @PostMapping("/login")
    // Convierte el JSON vvvvvvvvvvv recibido en un objeto de tipo LoginRequest
    public String login(@RequestBody LoginRequest request) {
        // Llama a authService.login y devuelte el token como String
        return authService.login(request.getEmail(), request.getContrasenna());
    }
    // Para definir endpoints POST en la ruta /register
    @PostMapping("/register")
    // Recibe un objeto tipo User desde el front-end
    public User register(@RequestBody User user) {
        /* Llama a authService.register para guardar el usuario y la contraseña 
        encriptada */
        return authService.register(user);
    }

    @PostMapping("/pruebaAdmin")
    @PreAuthorize("hasAuthority('admin')")
    public String pruebaAdm() {
        return "Acceso garantizado a admin";
    }
}

@Data
class LoginRequest {

    private String email;
    private String contrasenna;
    private String rol;
    // getters y setters

}
