package com.Grupo12.Login.entity;

//import com.fasterxml.jackson.annotation.JsonIgnore;

// Import para mapear esta clase a la tabla de BBDD
import jakarta.persistence.*;
// Import para generar gets y sets automáticos
import lombok.*;

// Marca la clase como una entidad para la BBDD
@Entity
// Define el nombre de la tabla
@Table(name = "usuario")
// Genera los métodos como gets, sets, etc...
@Data
// Constructor vacío para Hibernate
@NoArgsConstructor
// Más que todo flexibilidad para otros propósitos
@AllArgsConstructor

// La clase para la tabla del usuario
public class User {

    // Marca el "id" como la clave primaria
    @Id
    // Le dice a Hibernate que el valor autoincrementa en la BBDD
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    // Evite que se muestre en respuestas JSON
    private String contrasenna;
    private Rol rol;

}