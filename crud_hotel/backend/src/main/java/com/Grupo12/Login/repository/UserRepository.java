package com.Grupo12.Login.repository;

// Import de la clase User
import com.Grupo12.Login.entity.User;
// Import de interfaz que viene con métodos para interactuar con la BBDD
import org.springframework.data.jpa.repository.JpaRepository;
// Para manejar respuestas null
import java.util.Optional;

// Repositorio que hereda métodos CRUD de vvvvvvvvvvv
public interface UserRepository extends JpaRepository<User, Long> {
    /* Para obtener un email de la BBDD que coincida con el valor entregado.
    Esto genera la consulta SQL y retorna el User si lo encuentra 
    o null si no lo encuentra*/
    Optional<User> findByEmail(String email);
}
