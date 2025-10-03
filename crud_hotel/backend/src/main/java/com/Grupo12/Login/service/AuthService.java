// Este código es para la lógica de autenticación
package com.Grupo12.Login.service;

// Import clase usuario
import com.Grupo12.Login.entity.User;
// Import clase del repositorio
import com.Grupo12.Login.repository.UserRepository;
import com.Grupo12.Login.security.UtilJwt;

// Import para encriptar contraseñas con BCrypt
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// Import de @Service
import org.springframework.stereotype.Service;

// Indica que la clase tiene lógica de negocio(tiene que ver la autenticación)
@Service
public class AuthService {
    // Para acceder a la BBDD y buscar y modificar datos
    private final UserRepository userRepository;
    // Para generar y validar los JWT
    private final UtilJwt jwtUtil;
    // Para iniciar la instancia del encriptador de contras
    private final BCryptPasswordEncoder contraEncoder;

    /* Constructor para inyectar automáticamente el userRepository, jwtUtil
    y passwordEncoder cuando se crea "AuthService"*/
    public AuthService(UserRepository userRepository, UtilJwt jwtUtil, BCryptPasswordEncoder contraEncoder) {

        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.contraEncoder = contraEncoder;
        
    }

    // Para buscar al usuario en la BBDD
    public String login(String email, String contra) {

        var user = userRepository.findByEmail(email)
            // Para manejar el null
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        // Verificación de la contraseña y para manejar el null
        if (!contraEncoder.matches(contra, user.getContrasenna())) {
            throw new RuntimeException("Contraseña incorrecta");
        }
        // Si todo es correcto, genera un JWT usando el email del usuario
        return jwtUtil.generateToken(user.getEmail(), user.getRol().name());

    }

    // Para registrar al usuario
    public User register(User user) {

        // Se encripta la contraseña vvvvvvv antes de guardarse
        user.setContrasenna(contraEncoder.encode(user.getContrasenna()));
        // Devuelve el usuario creado
        return userRepository.save(user);

    }
}
