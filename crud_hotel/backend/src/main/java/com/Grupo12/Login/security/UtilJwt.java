package com.Grupo12.Login.security;

// Import de librería para manejar el JWT (JSON Web Token)
import io.jsonwebtoken.*;
// Import para generar keys seguras
import io.jsonwebtoken.security.Keys;
// Import para @Component
import org.springframework.stereotype.Component;
// Import para manejar las fechas de los tokens
import java.util.Date;
// Import de la interfazpara definir el comportamiento de la key
import java.security.Key;
// Para inyectar la clave secret
import org.springframework.beans.factory.annotation.Value;

// Marca la clase como componente y permite crear una instancia(la clase se puede inyectar)
@Component
// Clase para generar y validar los tokens
public class UtilJwt {

    private final String secret;
    private final long expiration;

    // Para inyectar los valores de la contraseña secreta y el tiempo de sesión
    public UtilJwt(@Value("${jwt.secret}") String secret, 
    @Value("${jwt.expiration}") long expiration){

        this.secret = secret;
        this.expiration = expiration;
    
    }

    // Esto convierte la clave "secret" en una clave tipo "Key"
    // (JWT lo firma y lo valida)
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    // Esto genera el token
    public String generateToken(String usuario, String rol) {

        return Jwts.builder()
            // Guarda el nombre de usuario en el token
            .setSubject(usuario)
            .claim("rol", rol)
            // la fecha de creación
            .setIssuedAt(new Date())
            // Expiración del token
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            // La firma del token
            .signWith(getSigningKey(), SignatureAlgorithm.HS256)
            // Genera el string del token
            .compact();
        
    }

    // Esto extrae el nombre de usuario del token
    // (obtiene la info del token sin tener que consultar la BBDD)
    public String extractUsername(String token) {

        return Jwts.parserBuilder()
            .setSigningKey(getSigningKey())
            .build()
            // Valida la furma y la decodifica
            .parseClaimsJws(token)
            .getBody()
            // Devuelve el nombre de usuario
            .getSubject();
        
    }

    public String extractRol(String token) {
    return Jwts.parserBuilder()
            .setSigningKey(getSigningKey())
            .build()
            .parseClaimsJws(token)
            .getBody()
            .get("rol", String.class);
    }
}

