package com.Grupo12.Login.service;

import com.Grupo12.Login.entity.User;
import com.Grupo12.Login.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<User> obtenerTodos() {
        return userRepository.findAll();
    }

    public User obtenerPorId(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User actualizarUsuario(Long id, User nuevosDatos) {
        return userRepository.findById(id).map(user -> {
            user.setEmail(nuevosDatos.getEmail());
            user.setRol(nuevosDatos.getRol());

            if (nuevosDatos.getContrasenna() != null && !nuevosDatos.getContrasenna().isEmpty()) {
                user.setContrasenna(passwordEncoder.encode(nuevosDatos.getContrasenna()));
            }

            return userRepository.save(user);
        }).orElse(null);
    }

    public boolean eliminarUsuario(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
