package com.Grupo12.Login.config;

import com.Grupo12.Login.security.JwtAuthenticationFilter;
import com.Grupo12.Login.security.UtilJwt;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// Habilita e luso de @PreAuthorize y otros
@EnableMethodSecurity 
@Configuration
public class SecurityConfig {
    private final UtilJwt jwtUtil;
    
    public SecurityConfig(UtilJwt jwtUtil){
        this.jwtUtil = jwtUtil; 
    }

    // Bean que se puede inyectar en los servicios
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // Deshabilita CSRF
        http.csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                // Deja libre todo lo que empiece por "auth/"
                .requestMatchers("/auth/**").permitAll()
                // Todas las demás rutas necesitan autenticación
                .anyRequest().authenticated()
            )
            .addFilterBefore(new JwtAuthenticationFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    
    }
}

