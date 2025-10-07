package com.Grupo12.Login.controller;

import com.Grupo12.Login.entity.User;
import com.Grupo12.Login.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    // 🔹 Obtener todos los usuarios (solo admin)
    @GetMapping
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<List<User>> obtenerUsuarios() {
        return ResponseEntity.ok(userService.obtenerTodos());
    }

    // 🔹 Obtener un usuario por ID (solo admin)
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<User> obtenerPorId(@PathVariable Long id) {
        User user = userService.obtenerPorId(id);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    // 🔹 Actualizar usuario (solo admin)
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<User> actualizarUsuario(@PathVariable Long id, @RequestBody User datosActualizados) {
        User actualizado = userService.actualizarUsuario(id, datosActualizados);
        return actualizado != null ? ResponseEntity.ok(actualizado) : ResponseEntity.notFound().build();
    }

    // 🔹 Eliminar usuario (solo admin)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long id) {
        boolean eliminado = userService.eliminarUsuario(id);
        return eliminado ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
